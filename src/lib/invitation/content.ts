/**
 * ─────────────────────────────────────────────────────────────
 *  청첩장 콘텐츠 (이 파일만 수정하면 내용이 바뀝니다)
 * ─────────────────────────────────────────────────────────────
 *  기획서상 .env.invitation 역할을 하는 단일 콘텐츠 소스입니다.
 *  TODO 로 표시된 항목은 실제 값으로 교체하세요.
 */

export type Account = {
  group: "groom" | "bride";
  relation: string; // 신랑 / 신부 / 아버지 / 어머니 등
  bank: string;
  number: string;
  holder: string;
};

export type Contact = {
  group: "groom" | "bride";
  relation: string; // 신랑 / 신부 / 신랑 아버지 ...
  name: string;
  tel: string;
};

export const invitation = {
  // ── 메타 / 공유(OG) ─────────────────────────────
  meta: {
    title: "조경준 ♥ 박혜림 결혼합니다",
    description: "2026년 10월 4일 일요일 오전 11시 50분, 호텔 ICC 3층 그랜드볼룸",
    // 배포 도메인 (OG 공유 미리보기 절대경로용)
    url: "https://wedding-invitation-mauve-delta.vercel.app",
    ogImage: "/og2.png", // 카카오 캐시 우회: 이미지 파일명 자체를 변경
  },

  // ── 신랑 / 신부 ────────────────────────────────
  groom: {
    name: "조경준",
    father: "조장희",
    mother: "이정란",
    order: "아들",
  },
  bride: {
    name: "박혜림",
    father: "박명근",
    fatherMark: "/flower.png", // 고인 표시(국화) — 이름 앞 작은 아이콘
    mother: "김선미",
    order: "딸",
  },

  // ── 예식 일시 / 장소 ───────────────────────────
  wedding: {
    // ISO 8601 (KST). D-day·요일 계산에 사용
    datetime: "2026-10-04T11:50:00+09:00",
    dateText: "2026년 10월 4일 일요일",
    timeText: "오전 11시 50분",
    venue: "호텔 ICC",
    hall: "3층 그랜드볼룸",
    address: "대전광역시 유성구 엑스포로123번길 55",
    tel: "042-555-5100",
    // 카카오/네이버/티맵 길찾기에 쓰일 장소명·좌표
    placeName: "호텔 ICC",
    // TODO(선택): 정확한 좌표를 넣으면 길찾기 정확도가 올라갑니다
    lat: 36.3745, // 대략 대전 유성구 (정확값으로 교체 권장)
    lng: 127.3905,
    // 교통 안내 (TODO: 실제 정보로 교체)
    transport: [
      { icon: "car", label: "자가용", desc: "내비게이션에 '호텔 ICC' 검색 / 건물 내 주차장 이용(2~3시간 무료)" },
      { icon: "subway", label: "지하철", desc: "대전 1호선 정부청사역 하차 후 택시 약 10분" },
      { icon: "bus", label: "버스", desc: "엑스포로 인근 정류장 하차, 도보 약 5분" },
    ] as { icon: string; label: string; desc: string }[],
  },

  // ── 인사말 (S2) ────────────────────────────────
  // TODO(샘플): 실제 인사말로 교체하세요.
  greeting: {
    title: "초대합니다",
    body: [
      "곱게 물든 단풍이 반기는 가을날,",
      "저희도 서로에게 물들어",
      "평생을 약속합니다.",
      "",
      "서로 다른 색으로 만났지만,",
      "이제는 서로에게 가장 잘 어울리는 색이 되어",
      "앞으로의 모든 계절을 함께하려 합니다.",
      "",
      "함께 내딛는 다정한 첫걸음에",
      "따뜻한 마음으로 함께하시어",
      "축복해 주시면 감사하겠습니다.",
    ],
  },

  // ── 갤러리 (S4) ────────────────────────────────
  // public/gallery/ 에 이미지를 넣고 아래 목록을 맞추세요. (예: /gallery/1.jpg)
  // 파일이 없으면 자동으로 플레이스홀더가 표시됩니다.
  gallery: {
    // 처음 9장(3×3)만 보이고 '더보기'로 나머지 펼침
    preview: 9,
    images: [
      "/gallery/1.jpg",
      "/gallery/2.jpg",
      "/gallery/3.jpg",
      "/gallery/4.jpg",
      "/gallery/5.jpg",
      "/gallery/6.jpg",
      "/gallery/7.jpg",
      "/gallery/8.jpg",
      "/gallery/9.jpg",
      "/gallery/10.jpg",
      "/gallery/11.jpg",
      "/gallery/12.jpg",
      "/gallery/13.jpg",
      "/gallery/14.jpg",
      "/gallery/15.jpg",
      "/gallery/16.jpg",
      "/gallery/17.jpg",
    ],
  },

  // ── 연락처 (S7) ────────────────────────────────
  contacts: [
    { group: "groom", relation: "신랑", name: "조경준", tel: "010-6533-3705" },
    { group: "bride", relation: "신부", name: "박혜림", tel: "010-2430-6506" },
    // TODO(선택): 혼주 연락처가 있으면 추가
    // { group: "groom", relation: "신랑 아버지", name: "조장희", tel: "" },
  ] as Contact[],

  // ── 마음 전하실 곳 / 계좌 (S6) ─────────────────
  accounts: [
    // 신랑측
    { group: "groom", relation: "신랑", bank: "농협", number: "302-1680-7744-01", holder: "조경준" },
    { group: "groom", relation: "신랑 아버지", bank: "농협", number: "407-01-051912", holder: "조장희" },
    { group: "groom", relation: "신랑 어머니", bank: "농협", number: "174473-52-032131", holder: "이정란" },

    // 신부측
    { group: "bride", relation: "신부", bank: "농협은행", number: "302-1995-1229-21", holder: "박혜림" },
    { group: "bride", relation: "신부 어머니", bank: "국민은행", number: "474901-04-002297", holder: "김선미" },
  ] as Account[],
};

export type Invitation = typeof invitation;
