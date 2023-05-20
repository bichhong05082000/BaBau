import { Component, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Subject, of, tap } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContactsService } from "./contacts.service";
import { catchError, debounceTime, finalize, takeUntil } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";

import { ContactsModel } from "./contacts.model";
import {
  ColorClass,
  Filter,
  Gender,
  GlobalComponent,
  RoleBabau,
  UserStatus,
} from "src/app/app.constant";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
  providers: [ContactsService, DecimalPipe],
})
export class ContactsComponent implements OnInit {
  pagesize = GlobalComponent.ITEMS_PER_PAGE;
  selectGender = Object.values(Gender);
  selectRole = Object.values(RoleBabau);
  userDetailFirst?: ContactsModel;
  users: ContactsModel[] = [];
  deleteId?: string;
  total = 0;
  page = 1;
  searchForm!: FormGroup;
  prevPage = 1;
  private destroySubject = new Subject();

  constructor(
    private modalService: NgbModal,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [""],
    });

    this.getAllUser(this.page);
    this.onSearch();
  }

  getAllUser(
    page?: number,
    search?: string,
    start?: string,
    end?: string
  ): void {
    const pageToLoad: number = page || this.page || 1;
    const objQuery: Filter = {
      page: pageToLoad,
    };

    search ? (objQuery["search"] = search) : "";
    start ? (objQuery["start"] = start) : "";
    end ? (objQuery["end"] = end) : "";
    document.getElementById("elmLoader")?.classList.remove("d-none");

    this.contactsService
      .getAllUser(objQuery)
      .pipe(
        tap((data: any) => {
          this.userDetailFirst = data.accounts[0];
          this.users = data.accounts;
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

  onSearch(): void {
    this.searchForm
      .get("searchTerm")!
      .valueChanges.pipe(debounceTime(500), takeUntil(this.destroySubject))
      .subscribe((searchTerm) => {
        this.prevPage = 1;
        this.getAllUser(this.prevPage, searchTerm);
      });
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
    this.getAllUser(
      currentPageNumber,
      this.searchForm.get("searchTerm")!.value
    );
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

    this.contactsService
      .deleteUser(id)
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
          this.getAllUser(this.page, this.searchForm.get("searchTerm")!.value);

          this.toast.success("Contact deleted successfully", {
            duration: 3000,
            position: "top-right",
          });
        },
      });
  }

  checkClassStatus(status?: string): string {
    switch (status) {
      case UserStatus.Activated:
        return ColorClass.success;
      case UserStatus.Deactivated:
        return ColorClass.danger;
      case UserStatus.PendingVerify:
        return ColorClass.warning;
      default:
        return ColorClass.warning;
    }
  }
}
