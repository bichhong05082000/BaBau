import { Component, OnInit } from "@angular/core";
import { EMPTY, catchError, finalize, of, tap } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";

import { VideoChildService } from "./video-child.service";
import { Filter, GlobalComponent } from "src/app/app.constant";

@Component({
  selector: "app-video-child",
  templateUrl: "./video-child.component.html",
  styleUrls: ["./video-child.component.scss"],
})
export class VideoChildComponent implements OnInit {
  videoChildData: { _id: string; title: string; link: string }[] = [];
  videoChildForm!: FormGroup;
  pagesize = GlobalComponent.ITEMS_PER_PAGE;
  total = 0;
  page = 1;
  prevPage = 1;
  deleteId!: string;
  submitted = false;

  constructor(
    private videoChildService: VideoChildService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.videoChildForm = this.formBuilder.group({
      ids: [""],
      link: ["", [Validators.required]],
      title: ["", [Validators.required]],
    });

    this.getAllVideoChild(this.page);
  }

  getAllVideoChild(page?: number): void {
    const pageToLoad: number = page || this.page || 1;
    const objQuery: Filter = {
      page: pageToLoad,
    };

    document.getElementById("elmLoader")?.classList.remove("d-none");
    this.videoChildService
      .getAllVideo(objQuery)
      .pipe(
        tap((data: any) => {
          this.videoChildData = data.videos;
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
    this.getAllVideoChild(currentPageNumber);
  }

  confirm(content: any, id: string) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteData(id?: string) {
    if (!id) {
      return;
    }

    this.videoChildService.deleteVideo(id).subscribe({
      next: () => {
        this.toast.success("Delete VideoChild successfully", {
          duration: 3000,
          position: "top-right",
        });
        this.getAllVideoChild(this.page);
      },
      error: (error) => {
        this.toast.error(error, {
          duration: 3000,
          position: "top-right",
        });
      },
    });
  }

  get form() {
    return this.videoChildForm.controls;
  }

  saveVideoChild() {
    if (this.videoChildForm.valid) {
      const toastRef = this.toast.loading("Loading...", {
        duration: 5000,
        position: "top-right",
      });

      const video$ = this.videoChildForm.get("ids")?.value
        ? this.videoChildService.updateVideo(
            this.videoChildForm.get("ids")?.value,
            this.videoChildForm.value
          )
        : this.videoChildService.addVideo(this.videoChildForm.value);

      video$
        .pipe(
          tap(() => {
            const message = this.videoChildForm.get("ids")?.value
              ? "Update video successfully"
              : "Add video successfully";
            this.toast.success(message, {
              duration: 3000,
              position: "top-right",
            });
            this.modalService.dismissAll();
            this.getAllVideoChild(this.page);
            this.videoChildForm.reset();
            document.getElementById("elmLoader")?.classList.add("d-none");
            document.getElementById("job-overview")?.classList.remove("d-none");
          }),
          catchError((error) => {
            this.toast.error(error, {
              duration: 3000,
              position: "top-right",
            });

            return EMPTY;
          }),
          finalize(() => toastRef.close())
        )
        .subscribe();
    }

    this.submitted = true;
  }

  editDataGet(content: any, item: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    const modelTitle = document.querySelector(
      ".modal-title"
    ) as HTMLAreaElement;
    modelTitle.innerHTML = "Edit VideoChild";

    const updateBtn = document.getElementById("add-btn") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.videoChildForm.controls["title"].setValue(item.title);
    this.videoChildForm.controls["link"].setValue(item.link);
    this.videoChildForm.controls["ids"].setValue(item._id);
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.videoChildForm.reset();
    this.modalService.open(content, { size: "md", centered: true });
  }
}
