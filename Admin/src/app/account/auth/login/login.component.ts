import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("currentUser")) {
      this.router.navigate(["/"]);
    }

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.f["email"].value, this.f["password"].value)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          localStorage.setItem("currentUser", JSON.stringify(data));
          localStorage.setItem("token", data.jwt);
          this.router.navigate(["/pregnancy/contacts"]);
          this.setTimeLoading();
          this.toast.success("Login successfully", {
            duration: 3000,
            position: "top-right",
          });
        },
        error: (error) => {
          this.setTimeLoading();
          this.toast.error(error, {
            duration: 3000,
            position: "top-right",
          });
        },
      });
  }

  setTimeLoading(): void {
    setTimeout(() => {
      this.submitted = false;
    }, 500);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
