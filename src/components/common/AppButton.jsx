import React from 'react';
import { Button } from '@mui/material';

const AppButton = ({ children, ...props }) => (
    <Button variant="contained" {...props}>{children}</Button>
);

export default AppButton;