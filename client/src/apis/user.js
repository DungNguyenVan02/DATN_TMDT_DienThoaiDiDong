import axios from '~/utiles/axios';
export const apiLogin = (data) => {
    return axios({
        url: '/user/login',
        method: 'POST',
        data,
    });
};
