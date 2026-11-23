type SectionHeadingProps = {
  /** heading text after the dimmed `../` prefix */
  children: string;
  className?: string;
};

/** `../about me` — mono, clamp(26px,3.4vw,42px), prefix in the dim tone. */
export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`m-0 font-mono text-[clamp(26px,3.4vw,42px)] font-medium ${className}`}
    >
      <span className="text-dim">../</span>
      {children}
    </h2>
  );
}
