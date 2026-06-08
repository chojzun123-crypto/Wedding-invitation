import Reveal from "./Reveal";

/** 섹션 공통 래퍼 — 제목(세리프) + 영문 라벨 + 본문 */
export default function Section({
  label,
  title,
  children,
  className = "",
  id,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 ${className}`}>
      {(label || title) && (
        <Reveal className="mb-9 text-center">
          {label && (
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {label}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-2xl font-bold text-ink">{title}</h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
