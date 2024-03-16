import * as yup from 'yup';
const regexEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

export const schemaLogin = yup.object({
    email: yup.string().required('Vui lòng nhập trường này!').matches(regexEmail, 'Vui lòng nhập email của bạn!'),
    password: yup.string().required('Vui lòng nhập trường này!').min(6, 'Mật khẩu phải tối thiểu 6 ký tự!'),
});

export const schemaRegister = yup.object({
    fullName: yup.string().required('Vui lòng nhập trường này!').min(2, 'Vui lòng nhập tên của bạn!'),
    email: yup.string().required('Vui lòng nhập trường này!').matches(regexEmail, 'Vui lòng nhập email của bạn!'),
    phone: yup.string().required('Vui lòng nhập trường này!').matches(regexPhone, 'Số điện thoại tối thiểu 10 số'),
    password: yup.string().required('Vui lòng nhập trường này!').min(6, 'Mật khẩu phải tối thiểu 6 ký tự!'),
    passwordConfirm: yup
        .string()
        .required('Vui lòng nhập trường này!')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập vào không trùng khớp'),
});

export const schemaForgot = yup.object({
    email: yup.string().required('Vui lòng nhập trường này!').matches(regexEmail, 'Vui lòng nhập email của bạn!'),
    password: yup.string().required('Vui lòng nhập trường này!').min(6, 'Mật khẩu phải tối thiểu 6 ký tự!'),
    passwordConfirm: yup
        .string()
        .required('Vui lòng nhập trường này!')
        .oneOf([yup.ref('password'), null], 'Mật khẩu nhập vào không trùng khớp'),
    codeVerified: yup.string().required('Vui lòng nhập trường này!'),
});

export const schemaCreateProduct = yup.object({
    name: yup.string().required('Vui lòng nhập trường này!'),
    quantity: yup.string().required('Vui lòng nhập trường này!').min(1, 'Số lượng sản phẩm tối thiểu là 1'),
    price: yup.string().required('Vui lòng nhập trường này!').min(1, 'Giá sản phẩm tối thiểu 1 VNĐ'),
});
