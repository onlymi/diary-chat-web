import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import { recentDiaries, weeklyMoods } from "../mocks/diaryData";
import "./MainPage.css";

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
          <Link to="/diaries">
            <DashboardIcon name="diary" />
            <span>나의 일기</span>
          </Link>
          <Link to="/chat">
            <DashboardIcon name="chat" />
            <span>마음 대화</span>
          </Link>
          <Link to="/calendar">
            <DashboardIcon name="calendar" />
            <span>감정 캘린더</span>
          </Link>
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
              <Link to="/diaries">
                모두 보기
                <DashboardIcon name="arrow" />
              </Link>
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
                {weeklyMoods.map(({ day, height, icon }) => (
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
