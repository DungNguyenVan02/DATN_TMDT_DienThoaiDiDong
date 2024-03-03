import axios from '~/utiles/axios';
export const apiGetCategory = () => {
    return axios({
        url: '/category',
        method: 'GET',
    });
};
