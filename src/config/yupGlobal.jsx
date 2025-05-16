import * as yup from 'yup';
export const requiredString = (t, msg) => yup.string().required(t(msg || 'common.required'));
export const emailRule = (t) => yup.string().required(t('common.required')).email(t('common.invalidEmail'));
export const passwordRule = (t) => yup.string().min(6, t('common.passwordTooShort')).required(t('common.required'));
export const phoneRule = (t) => yup.string().matches(/^\d{9,12}$/, t('common.invalidPhone'));