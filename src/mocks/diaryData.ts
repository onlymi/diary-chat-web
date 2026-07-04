export interface RecentDiary {
  date: string;
  weekday: string;
  mood: string;
  moodIcon: string;
  title: string;
  preview: string;
  tags: string[];
}

export interface Diary {
  id: number;
  day: string;
  month: string;
  weekday: string;
  mood: string;
  emoji: string;
  title: string;
  content: string;
  tags: string[];
}

export interface WeeklyMood {
  day: string;
  height: number;
  icon: string;
}

export const recentDiaries: RecentDiary[] = [
  {
    date: "7월 3일",
    weekday: "금요일",
    mood: "평온",
    moodIcon: "🌿",
    title: "천천히 흘러간 오후",
    preview:
      "오랜만에 창가에 앉아 아무것도 하지 않는 시간을 보냈다. 잔잔한 바람이...",
    tags: ["일상", "휴식"],
  },
  {
    date: "7월 2일",
    weekday: "목요일",
    mood: "설렘",
    moodIcon: "✨",
    title: "새로운 시작 앞에서",
    preview:
      "작게 시작한 일이 조금씩 모양을 갖춰가고 있다. 아직 서툴지만 오늘의...",
    tags: ["성장", "기대"],
  },
  {
    date: "6월 30일",
    weekday: "화요일",
    mood: "생각 많음",
    moodIcon: "☁️",
    title: "마음에 남은 말들",
    preview:
      "오늘 나눈 대화를 다시 떠올려 보았다. 말하지 못한 마음이 오래 머물렀다...",
    tags: ["관계", "생각"],
  },
];

export const diaries: Diary[] = [
  {
    id: 1,
    day: "03",
    month: "7월",
    weekday: "금요일",
    mood: "평온",
    emoji: "🌿",
    title: "천천히 흘러간 오후",
    content:
      "오랜만에 창가에 앉아 아무것도 하지 않는 시간을 보냈다. 잔잔한 바람이 커튼을 흔드는 모습을 바라보는 것만으로도 마음이 가벼워졌다.",
    tags: ["일상", "휴식"],
  },
  {
    id: 2,
    day: "02",
    month: "7월",
    weekday: "목요일",
    mood: "설렘",
    emoji: "✨",
    title: "새로운 시작 앞에서",
    content:
      "작게 시작한 일이 조금씩 모양을 갖춰가고 있다. 아직 서툴지만 오늘의 기대와 떨림을 오래 기억하고 싶다.",
    tags: ["성장", "기대"],
  },
  {
    id: 3,
    day: "30",
    month: "6월",
    weekday: "화요일",
    mood: "생각 많음",
    emoji: "☁️",
    title: "마음에 남은 말들",
    content:
      "오늘 나눈 대화를 다시 떠올려 보았다. 말하지 못한 마음이 오래 머물렀지만, 천천히 정리해 보기로 했다.",
    tags: ["관계", "생각"],
  },
  {
    id: 4,
    day: "28",
    month: "6월",
    weekday: "일요일",
    mood: "행복",
    emoji: "☀️",
    title: "작지만 분명한 행복",
    content:
      "좋아하는 음악과 따뜻한 차 한 잔. 대단한 일은 없었지만 오늘은 사소한 순간들이 유난히 다정했다.",
    tags: ["행복", "주말"],
  },
  {
    id: 5,
    day: "25",
    month: "6월",
    weekday: "목요일",
    mood: "지침",
    emoji: "🌧️",
    title: "쉬어가도 괜찮은 날",
    content:
      "계획한 일을 모두 끝내지는 못했다. 자꾸만 조급해지는 마음에게 오늘은 여기까지여도 괜찮다고 말해주었다.",
    tags: ["위로", "휴식"],
  },
  {
    id: 6,
    day: "22",
    month: "6월",
    weekday: "월요일",
    mood: "감사",
    emoji: "🌼",
    title: "고마운 마음을 적어두기",
    content:
      "무심코 건네받은 친절이 하루 종일 마음을 따뜻하게 했다. 나도 누군가에게 그런 사람이 되고 싶다.",
    tags: ["감사", "사람"],
  },
];

export const weeklyMoods: WeeklyMood[] = [
  { day: "월", height: 42, icon: "🌿" },
  { day: "화", height: 68, icon: "🙂" },
  { day: "수", height: 54, icon: "☁️" },
  { day: "목", height: 82, icon: "✨" },
  { day: "금", height: 64, icon: "🌿" },
  { day: "토", height: 34, icon: "" },
  { day: "일", height: 34, icon: "" },
];
