import axios from 'axios';

import { BASE_URL } from 'configs/api';
import { GlobalVariables } from 'constants/index';
import { resetStack } from 'navigation/utils';
import Storages, { KeyStorage } from 'utils/storages';

const TIME_OUT = 60 * 1000;
const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: TIME_OUT,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (GlobalVariables?.tokenInfo?.accessToken) {
            config.headers['Authorization'] = `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const onLogOut = () => {
    Storages.remove(KeyStorage.Token);
    resetStack('Login');
};

axiosInstance.interceptors.response.use(
    async (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        try {
            if (!error.response) {
                return Promise.reject(error);
            }

            switch (error.response?.status) {
                case 401:
                    onLogOut();
                    break;
                case 500:
                    // noti.error(errorMessage.SERVER_INTERNAL_ERROR);
                    break;

                case 400:
                    return error.response;

                case 403:
                    onLogOut();
                    return Promise.reject({ ...error });

                case 302:
                    return error.response;

                default:
                    break;
            }

            return Promise.reject(error);
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export default axiosInstance;
