import { useEffect, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import { moodOptions, weatherOptions } from "../mocks/diaryFormData";
import "./NewDiaryPage.css";

function NewDiaryPage() {
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "새 일기 쓰기 | 마음한줄";
  }, []);

  const addTag = () => {
    const nextTag = tagInput.trim().replace(/^#/, "");

    if (nextTag && !tags.includes(nextTag) && tags.length < 5) {
      setTags((current) => [...current, nextTag]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const saveDiary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("오늘의 일기를 저장했어요.");
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="new-diary-content">
      <header className="new-diary-header">
        <div>
          <span>NEW STORY</span>
          <h1>오늘의 마음 기록하기</h1>
          <p>잘 쓰려고 애쓰지 않아도 괜찮아요. 지금의 마음이면 충분해요.</p>
        </div>
        <Link className="back-to-diaries" to="/diaries">
          <DashboardIcon name="chevron-left" />
          이전
        </Link>
      </header>

      <form className="diary-editor" onSubmit={saveDiary}>
        <section className="editor-main">
          <div className="editor-paper">
            <div className="editor-date-row">
              <label>
                기록 날짜
                <input type="date" name="diaryDate" defaultValue={today} required />
              </label>
              <span>오늘의 이야기를 들려주세요</span>
            </div>

            <input
              className="diary-title-input"
              name="title"
              type="text"
              placeholder="오늘의 제목"
              maxLength={60}
              required
            />
            <textarea
              className="diary-content-input"
              name="content"
              placeholder={"어떤 하루였나요?\n마음에 남은 순간을 천천히 적어보세요."}
              maxLength={5000}
              required
            />

            <div className="image-upload">
              <DashboardIcon name="image" />
              <div>
                <strong>오늘의 장면도 함께 남겨보세요</strong>
                <span>JPG, PNG · 한 장당 최대 10MB</span>
              </div>
              <label>
                이미지 추가
                <input type="file" accept="image/png,image/jpeg" multiple />
              </label>
            </div>

            <div className="tag-editor">
              <span>태그</span>
              <div>
                {tags.map((tag) => (
                  <button
                    type="button"
                    onClick={() =>
                      setTags((current) => current.filter((item) => item !== tag))
                    }
                    key={tag}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    #{tag} ×
                  </button>
                ))}
                {tags.length < 5 && (
                  <input
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={addTag}
                    placeholder="태그 입력 후 Enter"
                    maxLength={12}
                  />
                )}
              </div>
              <small>최대 5개까지 추가할 수 있어요.</small>
            </div>
          </div>
        </section>

        <aside className="editor-options">
          <section className="option-card">
            <header>
              <span className="option-icon">
                <LeafMark />
              </span>
              <div>
                <h2>오늘의 감정</h2>
                <p>지금 마음과 가장 가까운 감정</p>
              </div>
            </header>
            <div className="emotion-options">
              {moodOptions.map((option) => (
                <button
                  type="button"
                  className={mood === option.value ? "active" : ""}
                  aria-pressed={mood === option.value}
                  onClick={() => setMood(option.value)}
                  key={option.value}
                >
                  <span>{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="mood" value={mood} />
          </section>

          <section className="option-card weather-card">
            <header>
              <div>
                <h2>오늘의 날씨</h2>
                <p>기억 속 하루는 어떤 날씨였나요?</p>
              </div>
            </header>
            <div className="weather-options">
              {weatherOptions.map((option) => (
                <button
                  type="button"
                  className={weather === option.value ? "active" : ""}
                  aria-pressed={weather === option.value}
                  onClick={() => setWeather(option.value)}
                  key={option.value}
                >
                  <span>{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="weather" value={weather} />
          </section>

          <section className="option-card privacy-card">
            <div>
              <strong>나만 보기</strong>
              <p>이 일기를 비공개로 안전하게 보관합니다.</p>
            </div>
            <button
              type="button"
              className={isPrivate ? "active" : ""}
              role="switch"
              aria-checked={isPrivate}
              onClick={() => setIsPrivate((current) => !current)}
            >
              <span />
            </button>
            <input type="hidden" name="isPrivate" value={String(isPrivate)} />
          </section>

          <div className="editor-actions">
            <button
              type="button"
              className="draft-button"
              onClick={() => setMessage("임시 저장했어요.")}
            >
              임시저장
            </button>
            <button type="submit" className="save-diary-button">
              <DashboardIcon name="check" />
              일기 저장하기
            </button>
          </div>
          {message && (
            <p className="editor-message" role="status">
              {message}
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}

export default NewDiaryPage;
