import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchMusicForMonths = async (months: 'first' | 'middle' | 'last') => {
    try {
        const res: premium.MusicPremiumResponse = await axiosInstance.get(`/music?three_month=${months}`);
        return res;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};
