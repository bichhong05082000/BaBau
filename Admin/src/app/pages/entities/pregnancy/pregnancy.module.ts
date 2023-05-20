import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbDropdownModule,
  NgbTooltipModule,
  NgbPaginationModule,
  NgbNavModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PregnancyRoutingModule } from "./pregnancy-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ImageChildComponent } from "./image-child/image-child.component";
import { FoodCategoryComponent } from "./food-category/food-category.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgSelectModule } from "@ng-select/ng-select";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { FoodComponent } from "./food/food.component";
import { StoriesComponent } from "./stories/stories.component";
import { FoodDetailComponent } from "./food-detail/food-detail.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { MusicComponent } from "./music/music.component";
import { VideoChildComponent } from "./video-child/video-child.component";
import { RootCategoryComponent } from "./root-category/root-category.component";

@NgModule({
  declarations: [
    ImageChildComponent,
    FoodCategoryComponent,
    FoodComponent,
    StoriesComponent,
    FoodDetailComponent,
    ContactsComponent,
    MusicComponent,
    VideoChildComponent,
    RootCategoryComponent,
  ],
  imports: [
    CommonModule,
    PregnancyRoutingModule,
    SharedModule,
    NgApexchartsModule,
    FeatherModule.pick(allIcons),
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbNavModule,
    FlatpickrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PregnancyModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
