import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AppModal = ({ open, title, content, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={onConfirm} color="error">Xác nhận</Button>
        </DialogActions>
    </Dialog>
);

export default AppModal;