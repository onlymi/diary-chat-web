import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { DashboardIcon, LeafMark } from "../icons";
import "../../pages/MainPage.css";

const navigation = [
  { to: "/home", label: "홈", icon: "home" as const },
  { to: "/diaries", label: "나의 일기", icon: "diary" as const },
  { to: "/chat", label: "마음 대화", icon: "chat" as const },
  { to: "/calendar", label: "감정 캘린더", icon: "calendar" as const },
];

function DashboardLayout() {
  const { pathname } = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  useEffect(() => {
    const closeProfileMenu = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    const closeProfileMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileMenuOpen(false);
    };

    document.addEventListener("mousedown", closeProfileMenu);
    document.addEventListener("keydown", closeProfileMenuWithEscape);

    return () => {
      document.removeEventListener("mousedown", closeProfileMenu);
      document.removeEventListener("keydown", closeProfileMenuWithEscape);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <NavLink className="dashboard-brand" to="/home" aria-label="마음한줄 홈">
          <span className="dashboard-brand-mark">
            <LeafMark />
          </span>
          <span>마음한줄</span>
        </NavLink>

        <nav className="dashboard-nav" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to={item.to}
              key={item.to}
            >
              <DashboardIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile" ref={profileMenuRef}>
            <span className="profile-avatar">승</span>
            <span>
              <strong>승민님</strong>
              <small>@seungmin</small>
            </span>
            <button
              type="button"
              aria-label="프로필 메뉴"
              aria-expanded={profileMenuOpen}
              aria-controls="profile-menu"
              onClick={() => setProfileMenuOpen((current) => !current)}
            >
              ···
            </button>
            {profileMenuOpen && (
              <nav id="profile-menu" className="profile-menu" aria-label="프로필 메뉴">
                <Link
                  to="/settings?tab=profile"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <DashboardIcon name="user" />
                  내 프로필 보기
                </Link>
                <Link
                  to="/settings?tab=account"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <DashboardIcon name="settings" />
                  계정 설정
                </Link>
                <Link to="/" onClick={logout}>
                  <DashboardIcon name="logout" />
                  로그아웃
                </Link>
              </nav>
            )}
          </div>
        </div>
      </aside>

      <main
        className={`dashboard-main${pathname === "/chat" ? " chat-main" : ""}`}
      >
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

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
