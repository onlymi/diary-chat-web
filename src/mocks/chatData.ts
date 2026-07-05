export interface ChatSession {
  id: number;
  title: string;
  preview: string;
  date: string;
  active?: boolean;
}

export interface ChatMessage {
  id: number;
  sender: "ai" | "user";
  content: string;
  time: string;
}

export const chatSessions: ChatSession[] = [
  {
    id: 1,
    title: "오늘의 마음 돌아보기",
    preview: "그 순간 어떤 감정이 가장 먼저...",
    date: "오늘",
    active: true,
  },
  {
    id: 2,
    title: "새로운 시작에 대한 기대",
    preview: "설렘과 걱정이 함께 느껴지는 건...",
    date: "7. 2",
  },
  {
    id: 3,
    title: "관계 속에서 지친 마음",
    preview: "내 마음을 먼저 돌보는 것도...",
    date: "6. 30",
  },
  {
    id: 4,
    title: "쉬어가도 괜찮을까",
    preview: "충분히 쉬는 시간은 다음 걸음을...",
    date: "6. 25",
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "ai",
    content:
      "안녕하세요, 승민님. 오늘도 마음한줄에 와주셨네요.\n지금 마음은 어떤 날씨에 가까운가요?",
    time: "오후 8:42",
  },
  {
    id: 2,
    sender: "user",
    content:
      "조금 흐리지만 비가 올 것 같지는 않은 날씨 같아요. 특별히 힘든 일은 없었는데 마음이 무거워요.",
    time: "오후 8:43",
  },
  {
    id: 3,
    sender: "ai",
    content:
      "큰일이 없어도 마음이 무거운 날이 있지요. 이유를 바로 찾으려고 애쓰지 않아도 괜찮아요.\n\n오늘 하루 중 마음에 가장 오래 남아 있는 순간이 있다면 들려주시겠어요?",
    time: "오후 8:43",
  },
];

export const chatPrompts = [
  "오늘 가장 기억에 남는 순간",
  "지금 마음을 색으로 표현하기",
  "나에게 해주고 싶은 말",
];

export const conversationStarters = [
  {
    id: "today",
    emoji: "🌿",
    title: "오늘의 마음 돌아보기",
    description: "오늘 있었던 일과 지금의 감정을 천천히 이야기해요.",
    prompt: "오늘 하루를 천천히 돌아보고 싶어요.",
  },
  {
    id: "worry",
    emoji: "☁️",
    title: "걱정되는 마음 나누기",
    description: "혼자 품고 있던 걱정을 부담 없이 꺼내놓아요.",
    prompt: "요즘 마음에 걸리는 걱정이 있어요.",
  },
  {
    id: "comfort",
    emoji: "🌼",
    title: "나를 위한 위로",
    description: "지친 마음에 지금 필요한 말을 함께 찾아봐요.",
    prompt: "오늘은 따뜻한 위로가 필요한 날이에요.",
  },
  {
    id: "diary",
    emoji: "✨",
    title: "일기에서 대화 이어가기",
    description: "기록한 일기를 바탕으로 마음을 더 깊이 들여다봐요.",
    prompt: "최근에 쓴 일기에 대해 더 이야기하고 싶어요.",
  },
];

export const recentDiaryOptions = [
  { id: "", label: "일기를 연결하지 않을게요" },
  { id: "1", label: "7월 3일 · 천천히 흘러간 오후" },
  { id: "2", label: "7월 2일 · 새로운 시작 앞에서" },
  { id: "3", label: "6월 30일 · 마음에 남은 말들" },
];
