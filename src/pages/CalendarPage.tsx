import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import { calendarMoods, moodSummary } from "../mocks/calendarData";
import "./MainPage.css";
import "./CalendarPage.css";

const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
const calendarDays = [...Array(2).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];

function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(3);
  const selectedMood = calendarMoods.find((item) => item.day === selectedDay);

  useEffect(() => {
    document.title = "감정 캘린더 | 마음한줄";
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
          <Link to="/home">
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
          <Link className="active" to="/calendar">
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

        <div className="calendar-content">
          <header className="calendar-title">
            <span>MOOD CALENDAR</span>
            <h1>감정 캘린더</h1>
            <p>하루하루 기록한 마음의 흐름을 한눈에 살펴보세요.</p>
          </header>

          <div className="calendar-layout">
            <section className="calendar-card">
              <header className="month-header">
                <button type="button" aria-label="이전 달">
                  <DashboardIcon name="chevron-left" />
                </button>
                <div>
                  <strong>2026년 7월</strong>
                  <span>12개의 마음을 기록했어요</span>
                </div>
                <button type="button" aria-label="다음 달">
                  <DashboardIcon name="chevron-right" />
                </button>
              </header>

              <div className="weekday-row">
                {weekdays.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>

              <div className="calendar-grid">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <span className="empty-day" key={`empty-${index}`} />;
                  }

                  const mood = calendarMoods.find((item) => item.day === day);

                  return (
                    <button
                      type="button"
                      className={[
                        mood ? `has-mood ${mood.color}` : "",
                        selectedDay === day ? "selected" : "",
                        day === 4 ? "today" : "",
                      ].join(" ")}
                      onClick={() => setSelectedDay(day)}
                      key={day}
                      aria-label={`${7}월 ${day}일${mood ? `, ${mood.mood}` : ""}`}
                    >
                      <time>{day}</time>
                      {mood && <span>{mood.emoji}</span>}
                      {day === 4 && <i>오늘</i>}
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className="calendar-insights">
              <section className="selected-mood-card">
                <span className="detail-label">SELECTED DAY</span>
                <time>7월 {selectedDay}일</time>
                {selectedMood ? (
                  <>
                    <div className={`selected-emoji ${selectedMood.color}`}>
                      {selectedMood.emoji}
                    </div>
                    <span className="selected-mood-name">{selectedMood.mood}</span>
                    <h2>{selectedMood.title}</h2>
                    <p>{selectedMood.note}</p>
                    <div className="selected-tags">
                      {selectedMood.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                    <button type="button">이날의 기록 보기</button>
                  </>
                ) : (
                  <div className="no-mood">
                    <LeafMark />
                    <strong>기록된 마음이 없어요.</strong>
                    <p>이날의 마음을 새롭게 기록해보세요.</p>
                    <button type="button">마음 기록하기</button>
                  </div>
                )}
              </section>

              <section className="monthly-summary">
                <div className="summary-heading">
                  <span>JULY SUMMARY</span>
                  <h2>이번 달 마음</h2>
                </div>
                <div className="mood-summary-list">
                  {moodSummary.map((item) => (
                    <div key={item.mood}>
                      <span>{item.emoji}</span>
                      <strong>{item.mood}</strong>
                      <i>
                        <b style={{ width: `${item.percent * 3}px` }} />
                      </i>
                      <small>{item.count}일</small>
                    </div>
                  ))}
                </div>
                <p>
                  이번 달에는 <strong>평온한 마음</strong>이 가장 많았어요.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CalendarPage;
