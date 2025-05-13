import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {registerForm} from "../api/api.jsx";
const schema = yup
  .object({
    userName: yup.string().required().max(256),
    email: yup.string().email().required().max(256),
    fullName: yup.string().required().max(256),
    dob: yup
      .date()
      .max(new Date(), "Ngày sinh không hợp lệ")
      .required("Ngày sinh là bắt buộc"),
    gender: yup.number().oneOf([1, 2]).required(),
    role: yup.number().oneOf([1, 2]).required(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{9,12}$/, "Số điện thoại không hợp lệ")
      .nullable(),
    password: yup.string().min(8).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
  })
  .required();

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const result =  await registerForm(data);
      console.log(result);
      setSuccessMsg(t("register.success"));
      setErrorMsg("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const message =
        err.response?.data?.details?.[0]?.message ||
        err.response?.data?.message ||
        t("register.error");
      setErrorMsg(message);
    }
  };
  return (
    <Box mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        {t("register.title")}
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {[
            { name: "userName", label: t("register.userName") },
            { name: "email", label: t("register.email") },
            { name: "fullName", label: t("register.fullName") },
            { name: "dob", label: t("register.dob"), type: "date" },
            { name: "phoneNumber", label: t("register.phoneNumber") },
            {
              name: "password",
              label: t("register.password"),
              type: "password",
            },
            {
              name: "passwordConfirm",
              label: t("register.passwordConfirm"),
              type: "password",
            },
          ].map((field) => (
            <Grid item  sx={{ width: "500px" }} key={field.name}>
              <TextField
                {...register(field.name)}
                label={field.label}
                type={field.type || "text"}
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
              />
            </Grid>
          ))}

          <Grid item  sx={{ width: "500px" }}>
            <TextField
              select
              fullWidth
              label={t("register.gender")}
              defaultValue=""
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}>
              <MenuItem value={1}>{t("register.male")}</MenuItem>
              <MenuItem value={2}>{t("register.female")}</MenuItem>
            </TextField>
          </Grid>

          <Grid item  sx={{ width: "500px" }}>
            <TextField
              select
              fullWidth
              label={t("register.role")}
              defaultValue=""
              {...register("role")}
              error={!!errors.role}
              helperText={errors.role?.message}>
              <MenuItem value={1}>{t("register.admin")}</MenuItem>
              <MenuItem value={2}>{t("register.staff")}</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              {t("register.submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}