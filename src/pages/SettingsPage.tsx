import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../components/icons";
import {
  initialNotificationSettings,
  initialPrivacySettings,
  mockProfile,
} from "../mocks/settingsData";
import "./MainPage.css";
import "./SettingsPage.css";

type SettingsTab = "profile" | "account" | "notifications" | "privacy";

const settingsTabs: {
  id: SettingsTab;
  label: string;
  description: string;
  icon: "user" | "lock" | "bell" | "settings";
}[] = [
  {
    id: "profile",
    label: "프로필",
    description: "기본 정보와 소개",
    icon: "user",
  },
  {
    id: "account",
    label: "계정 및 보안",
    description: "로그인과 비밀번호",
    icon: "lock",
  },
  {
    id: "notifications",
    label: "알림",
    description: "알림 수신 설정",
    icon: "bell",
  },
  {
    id: "privacy",
    label: "개인정보",
    description: "기록과 데이터 관리",
    icon: "settings",
  },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? "active" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifications, setNotifications] = useState(
    initialNotificationSettings,
  );
  const [privacy, setPrivacy] = useState(initialPrivacySettings);

  useEffect(() => {
    document.title = "설정 | 마음한줄";
  }, []);

  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((current) => ({ ...current, [key]: !current[key] }));
  };

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
          <Link to="/calendar">
            <DashboardIcon name="calendar" />
            <span>감정 캘린더</span>
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <Link className="active" to="/settings">
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

        <div className="settings-content">
          <header className="settings-title">
            <span>MY SETTINGS</span>
            <h1>설정</h1>
            <p>마음한줄을 나에게 편안한 공간으로 만들어보세요.</p>
          </header>

          <div className="settings-layout">
            <nav className="settings-tabs" aria-label="설정 메뉴">
              {settingsTabs.map((tab) => (
                <button
                  type="button"
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setProfileSaved(false);
                  }}
                  key={tab.id}
                >
                  <span>
                    <DashboardIcon name={tab.icon} />
                  </span>
                  <span>
                    <strong>{tab.label}</strong>
                    <small>{tab.description}</small>
                  </span>
                  <DashboardIcon name="chevron-right" />
                </button>
              ))}

              <Link className="settings-logout" to="/">
                <DashboardIcon name="logout" />
                로그아웃
              </Link>
            </nav>

            <section className="settings-panel">
              {activeTab === "profile" && (
                <>
                  <header>
                    <h2>프로필 설정</h2>
                    <p>다른 화면에 표시되는 기본 정보를 관리합니다.</p>
                  </header>
                  <div className="profile-image-setting">
                    <span>승</span>
                    <div>
                      <strong>프로필 이미지</strong>
                      <p>JPG, PNG 파일 · 최대 5MB</p>
                      <button type="button">이미지 변경</button>
                      <button type="button" className="subtle">
                        삭제
                      </button>
                    </div>
                  </div>
                  <form
                    className="settings-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setProfileSaved(true);
                    }}
                  >
                    <label>
                      닉네임
                      <input
                        name="nickname"
                        defaultValue={mockProfile.nickname}
                        maxLength={20}
                      />
                    </label>
                    <label>
                      아이디
                      <input value={mockProfile.userId} disabled />
                      <small>아이디는 변경할 수 없습니다.</small>
                    </label>
                    <label className="full">
                      한 줄 소개
                      <textarea
                        name="bio"
                        defaultValue={mockProfile.bio}
                        maxLength={80}
                        rows={3}
                      />
                    </label>
                    <div className="settings-actions full">
                      {profileSaved && <span>변경사항을 저장했어요.</span>}
                      <button type="submit">변경사항 저장</button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === "account" && (
                <>
                  <header>
                    <h2>계정 및 보안</h2>
                    <p>로그인 정보와 계정 보안을 관리합니다.</p>
                  </header>
                  <div className="setting-rows">
                    <div>
                      <span>
                        <strong>이메일</strong>
                        <small>{mockProfile.email}</small>
                      </span>
                      <button type="button">변경</button>
                    </div>
                    <div>
                      <span>
                        <strong>휴대폰 번호</strong>
                        <small>{mockProfile.phoneNumber}</small>
                      </span>
                      <button type="button">변경</button>
                    </div>
                    <div>
                      <span>
                        <strong>비밀번호</strong>
                        <small>마지막 변경: 2026년 6월 18일</small>
                      </span>
                      <button type="button">비밀번호 변경</button>
                    </div>
                  </div>
                  <div className="danger-zone">
                    <div>
                      <strong>회원 탈퇴</strong>
                      <p>탈퇴하면 모든 일기와 대화가 삭제되며 복구할 수 없습니다.</p>
                    </div>
                    <button type="button">탈퇴하기</button>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <header>
                    <h2>알림 설정</h2>
                    <p>필요한 소식만 편안하게 받아보세요.</p>
                  </header>
                  <div className="setting-rows toggle-rows">
                    <div>
                      <span>
                        <strong>일기 작성 알림</strong>
                        <small>매일 저녁 기록할 시간을 알려드려요.</small>
                      </span>
                      <Toggle
                        checked={notifications.diaryReminder}
                        onChange={() => toggleNotification("diaryReminder")}
                        label="일기 작성 알림"
                      />
                    </div>
                    <div>
                      <span>
                        <strong>마음 대화 알림</strong>
                        <small>AI 마음친구의 답변을 알려드려요.</small>
                      </span>
                      <Toggle
                        checked={notifications.chatReply}
                        onChange={() => toggleNotification("chatReply")}
                        label="마음 대화 알림"
                      />
                    </div>
                    <div>
                      <span>
                        <strong>주간 마음 리포트</strong>
                        <small>한 주의 감정 흐름을 요약해드려요.</small>
                      </span>
                      <Toggle
                        checked={notifications.weeklyReport}
                        onChange={() => toggleNotification("weeklyReport")}
                        label="주간 마음 리포트"
                      />
                    </div>
                    <div>
                      <span>
                        <strong>서비스 소식</strong>
                        <small>새로운 기능과 이벤트 소식을 받아요.</small>
                      </span>
                      <Toggle
                        checked={notifications.marketing}
                        onChange={() => toggleNotification("marketing")}
                        label="서비스 소식"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "privacy" && (
                <>
                  <header>
                    <h2>개인정보 설정</h2>
                    <p>기록과 데이터가 사용되는 방식을 관리합니다.</p>
                  </header>
                  <div className="setting-rows toggle-rows">
                    <div>
                      <span>
                        <strong>새 일기 비공개</strong>
                        <small>새로 작성하는 일기를 기본 비공개로 저장합니다.</small>
                      </span>
                      <Toggle
                        checked={privacy.privateDiary}
                        onChange={() => togglePrivacy("privateDiary")}
                        label="새 일기 비공개"
                      />
                    </div>
                    <div>
                      <span>
                        <strong>AI 개선을 위한 데이터 사용</strong>
                        <small>익명화된 대화 데이터를 서비스 개선에 사용합니다.</small>
                      </span>
                      <Toggle
                        checked={privacy.aiDataUse}
                        onChange={() => togglePrivacy("aiDataUse")}
                        label="AI 개선을 위한 데이터 사용"
                      />
                    </div>
                  </div>
                  <div className="data-download">
                    <div>
                      <strong>내 데이터 내려받기</strong>
                      <p>일기와 대화 기록을 파일로 받아볼 수 있습니다.</p>
                    </div>
                    <button type="button">다운로드 요청</button>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
