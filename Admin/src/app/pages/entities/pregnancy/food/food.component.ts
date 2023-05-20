import { DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { finalize } from "rxjs";

import { FoodCategoryService } from "../food-category/food-category.service";
import { FoodService } from "./food.service";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.scss"],
  providers: [DecimalPipe],
})
export class FoodComponent implements OnInit {
  foodForm!: FormGroup;
  formData: FormData = new FormData();
  private readonly MAX_FILE_SIZE = 5;
  foodData: any;
  foodCategory: any;
  initalValues: any;
  idCategory!: string;
  deleteId!: string;
  imageURL!: string;
  image!: string;
  submitted = false;
  fileCheck = false;

  constructor(
    public foodService: FoodService,
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    private foodCategoryService: FoodCategoryService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      ids: [""],
      name: ["", [Validators.required]],
      image: ["", [Validators.required]],
      making: ["", [Validators.required]],
      suitableFor: ["", [Validators.required]],
      description: ["", [Validators.required]],
      ingredient: ["", [Validators.required]],
      video: ["", [Validators.required]],
      timeCook: ["", [Validators.required]],
      categoryId: ["", [Validators.required]],
    });

    this.getAllFood();
    this.getAllFoodCategory();
  }

  getAllFood(): void {
    this.foodService.getAllFood().subscribe((data) => {
      this.foodData = Object.assign([], data);
      document.getElementById("elmLoader")?.classList.add("d-none");
      document.getElementById("job-overview")?.classList.remove("d-none");
    });
  }

  getAllFoodCategory(): void {
    this.foodCategoryService.getAllFoodCategory().subscribe((data) => {
      this.foodCategory = data;
    });
  }

  getFoodId(): void {
    document.getElementById("elmLoader")?.classList.remove("d-none");
    document.getElementById("job-overview")?.classList.add("d-none");

    if (!this.idCategory) {
      this.getAllFood();
      return;
    }

    this.foodService
      .getAllFoodOfCategory(this.idCategory)
      .pipe(
        finalize(() => {
          document.getElementById("elmLoader")?.classList.add("d-none");
          document.getElementById("job-overview")?.classList.remove("d-none");
        })
      )
      .subscribe({
        next: (data) => {
          this.foodData = data;
        },
      });
  }

  viewmore(id: any) {
    this.router.navigate(["/pregnancy/food-detail"], {
      queryParams: { id: id },
    });
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.foodForm.get("image")!.setValidators([Validators.required]);
    this.foodForm.get("image")!.updateValueAndValidity();
    this.foodForm.reset();
    this.modalService.open(content, { size: "lg", centered: true });
  }

  get form() {
    return this.foodForm.controls;
  }

  createFood() {
    this.submitted = true;

    if (!this.foodForm.valid) {
      return;
    }

    const formFields = [
      "name",
      "_id",
      "making",
      "suitableFor",
      "description",
      "ingredient",
      "timeCook",
      "video",
    ];

    if (this.foodForm.get("ids")?.value) {
      formFields.forEach((field) =>
        this.formData.append(field, this.foodForm.value[field])
      );

      if (!this.fileCheck) {
        this.formData.delete("image");
        this.formData.append("image", this.image);
        var jsonData = {} as any;
        this.formData.forEach((value, key) => (jsonData[key] = value));
      }
      this.foodService
        .updateFood(
          this.foodForm.get("ids")?.value,
          !this.fileCheck ? jsonData : this.formData
        )
        .subscribe({
          next: () => {
            this.toast.success("Update food successfully", {
              duration: 3000,
              position: "top-right",
            });
            this.modalService.dismissAll();
            this.getAllFood();
            this.foodForm.reset();
            this.formData = new FormData();
            this.fileCheck = false;
          },
          error: (error) => {
            formFields.forEach((field) => this.formData.delete(field));
            this.toast.error(error, {
              duration: 3000,
              position: "top-right",
            });
          },
        });
    } else {
      this.modalService.dismissAll();
      document.getElementById("elmLoader")?.classList.remove("d-none");
      document.getElementById("job-overview")?.classList.add("d-none");

      formFields.forEach((field) =>
        this.formData.append(field, this.foodForm.value[field])
      );

      this.foodService
        .addFood(this.formData, this.foodForm.value["categoryId"])
        .subscribe({
          next: () => {
            this.toast.success("Add food successfully", {
              duration: 3000,
              position: "top-right",
            });
            this.modalService.dismissAll();
            this.getAllFood();
            this.foodForm.reset();
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
            this.formData = new FormData();
            this.fileCheck = false;
          },
          error: (error) => {
            this.formData = new FormData();
            this.fileCheck = false;
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
            this.toast.error(error, {
              duration: 3000,
              position: "top-right",
            });
          },
        });
    }
  }

  editDataGet(content: any, item: any) {
    this.foodForm.get("image")!.clearValidators();
    this.foodForm.get("image")!.updateValueAndValidity();
    this.submitted = false;
    this.modalService.open(content, { size: "lg", centered: true });
    const modelTitle = document.querySelector(".modal-text") as HTMLAreaElement;
    modelTitle.innerHTML = "Edit Food";
    const updateBtn = document.getElementById("add-btn") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    const img_data = document.getElementById(
      "customer-img"
    ) as HTMLImageElement;
    img_data.src = item.image
      ? item.image
      : "assets/images/companies/img-3.png";

    this.foodForm.controls["name"].setValue(item.name);
    this.foodForm.controls["ids"].setValue(item._id);
    this.foodForm.controls["making"].setValue(item.making);
    this.foodForm.controls["suitableFor"].setValue(item.suitableFor);
    this.foodForm.controls["description"].setValue(item.description);
    this.foodForm.controls["ingredient"].setValue(item.ingredient);
    this.foodForm.controls["video"].setValue(item.video);
    this.foodForm.controls["timeCook"].setValue(item.timeCook);
    this.foodForm.controls["categoryId"].setValue(item.idCategory);
    this.image = item.image;
  }

  checkEnableSave(): boolean {
    return (
      JSON.stringify(this.foodForm.value) === JSON.stringify(this.initalValues)
    );
  }

  deleteData(id?: string) {
    if (!id) {
      return;
    }

    this.foodService.deleteFood(id).subscribe({
      next: () => {
        this.toast.success("Delete service successfully", {
          duration: 3000,
          position: "top-right",
        });
        this.getAllFood();
      },
      error: (error) => {
        this.toast.error(error, {
          duration: 3000,
          position: "top-right",
        });
      },
    });
  }

  confirm(content: any, id: string) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];

    if (file) {
      this.fileCheck = true;
    }

    const files: File[] = Array.from(event.target.files);
    this.formData = new FormData();

    let fileSize = 0;
    for (const file of files) {
      fileSize += file.size / 1024 / 1024;
      if (fileSize > this.MAX_FILE_SIZE) {
        return;
      }
      this.formData.append("image", file, file.name);
    }
    this.foodForm.patchValue({
      image_src: file.name,
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById("customer-img") as HTMLImageElement).src =
        this.imageURL;
    };

    reader.readAsDataURL(file);
  }
}
