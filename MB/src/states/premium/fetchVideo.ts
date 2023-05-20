import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchVideos = async () => {
    try {
        showLoading();
        const res: premium.VideoPremiumResponse = await axiosInstance.get(`/videos`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};
