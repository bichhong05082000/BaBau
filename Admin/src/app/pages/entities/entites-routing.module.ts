import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pregnancy/pregnancy.module").then((m) => m.PregnancyModule),
  },
  {
    path: "pregnancy",
    loadChildren: () =>
      import("./pregnancy/pregnancy.module").then((m) => m.PregnancyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitesRoutingModule {}
