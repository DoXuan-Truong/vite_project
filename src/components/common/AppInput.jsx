import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const AppInput = ({ name, control, label, ...props }) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                label={label}
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...props}
            />
        )}
    />
);

export default AppInput;