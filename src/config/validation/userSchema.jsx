import * as yup from 'yup';
import { requiredString, phoneRule } from '../yupGlobal';
const userSchema = (t) => yup.object({
    fullName: requiredString(t, 'userEdit.fullName'),
    dob: yup.date().required(t('userEdit.requiredDob')),
    gender: yup.number().oneOf([1, 2]).required(t('userEdit.requiredGender')),
    role: yup.number().oneOf([1, 2]).required(t('userEdit.requiredRole')),
    phoneNumber: phoneRule(t),
    description: requiredString(t, 'userEdit.description'),
});
export default userSchema;