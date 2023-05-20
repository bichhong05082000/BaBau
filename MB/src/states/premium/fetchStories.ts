import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchStories = async () => {
    try {
        showLoading();
        const res: premium.StoryResponse = await axiosInstance.get(`/stories`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};
