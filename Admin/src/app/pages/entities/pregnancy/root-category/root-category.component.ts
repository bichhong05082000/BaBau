import { Component, OnInit } from "@angular/core";
import { RootCategoryService } from "./root-category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormBuilder, FormGroup, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { finalize } from "rxjs";
import { RootCategoryModel } from "./root-category.model";

@Component({
  selector: "app-root-category",
  templateUrl: "./root-category.component.html",
  styleUrls: ["./root-category.component.scss"],
})
export class RootCategoryComponent implements OnInit {
  rootCategoryForm!: FormGroup;
  formData: FormData = new FormData();
  readonly MAX_FILE_SIZE = 5;
  rootCategoryData: RootCategoryModel[] = [];
  deleteId?: string;
  imageURL!: string;
  image!: string;
  submitted = false;
  fileCheck = false;

  constructor(
    public rootCategoryService: RootCategoryService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.rootCategoryForm = this.formBuilder.group({
      ids: [""],
      name: ["", [Validators.required]],
      image: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.getAllRootCategory();
  }

  getAllRootCategory(): void {
    this.rootCategoryService.getAllRootCategory().subscribe((data: any) => {
      this.rootCategoryData = data;
      document.getElementById("elmLoader")?.classList.add("d-none");
      document.getElementById("job-overview")?.classList.remove("d-none");
    });
  }

  confirm(content: any, id: string) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteData(id?: string) {
    if (id) {
      const toastRef = this.toast.loading("Loading...", {
        duration: 5000,
        position: "top-right",
      });

      this.rootCategoryService
        .deleteRootCategory(id)
        .pipe(finalize(() => toastRef.close()))
        .subscribe({
          next: () => {
            this.toast.success("Delete RootCategory successfully", {
              duration: 3000,
              position: "top-right",
            });

            this.getAllRootCategory();
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
    return this.rootCategoryForm.controls;
  }

  saveRootCategory() {
    if (this.rootCategoryForm.valid) {
      const toastRef = this.toast.loading("Loading...", {
        duration: 5000,
        position: "top-right",
      });

      if (this.rootCategoryForm.get("ids")?.value) {
        this.formData.append("name", this.rootCategoryForm.value["name"]);
        this.formData.append(
          "description",
          this.rootCategoryForm.value["description"]
        );

        this.formData.append("_id", this.rootCategoryForm.value["ids"]);

        if (!this.fileCheck) {
          this.formData.delete("image");
          this.formData.append("image", this.image);
          var jsonData = {} as any;
          this.formData.forEach((value, key) => (jsonData[key] = value));
        }

        this.rootCategoryService
          .updateRootCategory(
            this.rootCategoryForm.get("ids")?.value,
            !this.fileCheck ? jsonData : this.formData
          )
          .pipe(finalize(() => toastRef.close()))
          .subscribe({
            next: () => {
              this.toast.success("Update FoodCategory successfully", {
                duration: 3000,
                position: "top-right",
              });

              this.modalService.dismissAll();
              this.getAllRootCategory();
              this.formData = new FormData();
              this.fileCheck = false;
            },
            error: (error) => {
              this.formData.delete("name");
              this.formData.delete("_id");
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
        this.formData.append("name", this.rootCategoryForm.value["name"]);
        this.formData.append(
          "description",
          this.rootCategoryForm.value["description"]
        );

        this.rootCategoryService
          .addRootCategory(this.formData)
          .pipe(finalize(() => toastRef.close()))
          .subscribe({
            next: () => {
              this.toast.success("Add FoodCategory successfully", {
                duration: 3000,
                position: "top-right",
              });

              this.modalService.dismissAll();
              this.getAllRootCategory();
              this.rootCategoryForm.reset();
              document.getElementById("elmLoader")?.classList.add("d-none");
              document
                .getElementById("job-overview")
                ?.classList.remove("d-none");
              this.formData = new FormData();
              this.fileCheck = false;
            },
            error: (error) => {
              this.formData = new FormData();
              this.fileCheck = false;
              document.getElementById("elmLoader")?.classList.add("d-none");
              document
                .getElementById("job-overview")
                ?.classList.remove("d-none");
              this.toast.error(error, {
                duration: 3000,
                position: "top-right",
              });
            },
          });
      }
    }

    this.submitted = true;
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
    document.getElementById("");
    this.rootCategoryForm.patchValue({
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
    this.rootCategoryForm.get("image")!.clearValidators();
    this.rootCategoryForm.get("image")!.updateValueAndValidity();
    this.submitted = false;
    this.modalService.open(content, { size: "lg", centered: true });

    const modelTitle = document.querySelector(
      ".modal-title"
    ) as HTMLAreaElement;
    modelTitle.innerHTML = "Edit RootCategory";

    const updateBtn = document.getElementById("add-btn") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    const img_data = document.getElementById(
      "customer-img"
    ) as HTMLImageElement;
    img_data.src = item.image
      ? item.image
      : "assets/images/companies/img-3.png";

    this.rootCategoryForm.controls["name"].setValue(item.name);
    this.rootCategoryForm.controls["ids"].setValue(item._id);
    this.rootCategoryForm.controls["description"].setValue(item.description);
    this.image = item.image;
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.rootCategoryForm.get("image")!.setValidators([Validators.required]);
    this.rootCategoryForm.get("image")!.updateValueAndValidity();
    this.rootCategoryForm.reset();
    this.modalService.open(content, { size: "lg", centered: true });
  }
}
