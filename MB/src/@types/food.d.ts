declare namespace food {
    type State = Readonly<Info>;

    interface FoodCategoryRoot {
        _id: string;
        name: string;
        image: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }

    interface FoodCategoryMonthly {
        description: string;
        month: string;
        status: string;
        _id: string;
    }

    interface FoodCategory {
        createdAt: string;
        idRoot: FoodCategoryRoot;
        image: string;
        monthlyData: FoodCategoryMonthly[];
        name: string;
        updatedAt: string;
        _id: string;
    }

    interface FoodOfCategory {
        _id: string;
        name: string;
        image: string;
        making: string;
        suitableFor: string;
        description: string;
        ingredient: string;
        video: string;
        timeCook: string;
        idCategory: string;
        createdAt: string;
        updatedAt: string;
        isSave: boolean;
    }

    interface FoodOfCategorySave {
        _id: string;
        name: string;
        image: string;
        making: string;
        suitableFor: string;
        description: string;
        ingredient: string;
        video: string;
        timeCook: string;
        idCategory: FoodCategory;
        createdAt: string;
        updatedAt: string;
    }

    interface FoodSave {
        _id: string;
        idUser: string;
        idFood: FoodOfCategorySave;
    }
}
