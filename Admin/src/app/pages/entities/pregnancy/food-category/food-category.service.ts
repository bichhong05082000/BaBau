import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalComponent } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class FoodCategoryService {
  constructor(private http: HttpClient) {}

  getAllFoodCategory() {
    return this.http.get(GlobalComponent.API_URL_LOCAL + `food-categories`);
  }

  getFoodCategoryId(id: string) {
    return this.http.get(
      GlobalComponent.API_URL_LOCAL + `food-categories/root/${id}`
    );
  }

  addFoodCategory(food?: FormData) {
    return this.http.post(
      GlobalComponent.API_URL_LOCAL + `food-categories`,
      food
    );
  }

  updateFoodCategory(id?: string, food?: FormData) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `food-categories/${id}`,
      food
    );
  }

  deleteFoodCategory(id?: string) {
    return this.http.delete(
      GlobalComponent.API_URL_LOCAL + `food-categories/${id}`
    );
  }
}
