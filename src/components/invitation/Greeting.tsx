import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Greeting() {
  const { greeting, groom, bride } = invitation;
  return (
    <Section label="INVITATION" title={greeting.title}>
      <Reveal className="mx-auto max-w-card text-center">
        <p className="font-serif text-[16px] leading-[2.1] text-ink/85">
          {greeting.body.map((line, i) =>
            line === "" ? (
              <br key={i} />
            ) : (
              <span key={i} className="block">
                {line}
              </span>
            )
          )}
        </p>

        <div className="mx-auto my-9 hr-dot w-12" />

        {/* 혼주 표기 — 조장희·박명근이 같은 세로선에서 시작하도록 정렬 */}
        <div className="flex justify-center">
          <div className="space-y-2 text-left text-[15px] text-sub">
            <p className="pl-7">
              <span className="text-ink">{groom.father}</span>{" "}
              <span className="text-line">·</span>{" "}
              <span className="text-ink">{groom.mother}</span>
              <span className="text-sub">의 {groom.order}</span>{" "}
              <span className="text-ink">{groom.name}</span>
            </p>
            <p className="relative pl-7">
              {bride.fatherMark && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={bride.fatherMark}
                  alt="고(故)"
                  className="absolute left-0 top-1/2 h-[1.3em] w-auto -translate-y-1/2 opacity-90"
                />
              )}
              <span className="text-ink">{bride.father}</span>{" "}
              <span className="text-line">·</span>{" "}
              <span className="text-ink">{bride.mother}</span>
              <span className="text-sub">의 {bride.order}</span>{" "}
              <span className="text-ink">{bride.name}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
