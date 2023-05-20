export interface ContactsModel {
  _id: string;
  email: string;
  fullname: string;
  gender: string;
  activated: string;
  phone: number;
  balance: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
