import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbNavModule,
  NgbAccordionModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { SafePipe } from "./safe.pipe";

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule, NgbNavModule, NgbAccordionModule, NgbDropdownModule],
  exports: [SafePipe],
})
export class SharedModule {}
