import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { createRequestOption } from "src/app/shared/request.util";

@Injectable({ providedIn: "root" })
export class MusicService {
  constructor(private http: HttpClient) {}

  getAllMusic(req?: Filter) {
    const options = createRequestOption(req);
    return this.http.get(GlobalComponent.API_URL_LOCAL + `music`, {
      params: options,
    });
  }

  getMusicId(id: string) {
    return this.http.get(GlobalComponent.API_URL_LOCAL + `music/${id}`);
  }

  addMusic(music?: FormData) {
    return this.http.post(GlobalComponent.API_URL_LOCAL + `music`, music);
  }

  deleteMusic(id?: string) {
    return this.http.delete(GlobalComponent.API_URL_LOCAL + `music/${id}`);
  }
}
