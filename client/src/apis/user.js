import axios from '~/utiles/axios';
export const apiLogin = (data) => {
    return axios({
        url: '/user/login',
        method: 'POST',
        data,
    });
};

export const apiRegister = (data) => {
    return axios({
        url: '/user/register',
        method: 'POST',
        data,
    });
};

export const apiFinalRegister = (data) => {
    return axios({
        url: '/user/completed',
        method: 'POST',
        data,
    });
};

export const apiTakeCode = (data) => {
    return axios({
        url: '/user/forgot-password',
        method: 'POST',
        data,
    });
};

export const apiResetPassword = (data) => {
    return axios({
        url: '/user/reset-password',
        method: 'PUT',
        data,
    });
};
