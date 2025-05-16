import {
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';

const RegisterView = ({ form, onSubmit, errorMsg, successMsg }) => {
    const { control, handleSubmit } = form;
    const { t } = useTranslation();

    const fields = [
        { name: 'userName', label: t('register.userName') },
        { name: 'email', label: t('register.email') },
        { name: 'fullName', label: t('register.fullName') },
        { name: 'dob', label: t('register.dob'), type: 'date' },
        { name: 'phoneNumber', label: t('register.phoneNumber') },
        { name: 'password', label: t('register.password'), type: 'password' },
        { name: 'passwordConfirm', label: t('register.passwordConfirm'), type: 'password' },
    ];

    return (
        <Box mx="auto" mt={4}>
            <Typography variant="h5" gutterBottom>
                {t('register.title')}
            </Typography>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    {fields.map((field) => (
                        <Grid item key={field.name} sx={{ width: '500px' }}>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field: inputField, fieldState }) => (
                                    <TextField
                                        {...inputField}
                                        label={field.label}
                                        type={field.type || 'text'}
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                    />
                                )}
                            />
                        </Grid>
                    ))}

                    <Grid item sx={{ width: '500px' }}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label={t('register.gender')}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                >
                                    <MenuItem value={1}>{t('register.male')}</MenuItem>
                                    <MenuItem value={2}>{t('register.female')}</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item sx={{ width: '500px' }}>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label={t('register.role')}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                >
                                    <MenuItem value={1}>{t('register.admin')}</MenuItem>
                                    <MenuItem value={2}>{t('register.staff')}</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            {t('register.submit')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default RegisterView;