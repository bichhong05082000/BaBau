export const GlobalComponent = {
  // API_URL_LOCAL: "https://babau.onrender.com/api/",
  API_URL_LOCAL: "http://localhost:3000/api/",
  ITEMS_PER_PAGE: 11,
};

export enum UserStatus {
  Activated = "Activated",
  PendingVerify = "Pending-Verify",
  Deactivated = "Deactivated",
}

export enum ColorClass {
  primary = "badge-soft-primary",
  success = "badge-soft-success",
  danger = "badge-soft-danger",
  warning = "badge-soft-warning",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum RoleBabau {
  ROLE_ADMIN = "Admin",
  ROLE_USER = "User",
}

export enum ThreeMonth {
  FIRST = "first",
  MIDDLE = "middle",
  LAST = "last",
}

export interface Filter {
  page?: number;
  size?: number;
  search?: string;
  start?: string;
  end?: string;
  status?: String;
  bookingId?: string;
  event?: string;
}
