import { navigate } from 'navigation/utils';

export const goToFoods = (foodCategoryRoot: food.FoodCategoryRoot) => navigate('Foods', { foodCategoryRoot });

export const goToFoodDetail = (foodCategory: food.FoodCategory ) => navigate('FoodDetail', { foodCategory });

export const goToFoodDetailSaved = (foodSave: food.FoodSave ) => navigate('FoodDetailSaved', { foodSave });

export const goToDishDetail = (foodOfCategory: food.FoodOfCategory) => navigate('DishDetail', { foodOfCategory });

export const goToFoodSave = () => navigate('FoodSave');
