import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { LeafMark } from "../components/icons";
import "../styles/AuthPage.css";
import "./ForgotPasswordPage.css";

type RecoveryMethod = "email" | "phone";

function ForgotPasswordPage() {
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [userId, setUserId] = useState("");
  const [destination, setDestination] = useState("");
  const [submittedDestination, setSubmittedDestination] = useState("");

  const handleMethodChange = (nextMethod: RecoveryMethod) => {
    setMethod(nextMethod);
    setDestination("");
    setSubmittedDestination("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedDestination(destination);
  };

  useEffect(() => {
    document.title = "비밀번호 찾기 | 마음한줄";
  }, []);

  return (
    <main className="login-page forgot-password-page">
      <section className="story-panel" aria-label="서비스 소개">
        <Link className="brand brand-light" to="/" aria-label="마음한줄 홈">
          <span className="brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </Link>

        <div className="story-content forgot-story-content">
          <span className="eyebrow">FIND YOUR WAY BACK</span>
          <h1>
            잠시 잊어도,
            <br />
            다시 이어갈 수 있어요.
          </h1>
          <p>
            가입할 때 등록한 연락처를 확인하면
            <br />
            새로운 비밀번호를 보내드릴게요.
          </p>

          <div className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              멈춘 자리에서 다시,
              <br />
              당신의 이야기를 이어가요.
            </p>
            <span className="quote-date">마음한줄</span>
          </div>
        </div>

        <div className="botanical" aria-hidden="true">
          <i className="stem stem-one" />
          <i className="stem stem-two" />
          <i className="leaf leaf-one" />
          <i className="leaf leaf-two" />
          <i className="leaf leaf-three" />
          <i className="leaf leaf-four" />
        </div>
        <p className="story-footer">나만의 조용한 기록 공간</p>
      </section>

      <section className="form-panel forgot-form-panel">
        <Link
          className="brand brand-dark mobile-brand"
          to="/"
          aria-label="마음한줄 홈"
        >
          <span className="brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </Link>

        <div className="login-card forgot-password-card">
          <header>
            <span className="welcome-icon">
              <LeafMark />
            </span>
            <h2>비밀번호를 잊으셨나요?</h2>
            <p>새 비밀번호를 받을 방법을 선택해주세요.</p>
          </header>

          <div className="recovery-methods" role="group" aria-label="발급 방법">
            <button
              type="button"
              className={method === "email" ? "active" : ""}
              aria-pressed={method === "email"}
              onClick={() => handleMethodChange("email")}
            >
              이메일
            </button>
            <button
              type="button"
              className={method === "phone" ? "active" : ""}
              aria-pressed={method === "phone"}
              onClick={() => handleMethodChange("phone")}
            >
              휴대폰 번호
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="recovery-user-id">아이디</label>
            <input
              id="recovery-user-id"
              className="recovery-input recovery-user-id"
              name="userId"
              type="text"
              placeholder="가입한 아이디를 입력해주세요"
              autoComplete="username"
              minLength={4}
              maxLength={20}
              pattern="[A-Za-z0-9_]+"
              title="영문, 숫자, 밑줄만 사용할 수 있어요."
              value={userId}
              onChange={(event) => {
                setUserId(event.target.value);
                setSubmittedDestination("");
              }}
              required
            />

            <label htmlFor="recovery-destination">
              {method === "email" ? "이메일" : "휴대폰 번호"}
            </label>
            <input
              key={method}
              id="recovery-destination"
              className="recovery-input"
              name={method}
              type={method === "email" ? "email" : "tel"}
              placeholder={
                method === "email" ? "example@email.com" : "010-1234-5678"
              }
              autoComplete={method === "email" ? "email" : "tel"}
              inputMode={method === "email" ? "email" : "tel"}
              pattern={
                method === "phone"
                  ? "01[016789]-?[0-9]{3,4}-?[0-9]{4}"
                  : undefined
              }
              title={
                method === "phone"
                  ? "휴대폰 번호를 올바르게 입력해주세요."
                  : undefined
              }
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                setSubmittedDestination("");
              }}
              required
            />

            <p className="recovery-help">
              가입 시 등록한 {method === "email" ? "이메일" : "휴대폰 번호"}
              를 입력해주세요.
            </p>

            <button className="login-button recovery-button" type="submit">
              새 비밀번호 받기
            </button>
          </form>

          {submittedDestination && (
            <div className="recovery-result" role="status">
              <strong>입력 정보를 확인했어요.</strong>
              <span>
                {userId} · {submittedDestination}
              </span>
              <p>
                가입 정보와 일치하면 새 비밀번호가 발송됩니다.
              </p>
            </div>
          )}

          <p className="signup-link back-to-login">
            비밀번호가 기억나셨나요? <Link to="/">로그인</Link>
          </p>
        </div>

        <footer className="form-footer">
          <span>© 2026 마음한줄</span>
          <nav aria-label="정책 링크">
            <a href="#terms">이용약관</a>
            <a href="#privacy">개인정보처리방침</a>
          </nav>
        </footer>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;
