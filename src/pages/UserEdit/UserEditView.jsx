import React from 'react';
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Avatar
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const UserEditView = ({
                          form,
                          onSubmit,
                          preview,
                          avatar,
                          onAvatarChange
                      }) => {
    const { control, handleSubmit } = form;
    const { t } = useTranslation();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}
        >
            <Typography variant="h5" gutterBottom>
                {t('userEdit.title')}
            </Typography>

            {/* Avatar Preview */}
            {preview && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar
                        alt="Avatar"
                        src={preview}
                        sx={{ width: 100, height: 100, borderRadius: '50%' }}
                    />
                </Box>
            )}

            {/* File Input */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onAvatarChange(e)}
                style={{ marginBottom: 16 }}
            />
            {avatar && (
                <Typography variant="body2" mb={2}>
                    {avatar.name}
                </Typography>
            )}

            <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label={t('userEdit.fullName')}
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="dob"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type="date"
                        label={t('userEdit.dob')}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label={t('userEdit.gender')}
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    >
                        <MenuItem value={1}>{t('userEdit.male')}</MenuItem>
                        <MenuItem value={2}>{t('userEdit.female')}</MenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="role"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label={t('userEdit.role')}
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    >
                        <MenuItem value={1}>{t('userEdit.admin')}</MenuItem>
                        <MenuItem value={2}>{t('userEdit.staff')}</MenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label={t('userEdit.phoneNumber')}
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label={t('userEdit.description')}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                {t('userEdit.save')}
            </Button>
        </Box>
    );
};

export default UserEditView;
