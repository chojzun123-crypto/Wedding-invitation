import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";

function Row({
  relation,
  name,
  tel,
}: {
  relation: string;
  name: string;
  tel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5">
      <div>
        <span className="text-[12px] text-accent">{relation}</span>
        <p className="text-[15px] text-ink">{name}</p>
      </div>
      <div className="flex gap-2">
        <a
          href={`tel:${tel.replace(/-/g, "")}`}
          aria-label={`${name}에게 전화`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-point active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a
          href={`sms:${tel.replace(/-/g, "")}`}
          aria-label={`${name}에게 문자`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-accent active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const groom = invitation.contacts.filter((c) => c.group === "groom");
  const bride = invitation.contacts.filter((c) => c.group === "bride");
  if (!groom.length && !bride.length) return null;

  return (
    <Section label="CONTACT" title="연락하기" className="bg-paper">
      <Reveal className="mx-auto max-w-card">
        <div className="grid gap-4 sm:grid-cols-2">
          {groom.length > 0 && (
            <div className="rounded-2xl border border-line bg-ivory/50 px-5 py-3">
              <p className="mb-1 text-center font-serif text-sm text-point">신랑측</p>
              <div className="divide-y divide-line">
                {groom.map((c, i) => (
                  <Row key={i} {...c} />
                ))}
              </div>
            </div>
          )}
          {bride.length > 0 && (
            <div className="rounded-2xl border border-line bg-ivory/50 px-5 py-3">
              <p className="mb-1 text-center font-serif text-sm text-point">신부측</p>
              <div className="divide-y divide-line">
                {bride.map((c, i) => (
                  <Row key={i} {...c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
