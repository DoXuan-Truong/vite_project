import * as yup from 'yup';
import { emailRule, passwordRule } from '../yupGlobal';
const loginSchema = (t) => yup.object({
    email: emailRule(t),
    password: passwordRule(t),
});
export default loginSchema;