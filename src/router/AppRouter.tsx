import { BrowserRouter, Route, Routes } from "react-router-dom";
import DiariesPage from "../pages/DiariesPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import SignupPage from "../pages/SignupPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/diaries" element={<DiariesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
