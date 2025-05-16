import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { login } from '../../api/api';
import {loginService} from "../../services/authService.jsx";
import LoginView from './LoginView';
import loginSchema from "../../config/validation/loginSchema.jsx";

// const schema = yup.object().shape({
//     email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
//     password: yup.string().required('Vui lòng nhập mật khẩu'),
// });

const LoginContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);

    const form = useForm({
        resolver: yupResolver(loginSchema(t)),
        mode: 'onChange'
    });
    const onSubmit = async (data) => {
        try {
            const result = await loginService(data);
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (currentUser?.role === '1' || currentUser?.role === '2') {
                navigate('/users');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            setLoginError(true);
        }
    };

    return <LoginView form={form} onSubmit={onSubmit} loginError={loginError} navigate={navigate} />;
};

export default LoginContainer;