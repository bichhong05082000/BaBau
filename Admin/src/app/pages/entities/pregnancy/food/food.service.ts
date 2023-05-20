import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalComponent } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFood() {
    return this.http.get(GlobalComponent.API_URL_LOCAL + `foods`);
  }

  getFoodId(id: string) {
    return this.http.get(GlobalComponent.API_URL_LOCAL + `foods/${id}`);
  }

  getAllFoodOfCategory(id: string) {
    return this.http.get(
      GlobalComponent.API_URL_LOCAL + `foods/category/${id}`
    );
  }

  addFood(food?: FormData, id?: string) {
    return this.http.post(
      GlobalComponent.API_URL_LOCAL + `foods/category/${id}`,
      food
    );
  }

  updateFood(id?: string, food?: FormData) {
    return this.http.patch(GlobalComponent.API_URL_LOCAL + `foods/${id}`, food);
  }

  deleteFood(id?: string) {
    return this.http.delete(GlobalComponent.API_URL_LOCAL + `foods/${id}`);
  }
}
