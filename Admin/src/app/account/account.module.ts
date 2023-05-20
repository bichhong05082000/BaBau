import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbCarouselModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { defineElement } from "lord-icon-element";
import { AccountRoutingModule } from "./account-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import lottie from "lottie-web";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
    NgbCarouselModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
