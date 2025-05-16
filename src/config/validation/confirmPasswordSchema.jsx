import * as yup from 'yup';
const confirmPasswordSchema = (t) => yup.object({
    passwordCode: yup.string().required(t('confirmPasswordCode.required')).length(4, t('confirmPasswordCode.invalidLength')),
});
export default confirmPasswordSchema;