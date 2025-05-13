import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {login} from "../api/api.jsx";
// 📌 Schema xác thực
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {

      const result = await login(data);
      const currentUser  = JSON.parse(localStorage.getItem('user'));
      console.log("Login result:", result);
      console.log("User role:", currentUser ?.role);
      // Điều hướng theo role
      if (currentUser ?.role === '1' || currentUser ?.role === '2') {
        navigate("/users");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setLoginError(true);
    }
  };
  

  return (
    <div className="">
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}>
        <Typography variant="h5" mb={2}>
          {t("login.title")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label={t("register.email")}
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label={t("register.password")}
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {loginError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              I0003: Đăng nhập thất bại!
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}>
            {t("login.title")}
          </Button>
          <Button
              variant="contained"
              color=""
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/register")}
          >
            Quay lại
          </Button>
        </form>
      </Box>
    </div>
  );
}
