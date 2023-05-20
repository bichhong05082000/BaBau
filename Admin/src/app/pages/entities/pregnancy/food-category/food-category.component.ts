import { Component, OnInit } from "@angular/core";
import { finalize, tap } from "rxjs";
import { DecimalPipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";

import { RootCategoryService } from "../root-category/root-category.service";
import { FoodCategoryService } from "./food-category.service";
import { RootCategoryModel } from "../root-category/root-category.model";

@Component({
  selector: "app-food-category",
  templateUrl: "./food-category.component.html",
  styleUrls: ["./food-category.component.scss"],
  providers: [FoodCategoryService, DecimalPipe],
})
export class FoodCategoryComponent implements OnInit {
  selectValues = ["OK", "WARNING", "ERROR"];
  foodCategoryForm!: FormGroup;
  formData: FormData = new FormData();
  private readonly MAX_FILE_SIZE = 5;
  imageURL!: string;
  image!: string;
  deleteId!: string;
  foodCategoryData: any;
  rootCategoryData: RootCategoryModel[] = [];
  idRootCategory!: string;
  submitted = false;
  checkFile = false;

  constructor(
    private foodCategoryService: FoodCategoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private rootCategoryService: RootCategoryService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.foodCategoryForm = this.formBuilder.group({
      ids: [""],
      name: ["", [Validators.required]],
      image: ["", [Validators.required]],
      description: ["", [Validators.required]],
      idRoot: ["", [Validators.required]],
      monthlyData: this.formBuilder.array([]),
    });

    this.getAllFoodCategory();
    this.getAllRootCategory();
  }

  get monthlyData(): FormArray {
    return this.foodCategoryForm.get("monthlyData") as FormArray;
  }

  addItem(): void {
    const lengthMonthly = this.monthlyData.length;
    const item = this.formBuilder.group({
      month: this.checkMonthly(lengthMonthly),
      description: ["", Validators.required],
      status: ["OK", Validators.required],
    });

    this.monthlyData.push(item);
  }

  removeItem(index: number): void {
    this.monthlyData.removeAt(index);
  }

  getFoodCategoryId(): void {
    document.getElementById("elmLoader")?.classList.remove("d-none");
    document.getElementById("job-overview")?.classList.add("d-none");

    if (!this.idRootCategory) {
      this.getAllFoodCategory();
      return;
    }

    this.foodCategoryService
      .getFoodCategoryId(this.idRootCategory)
      .pipe(
        finalize(() => {
          document.getElementById("elmLoader")?.classList.add("d-none");
          document.getElementById("job-overview")?.classList.remove("d-none");
        })
      )
      .subscribe({
        next: (data) => {
          this.foodCategoryData = data;
        },
      });
  }

  getAllRootCategory(): void {
    this.rootCategoryService.getAllRootCategory().subscribe((data: any) => {
      this.rootCategoryData = data;
    });
  }

  getAllFoodCategory(): void {
    this.foodCategoryService
      .getAllFoodCategory()
      .pipe(
        tap((data) => (this.foodCategoryData = data)),
        finalize(() => {
          document.getElementById("elmLoader")?.classList.add("d-none");
          document.getElementById("job-overview")?.classList.remove("d-none");
        })
      )
      .subscribe();
  }

  confirm(content: any, id: string) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteData(id?: string) {
    if (id) {
      this.foodCategoryService.deleteFoodCategory(id).subscribe({
        next: () => {
          this.toast.success("Delete FoodCategory successfully", {
            duration: 3000,
            position: "top-right",
          });

          this.getAllFoodCategory();
        },
        error: (error) => {
          this.toast.error(error, {
            duration: 3000,
            position: "top-right",
          });
        },
      });
    }
  }

  get form() {
    return this.foodCategoryForm.controls;
  }

  checkMonthly(i: number): string {
    if (i === 0) return "FIRST";
    if (i === 1) return "MIDDLE";
    return "LAST";
  }

  saveFoodCategory() {
    this.submitted = true;

    if (this.foodCategoryForm.valid) {
      if (this.foodCategoryForm.get("ids")?.value) {
        for (const [key, value] of Object.entries(
          this.foodCategoryForm.value
        )) {
          if (key === "monthlyData") {
            this.formData.append(key, JSON.stringify(value));
          } else {
            this.formData.append(key, value as any);
          }
        }

        if (!this.checkFile) {
          this.formData.delete("image");
        }

        this.foodCategoryService
          .updateFoodCategory(
            this.foodCategoryForm.get("ids")?.value,
            this.formData
          )
          .subscribe({
            next: () => {
              this.toast.success("Update FoodCategory successfully", {
                duration: 3000,
                position: "top-right",
              });

              this.modalService.dismissAll();
              this.getAllFoodCategory();
              this.formData = new FormData();
            },
            error: (error) => {
              this.formData.delete("name");
              this.formData.delete("_id");
              this.toast.success(error, {
                duration: 3000,
                position: "top-right",
              });
            },
          });
      } else {
        this.modalService.dismissAll();
        document.getElementById("elmLoader")?.classList.remove("d-none");
        document.getElementById("job-overview")?.classList.add("d-none");

        for (const [key, value] of Object.entries(
          this.foodCategoryForm.value
        )) {
          if (key === "monthlyData") {
            this.formData.append(key, JSON.stringify(value));
          } else {
            this.formData.append(key, value as any);
          }
        }

        this.foodCategoryService.addFoodCategory(this.formData).subscribe({
          next: () => {
            this.toast.success("Add FoodCategory successfully", {
              duration: 3000,
              position: "top-right",
            });

            this.modalService.dismissAll();
            this.getAllFoodCategory();
            this.foodCategoryForm.reset();
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
            this.formData = new FormData();
          },
          error: (error) => {
            this.formData = new FormData();
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
            this.toast.success(error, {
              duration: 3000,
              position: "top-right",
            });
          },
        });
      }
    }
  }

  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];

    const files: File[] = Array.from(event.target.files);
    this.formData = new FormData();

    if (file) {
      this.checkFile = true;
    }

    let fileSize = 0;
    for (const file of files) {
      fileSize += file.size / 1024 / 1024;
      if (fileSize > this.MAX_FILE_SIZE) {
        return;
      }
      this.formData.append("image", file, file.name);
    }
    document.getElementById("");
    this.foodCategoryForm.patchValue({
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

  editDataGet(content: any, item: any) {
    this.foodCategoryForm.get("image")!.clearValidators();
    this.foodCategoryForm.get("image")!.updateValueAndValidity();
    this.submitted = false;
    this.checkFile = false;
    this.modalService.open(content, { size: "lg", centered: true });

    const modelTitle = document.querySelector(
      ".modal-title"
    ) as HTMLAreaElement;
    modelTitle.innerHTML = "Edit FoodCategory";

    const updateBtn = document.getElementById("add-btn") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    const img_data = document.getElementById(
      "customer-img"
    ) as HTMLImageElement;
    img_data.src = item.image
      ? item.image
      : "assets/images/companies/img-3.png";

    this.foodCategoryForm.controls["name"].setValue(item.name);
    this.foodCategoryForm.controls["ids"].setValue(item._id);
    this.foodCategoryForm.controls["description"].setValue(item.description);
    this.foodCategoryForm.controls["idRoot"].setValue(item.idRoot._id);
    this.image = item.image;

    item.monthlyData.forEach((data: any) => {
      this.monthlyData.push(
        this.formBuilder.group({
          month: [data.month],
          description: [data.description, Validators.required],
          status: [data.status, Validators.required],
        })
      );
    });
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.foodCategoryForm.get("image")!.setValidators([Validators.required]);
    this.foodCategoryForm.get("image")!.updateValueAndValidity();
    this.foodCategoryForm.reset();
    this.modalService.open(content, { size: "lg", centered: true });
  }
}
