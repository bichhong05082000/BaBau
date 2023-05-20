import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./entities/entites.module").then((m) => m.EntitesModule),
  },
  {
    path: "ui",
    loadChildren: () =>
      import("./share-ui/ui/ui.module").then((m) => m.UiModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./share-ui/icons/icons.module").then((m) => m.IconsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
