import { invitation } from "@/lib/invitation/content";
import PhotoImg from "./PhotoImg";

export default function Hero() {
  const { groom, bride, wedding } = invitation;
  return (
    <header className="relative flex min-h-[88vh] flex-col items-center justify-start overflow-hidden bg-paper px-5 pt-10">
      <p className="animate-fadeIn font-serif text-sm tracking-[0.4em] text-accent">
        WE ARE GETTING MARRIED
      </p>

      <div className="mt-7 w-full max-w-[360px]">
        <div className="overflow-hidden rounded-[160px] rounded-b-[160px] border border-line shadow-sm">
          <PhotoImg
            src="/gallery/main.jpg"
            alt={`${groom.name} 박혜림 메인 사진`}
            index={0}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h1 className="font-serif text-[28px] font-bold tracking-wide text-ink">
          {groom.name}
          <span className="mx-3 text-accent">·</span>
          {bride.name}
        </h1>
        <div className="mx-auto my-5 hr-dot w-16" />
        <p className="font-serif text-[15px] leading-relaxed text-sub">
          {wedding.dateText} {wedding.timeText}
        </p>
        <p className="mt-1 font-serif text-[15px] text-sub">
          {wedding.venue} {wedding.hall}
        </p>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="mt-10 flex flex-col items-center gap-2 pb-8 text-sub">
        <span className="text-[11px] tracking-[0.2em]">SCROLL</span>
        <span className="h-8 w-px animate-pulse bg-line" />
      </div>
    </header>
  );
}
