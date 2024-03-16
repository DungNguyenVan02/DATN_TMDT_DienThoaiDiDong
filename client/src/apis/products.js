import axios from '~/utiles/axios';

export const apiGetProducts = (params) => {
    return axios({
        url: '/product',
        method: 'GET',
        params,
    });
};

export const apiGetProduct = (pid) => {
    return axios({
        url: '/product/' + pid,
        method: 'GET',
    });
};

export const apiRatingsProduct = (data) => {
    return axios({
        url: '/product/ratings',
        method: 'POST',
        data,
    });
};

export const apiDeleteProduct = (pid) => {
    return axios({
        url: '/product/' + pid,
        method: 'DELETE',
    });
};

export const apiCreateProduct = (data) => {
    return axios({
        url: '/product/create',
        method: 'POST',
        data,
    });
};
