import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { registerForm } from '../../api/api';
import RegisterView from './RegisterView';
import registerSchema from '../../config/validation/registerSchema';
import {registerService} from "../../services/authService.jsx";

const RegisterContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const form = useForm({
        resolver: yupResolver(registerSchema(t)),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        try {
            const result = await registerService(data);
            console.log(result);
            setSuccessMsg(t('register.success'));
            setErrorMsg('');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            const message =
                err.response?.data?.details?.[0]?.message ||
                err.response?.data?.message ||
                t('register.error');
            setErrorMsg(message);
        }
    };

    return <RegisterView form={form} onSubmit={onSubmit} errorMsg={errorMsg} successMsg={successMsg} />;
};

export default RegisterContainer;