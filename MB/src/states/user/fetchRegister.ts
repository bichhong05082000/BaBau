import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

const fetchRegister = async (user: user.UserRegisterRequest) => {
    try {
        const res: { statusCode: number, message: string } = await axiosInstance.post('/accounts', user);
        if (res && res?.statusCode === 201) {
            showCustomToast('Đăng ký thành công');
        }
        return res;
    } catch (error) {
        showCustomToast(error.message);
        console.log(error);
    }
};

export default fetchRegister;
