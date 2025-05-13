import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import { userDetail, userUpdate } from "../api/api.jsx";

export default function UserEditPage() {
  const { t } = useTranslation();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await userDetail(userId);
        const formattedDob = new Date(res.dob).toISOString().split("T")[0];
        setUser(res);
        setValue("userName", res.userName);
        setValue("email", res.email);
        setValue("fullName", res.fullName);
        setValue("dob", formattedDob);
        setValue("gender", res.gender);
        setValue("role", res.role);
        setValue("phoneNumber", res.phoneNumber);
        setValue("description", res.description);
        if (res.avatar) {
          setPreview(`http://127.0.0.1:8080${res.avatar}`);
        }
      } catch (err) {
        console.error(err);
        setError("I0002: Lỗi khi tải thông tin người dùng");
      }
    };

    fetchUserDetail();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await userUpdate(userId, data, avatar);
      setError("I0001: Cập nhật người dùng thành công");
      navigate("/users");
    } catch (err) {
      console.error(err);
      setError("I0002: Lỗi khi cập nhật người dùng");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t("userEdit.title")}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
              id="avatar-input"
          />
          <label htmlFor="avatar-input">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {preview && (
              <Box mt={1}>
                <img
                    src={preview}
                    alt="Avatar Preview"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                    }}
                />
              </Box>
          )}
          {avatar && <Typography variant="body2">{avatar.name}</Typography>}
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ width: "500px" }}>
              <TextField
                  label={t("userEdit.userName")}
                  fullWidth
                  disabled
                  value={user.userName}
                  sx={{ mb: 2 }}
              />
              <TextField
                  label={t("userEdit.email")}
                  fullWidth
                  disabled
                  value={user.email}
                  sx={{ mb: 2 }}
              />
              <TextField
                  label={t("userEdit.fullName")}
                  fullWidth
                  {...register("fullName", {
                    required: "Họ và tên là bắt buộc",
                    validate: value => {
                      // Kiểm tra nếu value chứa số
                      const regex = /^[A-Za-z\s]+$/;
                      if (!regex.test(value)) {
                        return "Họ và tên không được chứa số";
                      }
                      return true; // Nếu không có lỗi
                    }
                  })}
                  sx={{ mb: 2 }}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
              />

              <TextField
                  label={t("userEdit.dob")}
                  fullWidth
                  type="date"
                  {...register("dob", { required: "Date of Birth is required" })}
                  sx={{ mb: 2 }}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t("userEdit.gender")}</InputLabel>
                <Select
                    label={t("userEdit.gender")}
                    {...register("gender", { required: "Gender is required" })}
                    defaultValue={user.gender}
                >
                  <MenuItem value={1}>{t("userEdit.male")}</MenuItem>
                  <MenuItem value={2}>{t("userEdit.female")}</MenuItem>
                </Select>
                {errors.gender && (
                    <FormHelperText error>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{ width: "500px" }}>
              <TextField
                  label={t("userEdit.phoneNumber")}
                  fullWidth
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: "Phone Number must be 10-11 digits and contain only numbers",
                    },
                  })}
                  sx={{ mb: 2 }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
              />
              <TextField
                  label={t("userEdit.description")}
                  fullWidth
                  multiline
                  rows={4.1}
                  {...register("description", { required: "Description is required" })}
                  sx={{ mb: 2 }}
                  error={!!errors.description}
                  helperText={errors.description?.message}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t("userEdit.role")}</InputLabel>
                <Select
                    label={t("userEdit.role")}
                    {...register("role", { required: "Role is required" })}
                    defaultValue={user.role}
                >
                  <MenuItem value={1}>{t("userEdit.admin")}</MenuItem>
                  <MenuItem value={2}>{t("userEdit.staff")}</MenuItem>
                </Select>
                {errors.role && (
                    <FormHelperText error>{errors.role.message}</FormHelperText>
                )}
              </FormControl>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  {t("userEdit.save")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
  );
}
