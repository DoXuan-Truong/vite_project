import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { forgotPassword } from '../../api/api';
import ForgotPasswordView from './ForgotPasswordView';
import forgotPasswordSchema from '../../config/validation/forgotPasswordSchema';
import {forgotPasswordService} from "../../services/authService.jsx";

const ForgotPasswordContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [forgotError, setForgotError] = useState(false);

    const form = useForm({
        resolver: yupResolver(forgotPasswordSchema(t)),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        try {
            const res = await forgotPasswordService(data);
            localStorage.setItem('fp_email', data.email);
            navigate('/confirm-password-code');
        } catch (err) {
            console.error(err);
            setForgotError(true);
        }
    };

    return <ForgotPasswordView form={form} onSubmit={onSubmit} forgotError={forgotError} />;
};

export default ForgotPasswordContainer;