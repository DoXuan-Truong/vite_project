import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {forgotPassword} from "../api/api.jsx";

// 📌 Schema xác thực
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
});

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forgotError, setForgotError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data);
      console.log(res);
      localStorage.setItem("fp_email", data.email);
      // Nếu thành công, điều hướng đến màn hình xác thực passwordCode
      navigate("/confirm-password-code");
    } catch (err) {
      console.error(err);
      setForgotError(true);
    }
  };

  return (
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
        {t("forgotPassword.title")}
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

        {forgotError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            I0002: Đã xảy ra lỗi trong quá trình gửi yêu cầu quên mật khẩu!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}>
          {t("forgotPassword.submit")}
        </Button>
      </form>
    </Box>
  );
}