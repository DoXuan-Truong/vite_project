import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

// Import các màn hình
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConfirmPasswordCodePage from "./pages/ConfirmPasswordCodePage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RegisterRoute from "./components/RegisterRoute";
function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          {/* Màn hình đăng ký */}
          <Route path="/register" element={
              <RegisterRoute>
          <RegisterPage />
          </RegisterRoute>}
          />

          {/* Màn hình đăng nhập */}
          <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
          />

          {/* Màn hình quên mật khẩu */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Màn hình xác thực password code */}
          <Route path="/confirm-password-code" element={<ConfirmPasswordCodePage />} />

          {/* Màn hình danh sách user */}
          <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserListPage />
                </ProtectedRoute>
              }
          />
          {/* Màn hình chỉnh sửa user */}
          <Route path="/users/edit/:userId" element={<UserEditPage />} />

          {/* Đường dẫn mặc định */}
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
