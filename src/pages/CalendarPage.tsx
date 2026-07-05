import { useEffect, useState } from "react";
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

  return (
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
  );
}

export default CalendarPage;
