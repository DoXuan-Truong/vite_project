// src/auth/auth.js
import { jwtDecode } from 'jwt-decode';

/** Decode token và lấy thông tin user */
export const getUserFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded?.data || null;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

/** Lưu accessToken và user vào localStorage */
export const saveAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
    const user = getUserFromToken(token);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

/** Lấy accessToken hiện tại */
export const getAccessToken = () => localStorage.getItem('accessToken');

/** Lấy user từ localStorage */
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/** Xoá token + user khỏi localStorage */
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
};
