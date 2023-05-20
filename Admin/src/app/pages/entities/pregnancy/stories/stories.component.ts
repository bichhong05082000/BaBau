import { DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { catchError, finalize, of, tap } from "rxjs";

import { StoriesService } from "./stories.service";
import { Filter, GlobalComponent } from "src/app/app.constant";
import { StoriesModel } from "./stories.model";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.scss"],
  providers: [DecimalPipe],
})
export class StoriesComponent implements OnInit {
  pagesize = GlobalComponent.ITEMS_PER_PAGE;
  readonly MAX_FILE_SIZE = 5;
  formData: FormData = new FormData();
  storiesData: StoriesModel[] = [];
  showMoreList: boolean[] = [];
  storyForm!: FormGroup;
  storyDetail!: StoriesModel;
  total = 0;
  page = 1;
  prevPage = 1;
  deleteId?: string;
  imageURL!: string;
  image!: string;
  fileCheck = false;
  submitted = false;
  showMore = true;

  constructor(
    public service: StoriesService,
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.storyForm = this.formBuilder.group({
      ids: [""],
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });

    this.getAllStories(this.page);
  }

  toggleShowMore(index: number) {
    this.showMoreList[index] = !this.showMoreList[index];
  }

  getAllStories(page?: number): void {
    const pageToLoad: number = page || this.page || 1;
    const objQuery: Filter = {
      page: pageToLoad,
    };

    document.getElementById("elmLoader")?.classList.remove("d-none");
    this.service
      .getAllStories(objQuery)
      .pipe(
        tap((data: any) => {
          this.storiesData = Object.assign([], data.stories);
          this.storyDetail = this.storiesData[0];
          this.page = page!;
          this.total = data.count;
          this.showMoreList = new Array(this.storiesData.length).fill(false);
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
    this.getAllStories(currentPageNumber);
  }

  viewmore(id: number) {
    this.storyDetail = this.storiesData[id];
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.storyForm.get("image")!.setValidators([Validators.required]);
    this.storyForm.get("image")!.updateValueAndValidity();
    this.storyForm.reset();
    this.modalService.open(content, { size: "lg", centered: true });
  }

  get form() {
    return this.storyForm.controls;
  }

  createStory() {
    if (this.storyForm.invalid) {
      this.submitted = true;
      return;
    }

    const toastRef = this.toast.loading("Loading...", {
      duration: 5000,
      position: "top-right",
    });

    const formData = new FormData();
    formData.append("title", this.storyForm.value["title"]);
    formData.append("content", this.storyForm.value["content"]);

    let apiCall$;

    if (this.storyForm.get("ids")?.value) {
      formData.append("_id", this.storyForm.value["ids"]);

      if (!this.fileCheck) {
        formData.delete("image");
        formData.append("image", this.image);
      }

      const jsonData = {} as any;
      formData.forEach((value, key) => (jsonData[key] = value));

      apiCall$ = this.service.updatesStories(
        this.storyForm.get("ids")?.value,
        !this.fileCheck ? jsonData : formData
      );
    } else {
      formData.delete("ids");

      apiCall$ = this.service.addStories(formData);
    }

    apiCall$.pipe(finalize(() => toastRef.close())).subscribe(
      () => {
        this.toast.success(
          this.storyForm.get("ids")?.value
            ? "Update story successfully"
            : "Add story successfully",
          {
            duration: 3000,
            position: "top-right",
          }
        );

        this.modalService.dismissAll();
        this.getAllStories();
        this.storyForm.reset();
        this.formData = new FormData();
        this.fileCheck = false;
      },
      (error) => {
        this.formData = new FormData();
        this.fileCheck = false;
        this.toast.error(error, {
          duration: 3000,
          position: "top-right",
        });
      }
    );
  }

  editDataGet(content: any, item: any) {
    this.storyForm.get("image")!.clearValidators();
    this.storyForm.get("image")!.updateValueAndValidity();
    this.submitted = false;
    this.modalService.open(content, { size: "lg", centered: true });
    const modelTitle = document.querySelector(".modal-text") as HTMLAreaElement;
    modelTitle.innerHTML = "Edit Story";
    const updateBtn = document.getElementById("add-btn") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    const img_data = document.getElementById(
      "customer-img"
    ) as HTMLImageElement;
    img_data.src = item.image
      ? item.image
      : "assets/images/companies/img-3.png";

    this.storyForm.controls["title"].setValue(item.title);
    this.storyForm.controls["ids"].setValue(item._id);
    this.storyForm.controls["content"].setValue(item.content);
    this.image = item.image;
  }

  deleteData(id?: string) {
    if (!id) {
      return;
    }

    const toastRef = this.toast.loading("Loading...", {
      duration: 5000,
      position: "top-right",
    });

    this.service
      .deleteStories(id)
      .pipe(finalize(() => toastRef.close()))
      .subscribe({
        next: () => {
          this.toast.success("Delete story successfully", {
            duration: 3000,
            position: "top-right",
          });
          this.getAllStories(this.page);
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
    this.storyForm.patchValue({
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
