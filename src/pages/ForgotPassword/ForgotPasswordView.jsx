import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';

const ForgotPasswordView = ({ form, onSubmit, forgotError }) => {
    const { control, handleSubmit } = form;
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 8,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
            }}>
            <Typography variant="h5" mb={2}>
                {t('forgotPassword.title')}
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
                    {t('forgotPassword.submit')}
                </Button>
            </form>
        </Box>
    );
};

export default ForgotPasswordView;