import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { DashboardIcon, LeafMark } from "../components/icons";
import {
  chatPrompts,
  chatSessions,
  initialChatMessages,
} from "../mocks/chatData";
import type { ChatMessage } from "../mocks/chatData";
import "./MainPage.css";
import "./ChatPage.css";

function ChatPage() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "마음 대화 | 마음한줄";
  }, []);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = message.trim();

    if (!content) return;

    const nextMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      content,
      time: "방금",
    };

    setMessages((current) => [...current, nextMessage]);
    setMessage("");
  };

  return (
    <div className="chat-layout">
          <aside className="chat-history">
            <div className="chat-history-header">
              <div>
                <span>MY CONVERSATIONS</span>
                <h1>마음 대화</h1>
              </div>
              <button type="button" aria-label="새 대화">
                <DashboardIcon name="plus" />
              </button>
            </div>

            <label className="chat-search">
              <DashboardIcon name="search" />
              <input type="search" placeholder="대화 검색" />
            </label>

            <div className="chat-session-list">
              <span className="session-period">최근 대화</span>
              {chatSessions.map((session) => (
                <button
                  type="button"
                  className={session.active ? "active" : ""}
                  key={session.id}
                >
                  <span className="session-leaf">
                    <LeafMark />
                  </span>
                  <span className="session-copy">
                    <strong>{session.title}</strong>
                    <small>{session.preview}</small>
                  </span>
                  <time>{session.date}</time>
                </button>
              ))}
            </div>

            <p className="chat-privacy">
              대화 내용은 나만 볼 수 있으며
              <br />
              안전하게 보관됩니다.
            </p>
          </aside>

          <section className="conversation-panel">
            <header className="conversation-header">
              <div className="ai-profile">
                <span>
                  <LeafMark />
                </span>
                <div>
                  <strong>AI 마음친구</strong>
                  <small>천천히 듣고 있어요</small>
                </div>
              </div>
              <button type="button" aria-label="대화 메뉴">
                ···
              </button>
            </header>

            <div className="conversation-date">
              <span>오늘</span>
            </div>

            <div className="message-list" aria-live="polite">
              {messages.map((item) => (
                <div className={`message-row ${item.sender}`} key={item.id}>
                  {item.sender === "ai" && (
                    <span className="message-avatar">
                      <LeafMark />
                    </span>
                  )}
                  <div>
                    <p>
                      {item.content.split("\n").map((line, index) => (
                        <span key={`${item.id}-${index}`}>
                          {line}
                          {index < item.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <time>{item.time}</time>
                  </div>
                </div>
              ))}
            </div>

            <div className="prompt-chips">
              {chatPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => setMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form className="message-composer" onSubmit={sendMessage}>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="지금 마음을 편하게 이야기해주세요..."
                rows={1}
                aria-label="메시지"
              />
              <button type="submit" disabled={!message.trim()} aria-label="전송">
                <DashboardIcon name="send" />
              </button>
            </form>
            <p className="chat-disclaimer">
              AI의 답변은 전문적인 의료 상담을 대신하지 않습니다.
            </p>
          </section>
    </div>
  );
}

export default ChatPage;
