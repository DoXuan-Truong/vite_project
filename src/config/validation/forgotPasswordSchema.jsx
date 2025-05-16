import * as yup from 'yup';
import { emailRule } from '../yupGlobal';
const forgotPasswordSchema = (t) => yup.object({
    email: emailRule(t),
});
export default forgotPasswordSchema;