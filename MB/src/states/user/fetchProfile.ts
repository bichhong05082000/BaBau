import axios from 'axios';
import { BASE_URL } from '../../configs/api';
import { GlobalVariables } from '../../constants';
import { showCustomToast } from '../../utils/toast';

export const updateProfile= async (body: { avatar?: object, birthday: string, fullname: string, phone: string, address: string, childBirthday: string, lastMenstrualPeriod: string, childName: string }) => {
    try {
        const bodyFormData = new FormData();
        if (Object.keys(body?.avatar).length > 0) {
            bodyFormData.append('avatar', body?.avatar);
        }
        bodyFormData.append('birthday', body.birthday);
        bodyFormData.append('fullname', body.fullname);
        bodyFormData.append('phone', body.phone);
        bodyFormData.append('address', body.address);
        bodyFormData.append('childBirthday', body.childBirthday);
        bodyFormData.append('lastMenstrualPeriod', body.lastMenstrualPeriod);
        bodyFormData.append('childName', body.childName);
        const token = GlobalVariables?.tokenInfo?.accessToken
            ? `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`
            : '';
        const response = await axios.patch(`${BASE_URL}/accounts`, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token },
        });

        return response;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log('error', error?.response?.data);
    }
};
