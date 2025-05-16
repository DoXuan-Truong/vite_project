import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { confirmPassword } from '../../api/api';
import ConfirmPasswordCodeView from './ConfirmPasswordCodeView';
import confirmPasswordSchema from '../../config/validation/confirmPasswordSchema';
import {confirmPasswordCodeService} from "../../services/authService.jsx";

const ConfirmPasswordCodeContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [confirmError, setConfirmError] = useState(false);

    const form = useForm({
        resolver: yupResolver(confirmPasswordSchema(t)),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        try {
            const res = await confirmPasswordCodeService(data);
            console.log(res);
            navigate('/login');
        } catch (err) {
            console.error(err);
            setConfirmError(true);
        }
    };

    return <ConfirmPasswordCodeView form={form} onSubmit={onSubmit} confirmError={confirmError} />;
};

export default ConfirmPasswordCodeContainer;