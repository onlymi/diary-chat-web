import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import {
  conversationStarters,
  recentDiaryOptions,
} from "../mocks/chatData";
import "./NewChatPage.css";

function NewChatPage() {
  const navigate = useNavigate();
  const [selectedStarter, setSelectedStarter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "새 마음 대화 | 마음한줄";
  }, []);

  const selectStarter = (id: string, prompt: string) => {
    setSelectedStarter(id);
    setMessage(prompt);
  };

  const startConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/chat");
  };

  return (
    <div className="new-chat-content">
      <header className="new-chat-header">
        <Link to="/chat" className="back-to-chat">
          <DashboardIcon name="chevron-left" />
          이전
        </Link>
        <span>NEW CONVERSATION</span>
      </header>

      <section className="new-chat-intro">
        <span className="new-chat-orb">
          <LeafMark />
        </span>
        <p>AI 마음친구</p>
        <h1>
          어떤 마음부터
          <br />
          이야기해볼까요?
        </h1>
        <span>정답은 없어요. 지금 끌리는 이야기로 편하게 시작해보세요.</span>
      </section>

      <form className="new-chat-form" onSubmit={startConversation}>
        <fieldset className="starter-section">
          <legend>대화 주제 선택</legend>
          <div className="starter-grid">
            {conversationStarters.map((starter) => (
              <button
                type="button"
                className={selectedStarter === starter.id ? "active" : ""}
                aria-pressed={selectedStarter === starter.id}
                onClick={() => selectStarter(starter.id, starter.prompt)}
                key={starter.id}
              >
                <span>{starter.emoji}</span>
                <div>
                  <strong>{starter.title}</strong>
                  <p>{starter.description}</p>
                </div>
                {selectedStarter === starter.id && (
                  <i>
                    <DashboardIcon name="check" />
                  </i>
                )}
              </button>
            ))}
          </div>
        </fieldset>

        <section className="chat-context-card">
          <label htmlFor="connected-diary">
            최근 일기 연결
            <span>선택한 일기를 마음친구가 대화의 맥락으로 참고해요.</span>
          </label>
          <select id="connected-diary" name="diaryId" defaultValue="">
            {recentDiaryOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </section>

        <section className="first-message-card">
          <label htmlFor="first-message">
            첫 이야기를 들려주세요
            <span>선택한 문장을 자유롭게 바꾸거나 새로 작성해도 좋아요.</span>
          </label>
          <div>
            <textarea
              id="first-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="지금 떠오르는 마음을 편하게 적어주세요..."
              rows={3}
              maxLength={500}
              required
            />
            <small>{message.length} / 500</small>
          </div>
        </section>

        <button
          type="submit"
          className="start-conversation-button"
          disabled={!message.trim()}
        >
          마음 대화 시작하기
          <DashboardIcon name="arrow" />
        </button>
        <p className="new-chat-notice">
          대화 내용은 나만 볼 수 있으며 안전하게 보관됩니다.
        </p>
      </form>
    </div>
  );
}

export default NewChatPage;
