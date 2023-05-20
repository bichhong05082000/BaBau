import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImageChildComponent } from "./image-child/image-child.component";
import { FoodCategoryComponent } from "./food-category/food-category.component";
import { FoodComponent } from "./food/food.component";
import { StoriesComponent } from "./stories/stories.component";
import { FoodDetailComponent } from "./food-detail/food-detail.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { MusicComponent } from "./music/music.component";
import { VideoChildComponent } from "./video-child/video-child.component";
import { RootCategoryComponent } from "./root-category/root-category.component";

const routes: Routes = [
  {
    path: "",
    component: ContactsComponent,
  },
  {
    path: "image-child",
    component: ImageChildComponent,
  },
  {
    path: "food-category",
    component: FoodCategoryComponent,
  },
  {
    path: "food",
    component: FoodComponent,
  },
  {
    path: "root",
    component: RootCategoryComponent,
  },
  {
    path: "stories",
    component: StoriesComponent,
  },
  {
    path: "food-detail",
    component: FoodDetailComponent,
  },
  {
    path: "contacts",
    component: ContactsComponent,
  },
  {
    path: "music",
    component: MusicComponent,
  },
  {
    path: "video",
    component: VideoChildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PregnancyRoutingModule {}
