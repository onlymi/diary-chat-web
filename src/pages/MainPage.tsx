import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LeafMark } from "../components/icons";
import "./MainPage.css";

type IconName =
  | "home"
  | "diary"
  | "chat"
  | "calendar"
  | "settings"
  | "pen"
  | "arrow"
  | "bell";

function DashboardIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5.5 9v11h13V9M9 20v-6h6v6" />
      </>
    ),
    diary: (
      <>
        <path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Z" />
        <path d="M8 3v18M11 8h5M11 12h5" />
      </>
    ),
    chat: (
      <>
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8Z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.12 2.12-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.65V20.5h-3v-.09a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-2 .36l-.06.06-2.12-2.12.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1.1H5v-3h.09a1.8 1.8 0 0 0 1.65-1.1 1.8 1.8 0 0 0-.36-2l-.06-.06 2.12-2.12.06.06a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1.1-1.65V4.5h3v.09a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 2-.36l.06-.06 2.12 2.12-.06.06a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.65 1.1H21v3h-.09A1.8 1.8 0 0 0 19.4 15Z" />
      </>
    ),
    pen: (
      <>
        <path d="m15 5 4 4M4 20l1.2-5.2L16.5 3.5a1.4 1.4 0 0 1 2 0l2 2a1.4 1.4 0 0 1 0 2L9.2 18.8 4 20Z" />
        <path d="m5.2 14.8 4 4" />
      </>
    ),
    arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const recentDiaries = [
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

function MainPage() {
  useEffect(() => {
    document.title = "나의 기록 | 마음한줄";
  }, []);

  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" to="/home" aria-label="마음한줄 홈">
          <span className="dashboard-brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </Link>

        <nav className="dashboard-nav" aria-label="주요 메뉴">
          <Link className="active" to="/home">
            <DashboardIcon name="home" />
            <span>홈</span>
          </Link>
          <a href="#diaries">
            <DashboardIcon name="diary" />
            <span>나의 일기</span>
          </a>
          <a href="#chat">
            <DashboardIcon name="chat" />
            <span>마음 대화</span>
          </a>
          <a href="#calendar">
            <DashboardIcon name="calendar" />
            <span>감정 캘린더</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#settings">
            <DashboardIcon name="settings" />
            <span>설정</span>
          </a>
          <div className="sidebar-profile">
            <span className="profile-avatar">승</span>
            <span>
              <strong>승민님</strong>
              <small>@seungmin</small>
            </span>
            <button type="button" aria-label="프로필 메뉴">
              ···
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="mobile-dashboard-brand">
            <LeafMark />
            <span>마음한줄</span>
          </div>
          <p>{today}</p>
          <button type="button" className="notification-button" aria-label="알림">
            <DashboardIcon name="bell" />
            <i />
          </button>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-greeting">
            <span className="greeting-eyebrow">GOOD EVENING</span>
            <h1>
              오늘 하루는
              <br />
              어떤 마음이었나요?
            </h1>
            <p>지금의 마음을 한 줄부터 천천히 기록해보세요.</p>
          </section>

          <section className="quick-grid" aria-label="빠른 시작">
            <article className="write-card">
              <div className="card-decoration" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="quick-icon">
                <DashboardIcon name="pen" />
              </span>
              <div>
                <small>TODAY'S NOTE</small>
                <h2>오늘의 일기 쓰기</h2>
                <p>지금 떠오르는 마음을 자유롭게 남겨보세요.</p>
              </div>
              <button type="button">
                기록 시작하기
                <DashboardIcon name="arrow" />
              </button>
            </article>

            <article className="chat-card" id="chat">
              <div className="chat-card-top">
                <span className="ai-orb">
                  <LeafMark />
                </span>
                <span className="online-dot">AI 마음친구</span>
              </div>
              <blockquote>
                “오늘 하루 중 가장
                <br />
                마음에 남은 순간은 무엇인가요?”
              </blockquote>
              <p>기록하기 어려운 마음은 대화로 시작해도 괜찮아요.</p>
              <button type="button">
                대화 시작하기
                <DashboardIcon name="arrow" />
              </button>
            </article>
          </section>

          <section className="dashboard-section recent-section" id="diaries">
            <div className="section-heading">
              <div>
                <span>RECENT STORIES</span>
                <h2>최근 기록</h2>
              </div>
              <a href="#all-diaries">
                모두 보기
                <DashboardIcon name="arrow" />
              </a>
            </div>

            <div className="diary-list">
              {recentDiaries.map((diary) => (
                <article className="diary-item" key={diary.date}>
                  <div className="diary-date">
                    <strong>{diary.date}</strong>
                    <span>{diary.weekday}</span>
                  </div>
                  <span className="diary-mood" title={diary.mood}>
                    {diary.moodIcon}
                  </span>
                  <div className="diary-copy">
                    <h3>{diary.title}</h3>
                    <p>{diary.preview}</p>
                    <div>
                      {diary.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button type="button" aria-label={`${diary.title} 일기 열기`}>
                    <DashboardIcon name="arrow" />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard-section mood-section" id="calendar">
            <div className="section-heading">
              <div>
                <span>THIS WEEK</span>
                <h2>이번 주 마음</h2>
              </div>
            </div>
            <div className="mood-summary">
              <div className="mood-chart" aria-label="이번 주 감정 기록">
                {[
                  ["월", 42, "🌿"],
                  ["화", 68, "🙂"],
                  ["수", 54, "☁️"],
                  ["목", 82, "✨"],
                  ["금", 64, "🌿"],
                  ["토", 34, ""],
                  ["일", 34, ""],
                ].map(([day, height, icon]) => (
                  <div key={day}>
                    <span className={icon ? "recorded" : ""}>
                      {icon && <i>{icon}</i>}
                      <b style={{ height: `${height}px` }} />
                    </span>
                    <small>{day}</small>
                  </div>
                ))}
              </div>
              <div className="mood-insight">
                <span>이번 주에는</span>
                <strong>평온한 마음이 가장 많았어요.</strong>
                <p>5일 동안 3개의 마음을 기록했어요.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
