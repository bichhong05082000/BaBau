import { Component, OnInit } from "@angular/core";
import { catchError, finalize, of, tap } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";

import { ImageChildService } from "./image-child.service";
import { Filter, Gender, GlobalComponent } from "src/app/app.constant";

export interface ImageChild {
  _id: string;
  gender: string;
  image: string;
}

@Component({
  selector: "app-image-child",
  templateUrl: "./image-child.component.html",
  styleUrls: ["./image-child.component.scss"],
})
export class ImageChildComponent implements OnInit {
  selectGender = Object.values(Gender);
  formData: FormData = new FormData();
  imageChildData: ImageChild[] = [];
  imageChildForm!: FormGroup;
  readonly MAX_FILE_SIZE = 5;
  pagesize = GlobalComponent.ITEMS_PER_PAGE;
  submitted = false;
  deleteId!: string;
  imageURL!: string;
  image!: string;
  fileCheck = false;
  total = 0;
  page = 1;
  prevPage = 1;

  constructor(
    private serviceImageChild: ImageChildService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.imageChildForm = this.formBuilder.group({
      ids: [""],
      gender: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });

    this.getAllImageChild(this.page);
  }

  getAllImageChild(page?: number): void {
    const pageToLoad: number = page || this.page || 1;
    const objQuery: Filter = {
      page: pageToLoad,
    };

    document.getElementById("elmLoader")?.classList.remove("d-none");
    this.serviceImageChild
      .getAllImageChild(objQuery)
      .pipe(
        tap((data: any) => {
          this.imageChildData = data.images;
          this.page = page!;
          this.total = data.count;
        }),
        catchError(() => {
          return of();
        }),
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
    if (!id) {
      return;
    }

    const toastRef = this.toast.loading("Loading...", {
      duration: 5000,
      position: "top-right",
    });

    this.serviceImageChild
      .deleteImageChild(id)
      .pipe(
        catchError((error) => {
          this.toast.error(error, {
            duration: 3000,
            position: "top-right",
          });

          return of(undefined);
        }),
        finalize(() => toastRef.close())
      )
      .subscribe({
        next: () => {
          this.getAllImageChild(this.page);
          this.toast.success("Image deleted successfully", {
            duration: 3000,
            position: "top-right",
          });
        },
      });
  }

  get form() {
    return this.imageChildForm.controls;
  }

  loadPageClick(): void {
    const paginationElement = document.querySelector("ngb-pagination");
    const currentPageElement = paginationElement!.querySelector(
      ".page-item.active .page-link"
    );
    const currentPageNumber = parseInt(currentPageElement?.textContent!, 10);

    if (currentPageNumber === this.prevPage) {
      return;
    }

    this.prevPage = Number(currentPageNumber);
    this.getAllImageChild(currentPageNumber);
  }

  saveImageChild() {
    if (!this.imageChildForm.valid) {
      return;
    }

    if (this.imageChildForm.get("ids")?.value) {
      this.formData.append("gender", this.imageChildForm.value["gender"]);
      this.formData.append("_id", this.imageChildForm.value["ids"]);
      if (!this.fileCheck) {
        this.formData.delete("image");
        this.formData.append("image", this.image);
        var jsonData = {} as any;
        this.formData.forEach((value, key) => (jsonData[key] = value));
      }

      this.serviceImageChild
        .updateImageChild(
          this.imageChildForm.get("ids")?.value,
          !this.fileCheck ? jsonData : this.formData
        )
        .subscribe({
          next: () => {
            this.toast.success("Update Image successfully", {
              duration: 3000,
              position: "top-right",
            });

            this.modalService.dismissAll();
            this.getAllImageChild(this.page);
            this.formData = new FormData();
            this.fileCheck = false;
          },
          error: (error) => {
            this.formData.delete("gender");
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
      this.formData.append("gender", this.imageChildForm.value["gender"]);

      this.serviceImageChild
        .addImageChild(this.formData)
        .pipe(
          finalize(() => {
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
          })
        )
        .subscribe({
          next: () => {
            this.toast.success("Add Image successfully", {
              duration: 3000,
              position: "top-right",
            });

            this.modalService.dismissAll();
            this.getAllImageChild(this.page);
            this.imageChildForm.reset();
            this.formData = new FormData();
            this.fileCheck = false;
          },
          error: (error) => {
            this.formData = new FormData();
            this.fileCheck = false;

            this.toast.error(error, {
              duration: 3000,
              position: "top-right",
            });
          },
        });
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
    this.imageChildForm.patchValue({
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

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.imageChildForm.get("image")!.setValidators([Validators.required]);
    this.imageChildForm.get("image")!.updateValueAndValidity();
    this.imageChildForm.reset();
    this.modalService.open(content, { size: "lg", centered: true });
  }
}
