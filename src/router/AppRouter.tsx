import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import CalendarPage from "../pages/CalendarPage";
import ChatPage from "../pages/ChatPage";
import DiariesPage from "../pages/DiariesPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import SettingsPage from "../pages/SettingsPage";
import SignupPage from "../pages/SignupPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/diaries" element={<DiariesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
