import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
// import { userDetail, userUpdate } from '../../api/api';
import UserEditView from './UserEditView';
import {yupResolver} from "@hookform/resolvers/yup";
// import loginSchema from "../../config/validation/loginSchema.jsx";
import userSchema from "../../config/validation/userSchema.jsx";
import {getUserDetail, updateUser} from "../../services/userService.jsx";
// import userEditSchema from '../../config/validation/userEditSchema';

const UserEditContainer = () => {
    const {t} = useTranslation();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const form = useForm({
        resolver: yupResolver(userSchema(t)),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            dob: '',
            gender: '',
            role: '',
            phoneNumber: '',
            description: '',
        }
    });

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const res = await getUserDetail(userId);
                const formattedDob = new Date(res.dob).toISOString().split('T')[0];
                setUser(res);
                form.setValue('userName', res.userName);
                form.setValue('email', res.email);
                form.setValue('fullName', res.fullName);
                form.setValue('dob', formattedDob);
                form.setValue('gender', res.gender);
                form.setValue('role', res.role);
                form.setValue('phoneNumber', res.phoneNumber);
                form.setValue('description', res.description);
                if (res.avatar) {
                    setPreview(`http://127.0.0.1:8080${res.avatar}`);
                }
            } catch (err) {
                console.error(err);
                setError('I0002: Lỗi khi tải thông tin người dùng');
            }
        };

        fetchUserDetail();
    }, [userId, form]);

    const onSubmit = async (data) => {
        try {
            const res = await updateUser(userId, data, avatar);
            setError('I0001: Cập nhật người dùng thành công');
            navigate('/users');
        } catch (err) {
            console.error(err);
            setError('I0002: Lỗi khi cập nhật người dùng');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <UserEditView
            t={t}
            user={user}
            form={form}
            error={error}
            avatar={avatar}
            preview={preview}
            onSubmit={onSubmit}
            onAvatarChange={handleAvatarChange}
        />
    );
};

export default UserEditContainer;