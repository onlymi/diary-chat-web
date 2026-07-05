import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signupApi } from "../api/authApi";
import { EyeIcon, LeafMark } from "../components/icons";
import "../styles/AuthPage.css";
import "./SignupPage.css";

const phoneNumberPattern = /^01[016789]-?\d{3,4}-?\d{4}$/;

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, -4)}-${digits.slice(-4)}`;
};

const signupSchema = z
  .object({
    loginId: z
      .string()
      .min(4, "아이디는 4자 이상 입력해주세요.")
      .max(20, "아이디는 20자 이하로 입력해주세요.")
      .regex(/^[A-Za-z0-9_]+$/, "영문, 숫자, 밑줄만 사용할 수 있어요."),
    nickname: z
      .string()
      .trim()
      .min(2, "닉네임은 2자 이상 입력해주세요.")
      .max(20, "닉네임은 20자 이하로 입력해주세요."),
    email: z
      .string()
      .trim()
      .min(1, "이메일을 입력해주세요.")
      .pipe(z.email("올바른 이메일 주소를 입력해주세요.")),
    phoneNumber: z
      .string()
      .trim()
      .regex(phoneNumberPattern, "올바른 휴대폰 번호를 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상 입력해주세요."),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력해주세요."),
    termsAccepted: z
      .boolean()
      .refine((accepted) => accepted, "이용약관과 개인정보처리방침에 동의해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않아요.",
  });

type SignupFormValues = z.infer<typeof signupSchema>;

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      loginId: "",
      nickname: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      termsAccepted: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      await signupApi({
        loginId: values.loginId,
        nickname: values.nickname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      });
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : "회원가입에 실패했어요. 잠시 후 다시 시도해주세요.";

      setError("root.server", { message });
    }
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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="signup-field">
              <label htmlFor="user-id">아이디</label>
              <input
                id="user-id"
                type="text"
                placeholder="사용할 아이디를 입력해주세요"
                autoComplete="username"
                aria-invalid={Boolean(errors.loginId)}
                aria-describedby={errors.loginId ? "user-id-error" : "user-id-hint"}
                {...register("loginId")}
              />
              {errors.loginId ? (
                <span id="user-id-error" className="field-error" role="alert">
                  {errors.loginId.message}
                </span>
              ) : (
                <span id="user-id-hint" className="field-hint">
                  영문, 숫자, 밑줄을 사용해 4자 이상 20자 이하로 입력해주세요.
                </span>
              )}
            </div>

            <div className="signup-field">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력해주세요"
                autoComplete="nickname"
                aria-invalid={Boolean(errors.nickname)}
                aria-describedby={errors.nickname ? "nickname-error" : "nickname-hint"}
                {...register("nickname")}
              />
              {errors.nickname ? (
                <span id="nickname-error" className="field-error" role="alert">
                  {errors.nickname.message}
                </span>
              ) : (
                <span id="nickname-hint" className="field-hint">
                  2자 이상 20자 이하로 입력해주세요.
                </span>
              )}
            </div>

            <div className="signup-field">
              <label htmlFor="signup-email">이메일</label>
              <input
                id="signup-email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label htmlFor="phone-number">휴대폰 번호</label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="phone-number"
                    type="tel"
                    placeholder="010-1234-5678"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={13}
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={
                      errors.phoneNumber ? "phone-number-error" : undefined
                    }
                    onChange={(event) =>
                      field.onChange(formatPhoneNumber(event.target.value))
                    }
                  />
                )}
              />
              {errors.phoneNumber && (
                <span id="phone-number-error" className="field-error" role="alert">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">비밀번호</label>
              <div className="password-field">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력해주세요"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : "password-hint"}
                  {...register("password")}
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
              {errors.password ? (
                <span id="password-error" className="field-error" role="alert">
                  {errors.password.message}
                </span>
              ) : (
                <span id="password-hint" className="field-hint">
                  8자 이상의 비밀번호를 사용해주세요.
                </span>
              )}
            </div>

            <div className="signup-field">
              <label htmlFor="password-confirm">비밀번호 확인</label>
              <div className="password-field">
                <input
                  id="password-confirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.passwordConfirm)}
                  aria-describedby={
                    errors.passwordConfirm ? "password-confirm-error" : undefined
                  }
                  {...register("passwordConfirm")}
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
              {errors.passwordConfirm && (
                <span
                  id="password-confirm-error"
                  className="field-error"
                  role="alert"
                >
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>

            <label className="terms-check">
              <input
                type="checkbox"
                aria-invalid={Boolean(errors.termsAccepted)}
                aria-describedby={
                  errors.termsAccepted ? "terms-accepted-error" : undefined
                }
                {...register("termsAccepted")}
              />
              <span>
                <a href="#terms">이용약관</a> 및{" "}
                <a href="#privacy">개인정보처리방침</a>에 동의합니다.
              </span>
            </label>

            {errors.termsAccepted && (
              <p
                id="terms-accepted-error"
                className="signup-message error-message"
                role="alert"
              >
                {errors.termsAccepted.message}
              </p>
            )}
            {errors.root?.server && (
              <p className="signup-message error-message" role="alert">
                {errors.root.server.message}
              </p>
            )}

            <button
              className="login-button signup-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "가입 중..." : "회원가입"}
            </button>
          </form>

          <p className="signup-link login-link">
            이미 계정이 있으신가요? <Link to="/">로그인</Link>
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
