import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {confirmPassword} from "../api/api.jsx";

// 📌 Schema xác thực
const schema = yup.object().shape({
  passwordCode: yup
    .string()
    .required("Vui lòng nhập mã xác thực")
    .length(4, "Mã xác thực phải có 4 ký tự"),
});

export default function ConfirmPasswordCodePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirmError, setConfirmError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
     const res = await confirmPassword(data);
     console.log(res);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setConfirmError(true);
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
        {t("confirmPasswordCode.title")}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label={t("confirmPasswordCode.passwordCode")}
          margin="normal"
          {...register("passwordCode")}
          error={!!errors.passwordCode}
          helperText={errors.passwordCode?.message}
        />

        {confirmError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            I0002: Đã xảy ra lỗi trong quá trình xác thực mã!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}>
          {t("confirmPasswordCode.submit")}
        </Button>
      </form>
    </Box>
  );
}