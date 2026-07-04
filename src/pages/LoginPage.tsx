import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, LeafMark } from "../components/icons";
import "../styles/AuthPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/home");
  };

  useEffect(() => {
    document.title = "로그인 | 마음한줄";
  }, []);

  return (
    <main className="login-page">
      <section className="story-panel" aria-label="서비스 소개">
        <a className="brand brand-light" href="/" aria-label="마음한줄 홈">
          <span className="brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </a>

        <div className="story-content">
          <span className="eyebrow">YOUR PRIVATE MOMENT</span>
          <h1>
            오늘의 마음을,
            <br />
            천천히 들려주세요.
          </h1>
          <p>
            하루의 조각을 기록하고 대화하며
            <br />
            나를 조금 더 알아가는 시간.
          </p>

          <div className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              평범한 하루도 기록하면
              <br />
              소중한 이야기가 되니까.
            </p>
            <span className="quote-date">2026. 07. 01</span>
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

      <section className="form-panel">
        <a
          className="brand brand-dark mobile-brand"
          href="/"
          aria-label="마음한줄 홈"
        >
          <span className="brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </a>

        <div className="login-card">
          <header>
            <span className="welcome-icon">
              <LeafMark />
            </span>
            <h2>다시 만나서 반가워요</h2>
            <p>당신의 이야기가 기다리고 있어요.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <label htmlFor="user-id">아이디</label>
            <input
              id="user-id"
              className="login-identifier"
              name="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
              autoComplete="username"
              minLength={4}
              maxLength={20}
              pattern="[A-Za-z0-9_]+"
              title="영문, 숫자, 밑줄만 사용할 수 있어요."
              required
            />

            <label htmlFor="password">비밀번호</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
                minLength={6}
                required
              />
              <button
                type="button"
                className="visibility-button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>

            <div className="form-options">
              <label className="remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <span>로그인 상태 유지</span>
              </label>
              <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
            </div>

            <button className="login-button" type="submit">
              로그인
            </button>
          </form>

          <div className="divider">
            <span>또는</span>
          </div>

          <button className="social-button" type="button">
            <span className="kakao-icon">●</span>
            카카오로 계속하기
          </button>
          <button className="social-button" type="button">
            <span className="google-icon">G</span>
            Google로 계속하기
          </button>

          <p className="signup-link">
            아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
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

export default LoginPage;
