import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { createRequestOption } from "src/app/shared/request.util";
import { ImageChild } from "./image-child.component";

@Injectable({ providedIn: "root" })
export class ImageChildService {
  constructor(private http: HttpClient) {}

  getAllImageChild(req?: Filter) {
    const options = createRequestOption(req);
    return this.http.get(GlobalComponent.API_URL_LOCAL + `image-children`, {
      params: options,
    });
  }

  getImageChildId(id: string) {
    return this.http.get(
      GlobalComponent.API_URL_LOCAL + `image-children/${id}`
    );
  }

  addImageChild(image?: FormData) {
    return this.http.post(
      GlobalComponent.API_URL_LOCAL + `image-children`,
      image
    );
  }

  deleteImageChild(id?: string) {
    return this.http.delete(
      GlobalComponent.API_URL_LOCAL + `image-children/${id}`
    );
  }

  updateImageChild(id?: string, image?: ImageChild) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `image-children/${id}`,
      image
    );
  }
}
