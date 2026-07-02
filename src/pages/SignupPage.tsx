import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, LeafMark } from "../components/icons";
import "../styles/AuthPage.css";
import "./SignupPage.css";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않아요.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  };

  useEffect(() => {
    document.title = "회원가입 | 마음한줄";
  }, []);

  return (
    <main className="login-page signup-page">
      <section className="story-panel" aria-label="서비스 소개">
        <Link className="brand brand-light" to="/" aria-label="마음한줄 홈">
          <span className="brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </Link>

        <div className="story-content signup-story-content">
          <span className="eyebrow">BEGIN YOUR STORY</span>
          <h1>
            당신의 이야기를,
            <br />
            오늘부터 시작해요.
          </h1>
          <p>
            누구에게도 말하지 못한 마음까지
            <br />
            편안하게 기록할 수 있는 공간.
          </p>

          <div className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              시작은 작아도 괜찮아요.
              <br />한 줄이면 충분하니까.
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

      <section className="form-panel signup-form-panel">
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

        <div className="login-card signup-card">
          <header>
            <span className="welcome-icon">
              <LeafMark />
            </span>
            <h2>처음 만나서 반가워요</h2>
            <p>당신만의 기록 공간을 만들어볼까요?</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력해주세요"
                autoComplete="nickname"
                minLength={2}
                maxLength={20}
                required
              />
              <span className="field-hint">
                2자 이상 20자 이하로 입력해주세요.
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="signup-email">이메일</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">비밀번호</label>
              <div className="password-field">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력해주세요"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="visibility-button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
              <span className="field-hint">
                8자 이상의 비밀번호를 사용해주세요.
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="password-confirm">비밀번호 확인</label>
              <div className="password-field">
                <input
                  id="password-confirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  autoComplete="new-password"
                  minLength={8}
                  aria-describedby={error ? "signup-error" : undefined}
                  required
                />
                <button
                  type="button"
                  className="visibility-button"
                  onClick={() => setShowPasswordConfirm((value) => !value)}
                  aria-label={
                    showPasswordConfirm
                      ? "비밀번호 확인 숨기기"
                      : "비밀번호 확인 보기"
                  }
                >
                  <EyeIcon hidden={showPasswordConfirm} />
                </button>
              </div>
            </div>

            <label className="terms-check">
              <input type="checkbox" name="termsAccepted" required />
              <span>
                <a href="#terms">이용약관</a> 및{" "}
                <a href="#privacy">개인정보처리방침</a>에 동의합니다.
              </span>
            </label>

            {error && (
              <p
                id="signup-error"
                className="signup-message error-message"
                role="alert"
              >
                {error}
              </p>
            )}
            {submitted && (
              <p className="signup-message success-message" role="status">
                입력을 확인했어요. 실제 API 연결 후 가입이 완료됩니다.
              </p>
            )}

            <button className="login-button signup-button" type="submit">
              회원가입
            </button>
          </form>

          <p className="signup-link login-link">
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
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

export default SignupPage;
