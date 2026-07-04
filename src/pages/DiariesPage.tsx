import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import { diaries } from "../mocks/diaryData";
import "./MainPage.css";
import "./DiariesPage.css";

function DiariesPage() {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("전체 감정");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    document.title = "나의 일기 | 마음한줄";
  }, []);

  const filteredDiaries = useMemo(
    () =>
      diaries.filter(
        (diary) =>
          (mood === "전체 감정" || diary.mood === mood) &&
          `${diary.title} ${diary.content} ${diary.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [mood, query],
  );

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
          <Link to="/home">
            <DashboardIcon name="home" />
            <span>홈</span>
          </Link>
          <Link className="active" to="/diaries">
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
          <Link to="/settings">
            <DashboardIcon name="settings" />
            <span>설정</span>
          </Link>
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

      <main className="dashboard-main diaries-main">
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

        <div className="diaries-content">
          <header className="diaries-title">
            <div>
              <span>MY STORIES</span>
              <h1>나의 일기</h1>
              <p>지금까지 마음에 담아둔 이야기를 천천히 돌아보세요.</p>
            </div>
            <button type="button" className="new-diary-button">
              <DashboardIcon name="pen" />
              새 일기 쓰기
            </button>
          </header>

          <section className="diary-overview" aria-label="기록 요약">
            <div>
              <span>전체 기록</span>
              <strong>24</strong>
              <small>개의 이야기</small>
            </div>
            <div>
              <span>이번 달</span>
              <strong>6</strong>
              <small>개의 이야기</small>
            </div>
            <div>
              <span>가장 많은 마음</span>
              <strong className="overview-mood">🌿 평온</strong>
              <small>8번 기록했어요</small>
            </div>
            <blockquote>
              “기록할수록 선명해지는
              <br />
              나의 마음”
            </blockquote>
          </section>

          <section className="diary-toolbar" aria-label="일기 검색 및 필터">
            <label className="diary-search">
              <DashboardIcon name="search" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="제목, 내용, 태그로 검색"
                aria-label="일기 검색"
              />
            </label>
            <select aria-label="기간 선택" defaultValue="2026년 7월">
              <option>2026년 7월</option>
              <option>2026년 6월</option>
              <option>2026년 5월</option>
            </select>
            <select
              aria-label="감정 선택"
              value={mood}
              onChange={(event) => setMood(event.target.value)}
            >
              <option>전체 감정</option>
              <option>평온</option>
              <option>설렘</option>
              <option>생각 많음</option>
              <option>행복</option>
              <option>지침</option>
              <option>감사</option>
            </select>
            <div className="view-switch" aria-label="보기 방식">
              <button
                type="button"
                className={view === "grid" ? "active" : ""}
                onClick={() => setView("grid")}
                aria-label="카드 보기"
                aria-pressed={view === "grid"}
              >
                <DashboardIcon name="grid" />
              </button>
              <button
                type="button"
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
                aria-label="목록 보기"
                aria-pressed={view === "list"}
              >
                <DashboardIcon name="list" />
              </button>
            </div>
          </section>

          {filteredDiaries.length > 0 ? (
            <section className={`diary-card-grid ${view}`}>
              {filteredDiaries.map((diary) => (
                <article className="story-card" key={diary.id}>
                  <div className="story-card-date">
                    <strong>{diary.day}</strong>
                    <span>{diary.month}</span>
                    <small>{diary.weekday}</small>
                  </div>
                  <div className="story-card-body">
                    <div className="story-card-mood">
                      <span>{diary.emoji}</span>
                      {diary.mood}
                    </div>
                    <h2>{diary.title}</h2>
                    <p>{diary.content}</p>
                    <div className="story-card-tags">
                      {diary.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="story-more" aria-label="일기 메뉴">
                    ···
                  </button>
                </article>
              ))}
            </section>
          ) : (
            <div className="empty-diaries">
              <LeafMark />
              <strong>조건에 맞는 일기가 없어요.</strong>
              <p>검색어나 감정 필터를 변경해보세요.</p>
            </div>
          )}

          <button type="button" className="load-more-button">
            기록 더 보기
          </button>
        </div>
      </main>
    </div>
  );
}

export default DiariesPage;
