import { Component, OnInit } from "@angular/core";
import { catchError, finalize, of, tap } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";

import { MusicService } from "./music.service";
import { Filter, GlobalComponent, ThreeMonth } from "src/app/app.constant";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"],
})
export class MusicComponent implements OnInit {
  formData: FormData = new FormData();
  selectThreeMonth = Object.values(ThreeMonth);
  private readonly MAX_FILE_SIZE = 5;
  pagesize = GlobalComponent.ITEMS_PER_PAGE;
  submitted = false;
  musicData: any;
  deleteId?: string;
  musicForm!: FormGroup;
  total = 0;
  page = 1;
  prevPage = 1;
  filesImage!: File[];
  filesLink!: File[];

  constructor(
    private musicService: MusicService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.musicForm = this.formBuilder.group({
      ids: [""],
      audio: ["", [Validators.required]],
      image: ["", [Validators.required]],
      name: ["", [Validators.required]],
      threeMonth: ["", [Validators.required]],
    });

    this.getAllMusic(this.page);
  }

  getAllMusic(page?: number): void {
    const pageToLoad: number = page || this.page || 1;
    const objQuery: Filter = {
      page: pageToLoad,
    };

    document.getElementById("elmLoader")?.classList.remove("d-none");
    this.musicService
      .getAllMusic(objQuery)
      .pipe(
        tap((data: any) => {
          this.musicData = data.musices;
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
    this.getAllMusic(currentPageNumber);
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

    this.musicService
      .deleteMusic(id)
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
          this.getAllMusic(this.page);
          this.toast.success("Delete Music successfully", {
            duration: 3000,
            position: "top-right",
          });
        },
      });
  }

  get form() {
    return this.musicForm.controls;
  }

  saveMusic() {
    if (this.musicForm.valid) {
      if (this.musicForm.get("ids")?.value) {
        return;
      }

      this.modalService.dismissAll();
      document.getElementById("elmLoader")?.classList.remove("d-none");
      document.getElementById("job-overview")?.classList.add("d-none");
      const fileData = [...this.filesLink, ...this.filesImage];

      for (const file of fileData) {
        this.formData.append("file", file, file.name);
      }

      this.formData.append("name", this.musicForm.get("name")?.value);
      this.formData.append(
        "threeMonth",
        this.musicForm.get("threeMonth")?.value
      );

      this.musicService.addMusic(this.formData).subscribe({
        next: () => {
          this.toast.success("Add Music successfully", {
            duration: 3000,
            position: "top-right",
          });
          this.modalService.dismissAll();
          this.getAllMusic(this.page);
          this.musicForm.reset();
          document.getElementById("elmLoader")?.classList.add("d-none");
          document.getElementById("job-overview")?.classList.remove("d-none");
          this.formData = new FormData();
        },
        error: (error) => {
          document.getElementById("elmLoader")?.classList.add("d-none");
          document.getElementById("job-overview")?.classList.remove("d-none");
          this.toast.error(error, {
            duration: 3000,
            position: "top-right",
          });
          this.formData = new FormData();
        },
      });
    }

    this.submitted = true;
  }

  /**
   * @param content
   */
  openModal(content: any) {
    this.submitted = false;
    this.musicForm.reset();
    this.modalService.open(content, { size: "md", centered: true });
  }

  fileChangeImage(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.filesImage = files;
    this.checkFileSize(files);
  }

  fileChangeLink(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.filesLink = files;
    this.checkFileSize(files);
  }

  checkFileSize(files: File[]): void {
    let fileSize = 0;
    for (const file of files) {
      fileSize += file.size / 1024 / 1024;
      if (fileSize > this.MAX_FILE_SIZE) {
        this.toast.warning("Add Music limit 5MB", {
          duration: 3000,
          position: "top-right",
        });

        return;
      }
    }
  }
}
