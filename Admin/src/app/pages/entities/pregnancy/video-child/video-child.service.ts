import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { createRequestOption } from "src/app/shared/request.util";

@Injectable({ providedIn: "root" })
export class VideoChildService {
  constructor(private http: HttpClient) {}

  getAllVideo(req?: Filter) {
    const options = createRequestOption(req);
    return this.http.get(GlobalComponent.API_URL_LOCAL + `videos`, {
      params: options,
    });
  }

  getVideoId(id: string) {
    return this.http.get(GlobalComponent.API_URL_LOCAL + `videos/${id}`);
  }

  addVideo(video?: { title: string; link: string }) {
    return this.http.post(GlobalComponent.API_URL_LOCAL + `videos`, video);
  }

  updateVideo(id?: string, data?: FormData) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `videos/${id}`,
      data
    );
  }

  deleteVideo(id?: string) {
    return this.http.delete(GlobalComponent.API_URL_LOCAL + `videos/${id}`);
  }
}
