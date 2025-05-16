// src/services/authService.js
import axiosInstance from '../api/api';
import { getUserFromToken } from '../auth/auth';
import dayjs from 'dayjs';

export const loginService = async ({ email, password }) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.data.accessToken;
    localStorage.setItem('accessToken', token);
    const user = getUserFromToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
};

export const registerService = async (data) => {
    const payload = {
        ...data,
        dob: dayjs(data.dob).format('YYYY-MM-DD'),
        gender: Number(data.gender),
        role: Number(data.role),
        passwordCode: '1234',
    };
    delete payload.passwordConfirm;

    const { data: resData } = await axiosInstance.post('/users/create', payload);
    return resData;
};

export const forgotPasswordService = async ({ email }) => {
    const { data } = await axiosInstance.post('/auth/forgot-password', { email });
    return data;
};

export const confirmPasswordCodeService = async ({ passwordCode }) => {
    const email = localStorage.getItem('fp_email');
    if (!email) {
        alert('Không tìm thấy email, vui lòng quay lại bước trước.');
        return;
    }
    const { data } = await axiosInstance.post('/auth/confirm-password-code', { email, passwordCode });
    return data;
};
