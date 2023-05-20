import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";

import { Error404RoutingModule } from "./errors-routing.module";
import { BasicComponent } from "./basic/basic.component";
import { OfflineComponent } from "./offline/offline.component";

@NgModule({
  declarations: [BasicComponent, OfflineComponent],
  imports: [CommonModule, Error404RoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
