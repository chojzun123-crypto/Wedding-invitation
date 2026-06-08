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

        {/* 혼주 표기 */}
        <div className="space-y-2 text-[15px] text-sub">
          <p>
            <span className="text-ink">{groom.father}</span>
            <span className="mx-1.5 text-line">·</span>
            <span className="text-ink">{groom.mother}</span>
            <span className="ml-2">의 {groom.order}</span>
            <span className="mx-2 font-serif text-ink">{groom.name}</span>
          </p>
          <p>
            <span className="text-ink">{bride.father}</span>
            <span className="mx-1.5 text-line">·</span>
            <span className="text-ink">{bride.mother}</span>
            <span className="ml-2">의 {bride.order}</span>
            <span className="mx-2 font-serif text-ink">{bride.name}</span>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
