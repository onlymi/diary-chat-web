import { NavLink, Outlet, useLocation } from "react-router-dom";
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
  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

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
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/settings"
          >
            <DashboardIcon name="settings" />
            <span>설정</span>
          </NavLink>
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
