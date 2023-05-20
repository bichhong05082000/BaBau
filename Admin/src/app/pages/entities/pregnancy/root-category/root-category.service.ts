import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalComponent } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class RootCategoryService {
  constructor(private http: HttpClient) {}

  getAllRootCategory() {
    return this.http.get(
      GlobalComponent.API_URL_LOCAL + `food-categories-root`
    );
  }

  addRootCategory(root?: FormData) {
    return this.http.post(
      GlobalComponent.API_URL_LOCAL + `food-categories-root`,
      root
    );
  }

  updateRootCategory(id?: string, root?: FormData) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `food-categories-root/${id}`,
      root
    );
  }

  getRootCategoryId(id: string) {
    return this.http.get(
      GlobalComponent.API_URL_LOCAL + `food-categories-root/${id}`
    );
  }

  deleteRootCategory(id?: string) {
    return this.http.delete(
      GlobalComponent.API_URL_LOCAL + `food-categories-root/${id}`
    );
  }
}
