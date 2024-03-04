import axios from '~/utiles/axios';

export const apiGetProducts = (params) => {
    return axios({
        url: '/product',
        method: 'GET',
        params,
    });
};
