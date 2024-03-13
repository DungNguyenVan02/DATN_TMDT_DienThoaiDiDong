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

export const apiGetUsers = (params) => {
    return axios({
        url: '/user/',
        method: 'GET',
        params,
    });
};

export const apiDeleteUser = (uid) => {
    return axios({
        url: '/user/' + uid,
        method: 'DELETE',
    });
};

export const apiUpdateUserByAdmin = (uid, data) => {
    console.log(data);
    return axios({
        url: '/user/update/' + uid,
        method: 'PUT',
        data,
    });
};
