import { Injectable } from "@angular/core";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { HttpClient } from "@angular/common/http";
import { createRequestOption } from "src/app/shared/request.util";
import { ContactsModel } from "./contacts.model";

@Injectable({ providedIn: "root" })
export class ContactsService {
  constructor(private http: HttpClient) {}

  getAllUser(req?: Filter) {
    const options = createRequestOption(req);
    return this.http.get(GlobalComponent.API_URL_LOCAL + `accounts`, {
      params: options,
    });
  }

  updateUser(id?: string, user?: ContactsModel) {
    return this.http.patch(
      GlobalComponent.API_URL_LOCAL + `accounts/${id}`,
      user
    );
  }

  deleteUser(id?: string) {
    return this.http.delete(GlobalComponent.API_URL_LOCAL + `accounts/${id}`);
  }
}
