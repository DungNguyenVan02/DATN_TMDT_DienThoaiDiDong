import * as yup from 'yup';
// eslint-disable-next-line no-useless-escape
const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
export const schemaLogin = yup.object({
    email: yup.string().required('Vui lòng nhập trường này!').matches(regexEmail, 'Vui lòng nhập email của bạn!'),
    password: yup.string().required('Vui lòng nhập trường này!').min(6, 'Mật khẩu phải tối thiểu 6 ký tự!'),
});
