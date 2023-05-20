import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const fetchSendOtpForgotPassword = async (email: string) => {
    try {
        const response: { statusCode: number, message: string } = await axiosInstance.post('/accounts/otp', { email });
        return response;
    } catch (error) {
        console.log(error);
        showCustomToast(error.response.data.message);
    }
};

const fetchForgotPassword = async (body: user.UserForgotPasswordRequest) => {
    try {
        await axiosInstance.post('/accounts/password', body);
        showCustomToast('Đổi mật khẩu thành công');
    } catch (error) {
        console.log(error);
        showCustomToast(error.response.data.message);
    }
};

export default fetchForgotPassword;
