import type { Social } from "../data/portfolio";

type SocialListProps = {
  socials: Social[];
  /** hero uses 14px rows, contact uses 13px */
  dense?: boolean;
};

/** Rows of `label ↗` separated by hairlines. */
export default function SocialList({ socials, dense = false }: SocialListProps) {
  return (
    <div className="grid border-t border-line/12">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className={`flex items-center justify-between border-b border-line/10 font-mono text-[12.5px] ${
            dense ? "py-[13px]" : "py-[14px]"
          }`}
        >
          <span>{social.label}</span>
          <span className="text-amber">↗</span>
        </a>
      ))}
    </div>
  );
}
