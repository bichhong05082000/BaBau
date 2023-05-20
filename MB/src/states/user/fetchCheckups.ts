import { hideLoading, showLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const createBabyCheckups = async (body: user.CheckupsScheduleRequest) => {
    try {
        showLoading();
        const res: { statusCode: number; message: string } = await axiosInstance.post('/child-chart/result-schedule', body);
        showCustomToast('Thành công');
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const updateAddPrenatalCareCheckups = async (childId: string, momId: string, body: user.CheckupsScheduleRequest) => {
    try {
        showLoading();
        await axiosInstance.patch(`/child-chart/${childId}`, body?.childData);
        const resMom: { statusCode: number; message: string } = await axiosInstance.patch(`/mom-chart/${momId}`, {
            ...body?.momData,
        });
        showCustomToast('Thành công');
        hideLoading();
        return resMom;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const removePrenatalCareCheckups = async (childId: string, momId: string) => {
    try {
        showLoading();
        await axiosInstance.delete(`/child-chart/${childId}`);
        const resMom: { statusCode: number; message: string } = await axiosInstance.delete(`/mom-chart/${momId}`);
        showCustomToast('Thành công');
        hideLoading();
        return resMom;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchBabyCheckupsHistory = async () => {
    try {
        // showLoading();
        const res: user.CheckupsScheduleHistoryResponse = await axiosInstance.get('/child-chart/result-schedule');
        // hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchMomCheckupsHistory = async () => {
    try {
        // showLoading();
        const res: user.MomCheckupsResponse[] = await axiosInstance.get('/mom-chart');
        // hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};
