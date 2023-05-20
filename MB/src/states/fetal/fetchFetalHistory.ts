import axios from 'axios';

import { BASE_URL } from 'configs/api';

import { GlobalVariables } from 'constants/index';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchFetalHistory = async () => {
    try {
        const res: fetal.FetalHistoryResponse = await axiosInstance.get(`/baby-diaries`);
        return res;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

export const createFetalHistory = async (body: { file?: object; note: string; weeksOfPregnancy: string }) => {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('image', body?.file);
        bodyFormData.append('note', body.note);
        bodyFormData.append('weeksOfPregnancy', body.weeksOfPregnancy);
        const token = GlobalVariables?.tokenInfo?.accessToken
            ? `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`
            : '';
        const response = await axios.post(`${BASE_URL}/baby-diaries`, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token },
        });

        return response;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log('error', error?.response?.data);
    }
};

export const updateFetalHealthy = async (body: { file?: object; note: string; weeksOfPregnancy: string }, fetalHealthyId: string) => {
    try {
        const bodyFormData = new FormData();
        if (Object.keys(body?.file).length > 0) {
            bodyFormData.append('image', body?.file);
        }
        bodyFormData.append('note', body.note);
        bodyFormData.append('weeksOfPregnancy', body.weeksOfPregnancy);
        const token = GlobalVariables?.tokenInfo?.accessToken
            ? `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`
            : '';
        const response = await axios.patch(`${BASE_URL}/baby-diaries/${fetalHealthyId}`, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token },
        });

        return response;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log('error', error?.response?.data);
    }
};

export const removeFetalHealthy = async (id: string) => {
    try {
        await axiosInstance.delete(`/baby-diaries/${id}`)
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log('error', error?.response?.data);
    }
};
