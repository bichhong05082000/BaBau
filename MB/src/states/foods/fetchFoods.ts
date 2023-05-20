import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchFoodCategoryRoot = async () => {
    try {
        showLoading();
        const res: food.FoodCategoryRoot[] = await axiosInstance.get('/food-categories-root');
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchFoodCategoryByFoodCategoryRootId = async (categoryRootId: string) =>  {
    try {
        showLoading();
        const res: food.FoodCategory[] = await axiosInstance.get(`/food-categories/root/${categoryRootId}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
}

export const fetchFoodsOfCategory = async (categoryId: string) => {
    try {
        showLoading();
        const res: food.FoodOfCategory[] = await axiosInstance.get(`/foods/category/${categoryId}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
}


export const fetchFoodsOfCategoryById = async (foodsOfCategoryId: string) => {
    try {
        showLoading();
        const res: food.FoodCategory = await axiosInstance.get(`/food-categories/${foodsOfCategoryId}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
}

export const fetchFoodById = async (id: string) => {
    try {
        const res: food.FoodOfCategory = await axiosInstance.get(`/foods/${id}`);
        return res;
    } catch (error) {
        showCustomToast('Thất bại');
        console.log(error);
    }
}

export const saveFood = async (foodId: string) => {
    try {
        showLoading();
        const res = await axiosInstance.post('/save-food', {
            idFood: foodId,
        });
        hideLoading();
        if (res) {
            showCustomToast('Lưu món ăn thành công');
        }
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Lưu món ăn thất bại');
        console.log(error);
    }
}

export const removeSaveFood = async (foodId: string) => {
    try {
        showLoading();
        const res = await axiosInstance.delete(`/save-food/${foodId}`);
        hideLoading();
        if (res) {
            showCustomToast('Xoá món ăn thành công');
        }
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Xoá món ăn thất bại');
        console.log(error);
    }
}
export const fetchFoodSaved = async () => {
    try {
        showLoading();
        const res: food.FoodSave[] = await axiosInstance.get(`/save-food`);
        hideLoading();

        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('get data failed');
        console.log(error);
    }
};
