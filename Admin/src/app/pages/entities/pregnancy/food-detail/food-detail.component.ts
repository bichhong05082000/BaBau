import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FoodService } from "../food/food.service";

@Component({
  selector: "app-food-detail",
  templateUrl: "./food-detail.component.html",
  styleUrls: ["./food-detail.component.scss"],
})
export class FoodDetailComponent implements OnInit {
  food: any;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.foodService.getFoodId(params.id).subscribe((food) => {
        this.food = food;
      });
    });
  }
}
