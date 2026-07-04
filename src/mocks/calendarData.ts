export interface CalendarMood {
  day: number;
  mood: string;
  emoji: string;
  color: string;
  title: string;
  note: string;
  tags: string[];
}

export const calendarMoods: CalendarMood[] = [
  {
    day: 2,
    mood: "설렘",
    emoji: "✨",
    color: "yellow",
    title: "새로운 시작 앞에서",
    note: "기대와 떨림이 함께했던 하루",
    tags: ["성장", "기대"],
  },
  {
    day: 3,
    mood: "평온",
    emoji: "🌿",
    color: "green",
    title: "천천히 흘러간 오후",
    note: "창가에서 여유롭게 쉬어간 시간",
    tags: ["일상", "휴식"],
  },
  {
    day: 5,
    mood: "행복",
    emoji: "☀️",
    color: "orange",
    title: "다정한 주말",
    note: "작은 순간들이 유난히 따뜻했다",
    tags: ["행복", "주말"],
  },
  {
    day: 7,
    mood: "생각 많음",
    emoji: "☁️",
    color: "gray",
    title: "생각이 많아진 저녁",
    note: "마음에 남은 말을 천천히 돌아봤다",
    tags: ["생각"],
  },
  {
    day: 9,
    mood: "평온",
    emoji: "🌿",
    color: "green",
    title: "익숙한 길을 걷기",
    note: "평범함이 주는 안정감을 느꼈다",
    tags: ["산책", "일상"],
  },
  {
    day: 12,
    mood: "감사",
    emoji: "🌼",
    color: "pink",
    title: "고마운 마음",
    note: "곁에 있는 사람들을 떠올린 하루",
    tags: ["감사", "사람"],
  },
  {
    day: 15,
    mood: "지침",
    emoji: "🌧️",
    color: "blue",
    title: "조금 쉬어가기",
    note: "오늘만큼은 나에게 여유를 주기로 했다",
    tags: ["위로", "휴식"],
  },
  {
    day: 18,
    mood: "행복",
    emoji: "☀️",
    color: "orange",
    title: "웃음이 많았던 날",
    note: "오랜만에 마음껏 웃었다",
    tags: ["친구", "행복"],
  },
  {
    day: 21,
    mood: "평온",
    emoji: "🌿",
    color: "green",
    title: "비 온 뒤 맑음",
    note: "정리된 공기처럼 마음도 맑아졌다",
    tags: ["날씨", "평온"],
  },
  {
    day: 24,
    mood: "설렘",
    emoji: "✨",
    color: "yellow",
    title: "기다리던 소식",
    note: "오래 준비한 일에 좋은 소식이 찾아왔다",
    tags: ["기대", "성장"],
  },
  {
    day: 27,
    mood: "감사",
    emoji: "🌼",
    color: "pink",
    title: "마음을 나눈 밤",
    note: "진솔한 대화가 오래 기억에 남았다",
    tags: ["감사", "관계"],
  },
  {
    day: 30,
    mood: "생각 많음",
    emoji: "☁️",
    color: "gray",
    title: "한 달을 돌아보며",
    note: "지나온 마음들을 차분히 들여다봤다",
    tags: ["회고", "생각"],
  },
];

export const moodSummary = [
  { mood: "평온", emoji: "🌿", count: 3, percent: 25 },
  { mood: "설렘", emoji: "✨", count: 2, percent: 17 },
  { mood: "행복", emoji: "☀️", count: 2, percent: 17 },
  { mood: "감사", emoji: "🌼", count: 2, percent: 17 },
  { mood: "생각 많음", emoji: "☁️", count: 2, percent: 17 },
  { mood: "지침", emoji: "🌧️", count: 1, percent: 7 },
];
