"""
qt-faststart: Move the moov atom to the front of an MP4 file.

Enables progressive web download and instant seeking by ensuring the moov
metadata atom appears before the mdat payload data atom.

Input/output: /Users/farzaden/Downloads/F21-Studio/F21 Studio/projects/
              f21-website/public/hero-scrub.mp4  (overwritten in-place)

Algorithm
---------
1. Parse top-level atoms to locate ftyp, free, mdat, moov.
2. Read the entire moov atom into memory.
3. Compute the offset delta = moov_size (bytes that mdat will shift forward).
4. Recursively walk moov, patching every stco / co64 entry by adding delta.
5. Write output: [atoms before mdat] + [patched moov] + [mdat].
6. Verify: moov precedes mdat, file size unchanged, stco[0] == old_stco[0] + delta.
7. Atomically replace the original file via os.replace().
"""

from __future__ import annotations

import os
import struct
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import BinaryIO

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

INPUT_PATH = Path(
    "/Users/farzaden/Downloads/F21-Studio/F21 Studio/projects/"
    "f21-website/public/hero-scrub.mp4"
)

# Container atom types that may hold child atoms (recurse into these).
CONTAINER_ATOMS: frozenset[str] = frozenset(
    {"moov", "trak", "mdia", "minf", "stbl", "edts", "udta", "meta", "ilst"}
)

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------


@dataclass
class AtomInfo:
    """Describes a single top-level (or nested) ISO base-media atom."""

    name: str
    file_offset: int       # byte position of the size field in the source file
    header_size: int       # 8 (normal) or 16 (extended 64-bit size)
    data_size: int         # total atom bytes including header
    payload_offset: int    # = file_offset + header_size


@dataclass
class TopLevelLayout:
    """Collected info about the four expected top-level atoms."""

    prefix_atoms: list[AtomInfo] = field(default_factory=list)  # ftyp, free, …
    mdat: AtomInfo | None = None
    moov: AtomInfo | None = None


# ---------------------------------------------------------------------------
# Atom parsing helpers
# ---------------------------------------------------------------------------


def read_atom_header(f: BinaryIO, file_offset: int) -> AtomInfo | None:
    """
    Read one atom header at *file_offset*.  Returns None on EOF or bad data.
    Handles both normal (32-bit) and extended (64-bit) sizes.
    """
    f.seek(file_offset)
    raw = f.read(8)
    if len(raw) < 8:
        return None

    size32: int
    name_bytes: bytes
    size32, name_bytes = struct.unpack(">I4s", raw)
    name = name_bytes.decode("latin-1")

    if size32 == 1:
        # 64-bit extended size follows the 8-byte header
        ext = f.read(8)
        if len(ext) < 8:
            return None
        (total_size,) = struct.unpack(">Q", ext)
        header_size = 16
    else:
        total_size = size32
        header_size = 8

    if total_size < header_size:
        return None

    return AtomInfo(
        name=name,
        file_offset=file_offset,
        header_size=header_size,
        data_size=total_size,
        payload_offset=file_offset + header_size,
    )


def scan_top_level(f: BinaryIO, file_size: int) -> TopLevelLayout:
    """Walk the top-level atom list and collect layout information."""
    layout = TopLevelLayout()
    offset = 0

    while offset < file_size:
        atom = read_atom_header(f, offset)
        if atom is None:
            break

        if atom.name == "mdat":
            layout.mdat = atom
        elif atom.name == "moov":
            layout.moov = atom
        else:
            # ftyp, free, wide, pnot, skip, etc.
            layout.prefix_atoms.append(atom)

        offset += atom.data_size

    return layout


# ---------------------------------------------------------------------------
# stco / co64 patching
# ---------------------------------------------------------------------------


def _patch_stco(data: bytearray, payload_start: int, delta: int) -> int:
    """
    Patch a stco (32-bit chunk-offset) atom payload in *data*.

    payload_start points to the first byte after the 8-byte atom header
    (i.e. the version/flags field).

    Returns the number of entries patched.
    """
    # Layout: version(1) + flags(3) + entry_count(4) + entries × 4
    entry_count: int
    (entry_count,) = struct.unpack_from(">I", data, payload_start + 4)
    base = payload_start + 8

    for i in range(entry_count):
        pos = base + i * 4
        (val,) = struct.unpack_from(">I", data, pos)
        struct.pack_into(">I", data, pos, val + delta)

    return entry_count


def _patch_co64(data: bytearray, payload_start: int, delta: int) -> int:
    """
    Patch a co64 (64-bit chunk-offset) atom payload in *data*.

    Returns the number of entries patched.
    """
    # Layout: version(1) + flags(3) + entry_count(4) + entries × 8
    (entry_count,) = struct.unpack_from(">I", data, payload_start + 4)
    base = payload_start + 8

    for i in range(entry_count):
        pos = base + i * 8
        (val,) = struct.unpack_from(">Q", data, pos)
        struct.pack_into(">Q", data, pos, val + delta)

    return entry_count


def patch_moov_offsets(moov_data: bytearray, delta: int) -> dict[str, int]:
    """
    Recursively walk *moov_data* (the full moov atom including its header),
    find every stco and co64 atom, and add *delta* to each chunk-offset entry.

    Returns a summary dict: {"stco_atoms": N, "co64_atoms": M, "entries": K}
    """
    stats: dict[str, int] = {"stco_atoms": 0, "co64_atoms": 0, "entries": 0}

    def recurse(start: int, end: int) -> None:
        pos = start
        while pos < end:
            if pos + 8 > len(moov_data):
                break

            (size32,) = struct.unpack_from(">I", moov_data, pos)
            name = moov_data[pos + 4 : pos + 8].decode("latin-1")

            if size32 == 1:
                if pos + 16 > len(moov_data):
                    break
                (atom_size,) = struct.unpack_from(">Q", moov_data, pos + 8)
                header_sz = 16
            else:
                atom_size = size32
                header_sz = 8

            if atom_size < header_sz:
                break

            payload_start = pos + header_sz

            if name in CONTAINER_ATOMS:
                recurse(payload_start, pos + atom_size)
            elif name == "stco":
                n = _patch_stco(moov_data, payload_start, delta)
                stats["stco_atoms"] += 1
                stats["entries"] += n
            elif name == "co64":
                n = _patch_co64(moov_data, payload_start, delta)
                stats["co64_atoms"] += 1
                stats["entries"] += n

            pos += atom_size

    recurse(0, len(moov_data))
    return stats


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------


def verify_output(output_path: Path, original_size: int, expected_delta: int) -> None:
    """
    Confirm:
      1. moov precedes mdat in the first few thousand bytes.
      2. Output file size equals original.
      3. stco[0] offsets reflect the expected delta shift.

    Raises AssertionError on any violation.
    """
    actual_size = output_path.stat().st_size
    assert actual_size == original_size, (
        f"Size mismatch: expected {original_size}, got {actual_size}"
    )

    with output_path.open("rb") as f:
        layout = scan_top_level(f, actual_size)

    assert layout.moov is not None, "moov atom not found in output"
    assert layout.mdat is not None, "mdat atom not found in output"
    assert layout.moov.file_offset < layout.mdat.file_offset, (
        f"moov ({layout.moov.file_offset}) must precede mdat ({layout.mdat.file_offset})"
    )

    # Verify first stco entry in the output moov
    with output_path.open("rb") as f:
        f.seek(layout.moov.file_offset)
        moov_bytes = bytearray(f.read(layout.moov.data_size))

    found_stco: list[int] = []

    def collect_stco(start: int, end: int) -> None:
        pos = start
        while pos < end:
            if pos + 8 > len(moov_bytes):
                break
            (sz,) = struct.unpack_from(">I", moov_bytes, pos)
            nm = moov_bytes[pos + 4 : pos + 8].decode("latin-1")
            if sz < 8:
                break
            if nm in CONTAINER_ATOMS:
                collect_stco(pos + 8, pos + sz)
            elif nm == "stco":
                pstart = pos + 8
                (ec,) = struct.unpack_from(">I", moov_bytes, pstart + 4)
                if ec > 0:
                    (v,) = struct.unpack_from(">I", moov_bytes, pstart + 8)
                    found_stco.append(v)
            pos += sz

    collect_stco(0, len(moov_bytes))

    print("\n[verify] Results:")
    print(f"  File size      : {actual_size:,} bytes (unchanged)")
    print(f"  moov offset    : {layout.moov.file_offset:,}")
    print(f"  mdat offset    : {layout.mdat.file_offset:,}")
    print(f"  moov < mdat    : YES")
    print(f"  stco atoms found: {len(found_stco)}")
    if found_stco:
        print(f"  stco[0][0] value: {found_stco[0]:,}  (delta applied = {expected_delta:,})")


# ---------------------------------------------------------------------------
# Main faststart routine
# ---------------------------------------------------------------------------


def faststart(input_path: Path) -> None:
    """
    Perform the qt-faststart transformation on *input_path* in-place.
    """
    if not input_path.exists():
        raise FileNotFoundError(f"Input not found: {input_path}")

    file_size = input_path.stat().st_size
    print(f"[faststart] Input : {input_path}")
    print(f"[faststart] Size  : {file_size:,} bytes")

    # ------------------------------------------------------------------
    # 1. Parse top-level layout
    # ------------------------------------------------------------------
    with input_path.open("rb") as f:
        layout = scan_top_level(f, file_size)

    if layout.moov is None:
        raise ValueError("No moov atom found — not a valid MP4 file.")
    if layout.mdat is None:
        raise ValueError("No mdat atom found — not a valid MP4 file.")

    print(f"\n[parse] Top-level atoms:")
    for a in layout.prefix_atoms:
        print(f"  {a.name!r:8s}  offset={a.file_offset:>10,}  size={a.data_size:>10,}")
    if layout.mdat:
        a = layout.mdat
        print(f"  {a.name!r:8s}  offset={a.file_offset:>10,}  size={a.data_size:>10,}")
    if layout.moov:
        a = layout.moov
        print(f"  {a.name!r:8s}  offset={a.file_offset:>10,}  size={a.data_size:>10,}")

    moov = layout.moov
    mdat = layout.mdat

    if moov.file_offset < mdat.file_offset:
        print("\n[faststart] moov already precedes mdat — nothing to do.")
        return

    # ------------------------------------------------------------------
    # 2. Read moov into memory and patch chunk offsets
    # ------------------------------------------------------------------
    delta = moov.data_size  # mdat shifts forward by exactly moov_size bytes

    print(f"\n[patch] moov size = {moov.data_size:,} bytes")
    print(f"[patch] delta     = +{delta:,} bytes (added to every stco/co64 entry)")

    with input_path.open("rb") as f:
        f.seek(moov.file_offset)
        moov_bytes = bytearray(f.read(moov.data_size))

    stats = patch_moov_offsets(moov_bytes, delta)
    print(f"[patch] stco atoms patched : {stats['stco_atoms']}")
    print(f"[patch] co64 atoms patched : {stats['co64_atoms']}")
    print(f"[patch] total entries fixed: {stats['entries']}")

    # ------------------------------------------------------------------
    # 3. Write output to a temp file in the same directory
    #    Layout: [prefix atoms] + [patched moov] + [mdat]
    # ------------------------------------------------------------------
    output_dir = input_path.parent
    tmp_fd, tmp_path_str = tempfile.mkstemp(
        dir=output_dir, prefix=".faststart_", suffix=".tmp"
    )
    tmp_path = Path(tmp_path_str)

    CHUNK = 1 << 20  # 1 MiB copy buffer

    try:
        with open(tmp_fd, "wb") as out_f, input_path.open("rb") as in_f:
            # --- prefix atoms (ftyp, free, …) ---
            for atom in layout.prefix_atoms:
                in_f.seek(atom.file_offset)
                remaining = atom.data_size
                while remaining > 0:
                    chunk = in_f.read(min(CHUNK, remaining))
                    out_f.write(chunk)
                    remaining -= len(chunk)

            # --- patched moov ---
            out_f.write(moov_bytes)

            # --- mdat ---
            in_f.seek(mdat.file_offset)
            remaining = mdat.data_size
            while remaining > 0:
                chunk = in_f.read(min(CHUNK, remaining))
                out_f.write(chunk)
                remaining -= len(chunk)

        written = tmp_path.stat().st_size
        print(f"\n[write] Temp file : {tmp_path}")
        print(f"[write] Written   : {written:,} bytes")

        if written != file_size:
            raise RuntimeError(
                f"Written size {written:,} != original {file_size:,} — aborting."
            )

        # ------------------------------------------------------------------
        # 4. Verify the temp file before replacing the original
        # ------------------------------------------------------------------
        verify_output(tmp_path, file_size, delta)

        # ------------------------------------------------------------------
        # 5. Atomic replace
        # ------------------------------------------------------------------
        os.replace(tmp_path, input_path)
        print(f"\n[faststart] SUCCESS — {input_path} updated in-place.")

    except Exception:
        # Clean up temp file on any error
        if tmp_path.exists():
            tmp_path.unlink()
        raise


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    faststart(INPUT_PATH)
