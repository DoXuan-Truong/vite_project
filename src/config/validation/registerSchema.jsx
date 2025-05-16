import * as yup from 'yup';
import { emailRule, passwordRule, requiredString, phoneRule } from '../yupGlobal';
const registerSchema = (t) => yup.object({
    userName: requiredString(t, 'register.userName'),
    email: emailRule(t),
    fullName: requiredString(t, 'register.fullName'),
    dob: yup.date().max(new Date(), t('register.invalidDob')).required(t('register.requiredDob')),
    gender: yup.number().oneOf([1, 2]).required(t('register.requiredGender')),
    role: yup.number().oneOf([1, 2]).required(t('register.requiredRole')),
    phoneNumber: phoneRule(t),
    password: passwordRule(t),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], t('register.passwordMismatch')).required(t('register.requiredConfirm')),
});
export default registerSchema;