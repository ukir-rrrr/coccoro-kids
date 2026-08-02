export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-[#333333] sm:text-3xl">
        {title}
      </h2>
      <span className="h-0.5 w-12 bg-accent1" />
      {subtitle && (
        <p className="max-w-xl text-sm leading-relaxed text-[#6b7280]">{subtitle}</p>
      )}
    </div>
  );
}
