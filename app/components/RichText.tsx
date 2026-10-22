import { Fragment } from "react";

// Renders plain text with [label](https://url) links. Anything else stays text,
// so generated content can never inject markup.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

export default function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of Array.from(text.matchAll(LINK))) {
    out.push(text.slice(last, m.index));
    const internal = m[2].includes("f21studio.com");
    out.push(
      <a
        key={m.index}
        href={m[2]}
        {...(internal ? {} : { target: "_blank", rel: "noopener" })}
        className="text-[#c084fc] underline decoration-[#a855f7]/40 underline-offset-4 hover:decoration-[#c084fc]"
      >
        {m[1]}
      </a>
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</>;
}
