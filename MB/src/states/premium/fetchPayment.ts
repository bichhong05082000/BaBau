import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const fetchPayment = async () => {
    try {
        showLoading();
        const res: {
            paymentLink: {
                href: string;
                method: string;
                rel: string;
            };
        } = await axiosInstance.post(`/accounts/payment`, {
            money: 10000,
        });
        hideLoading();
        return res?.paymentLink;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

export const fetchBalance = async (subUrl: string) => {
    try {
        showLoading();
        const res = await axiosInstance.get(`/accounts/payment/success?${subUrl}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};


