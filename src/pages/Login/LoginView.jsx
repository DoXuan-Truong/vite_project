import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';

const LoginView = ({ form, onSubmit, loginError, navigate }) => {
    const { control, handleSubmit } = form;
    const { t } = useTranslation();

    return (
        <Box
            sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" mb={2}>
                {t('login.title')}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label={t('register.email')}
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            fullWidth
                            type="password"
                            label={t('register.password')}
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                {loginError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        I0003: Đăng nhập thất bại!
                    </Alert>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    {t('login.title')}
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/forgot-password')}
                >
                    Quên mật khẩu
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/register')}
                >
                    Quay lại
                </Button>
            </form>
        </Box>
    );
};

export default LoginView;
