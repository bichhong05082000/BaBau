/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { createRequestOption } from "src/app/shared/request.util";

@Injectable({ providedIn: "root" })
export class StoriesService {
  constructor(private http: HttpClient) {}

  getAllStories(req?: Filter) {
    const options = createRequestOption(req);
    return this.http.get(GlobalComponent.API_URL_LOCAL + `stories`, {
      params: options,
    });
  }

  deleteStories(id?: string) {
    return this.http.delete(GlobalComponent.API_URL_LOCAL + `stories/${id}`);
  }

  updatesStories(id?: string, story?: FormData) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `stories/${id}`,
      story
    );
  }

  addStories(story?: FormData) {
    return this.http.post(GlobalComponent.API_URL_LOCAL + `stories`, story);
  }
}
