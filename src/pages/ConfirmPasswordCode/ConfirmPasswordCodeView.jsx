import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';

const ConfirmPasswordCodeView = ({ form, onSubmit, confirmError }) => {
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
                {t('confirmPasswordCode.title')}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="passwordCode"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label={t('confirmPasswordCode.passwordCode')}
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
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
                    {t('confirmPasswordCode.submit')}
                </Button>
            </form>
        </Box>
    );
};

export default ConfirmPasswordCodeView;