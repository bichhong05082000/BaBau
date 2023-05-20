import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  NgbTooltipModule,
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbAccordionModule,
  NgbProgressbarModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FullCalendarModule } from "@fullcalendar/angular";
import { FlatpickrModule } from "angularx-flatpickr";
import { SimplebarAngularModule } from "simplebar-angular";
import { PregnancyModule } from "./pregnancy/pregnancy.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatTableModule } from "@angular/material/table";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgSelectModule } from "@ng-select/ng-select";
import { EntitesRoutingModule } from "./entites-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    Ng2SearchPipeModule,
    FeatherModule.pick(allIcons),
    FullCalendarModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    EntitesRoutingModule,
    SharedModule,
    PickerModule,
    DragDropModule,
    MatTableModule,
    FlexLayoutModule,
    NgSelectModule,
    NgbTypeaheadModule,
    PregnancyModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EntitesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
