import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/auth.models";
import { GlobalComponent } from "src/app/app.constant";

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(GlobalComponent.API_URL_LOCAL + `accounts/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          if (user && user.jwt) {
            localStorage.setItem("toast", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null!);
  }

  register(user: User) {
    return this.http.post(
      GlobalComponent.API_URL_LOCAL + `users/register`,
      user
    );
  }
}
