export interface ISearchFormData {
  search: string;
  phoneNumber: string;
  userId: string;
  email: string;
  isActive: boolean | null;
  employmentDateFrom: string;
  employmentDateTo: string;
  birthDateFrom: string;
  birthDateTo: string;
  ageFrom: string;
  ageTo: string;
  gender: "male" | "female" | "";
  role: string;
  roleEmployee: string;
  reviewFrom: string;
  reviewAbout: string;
  reviewDateFrom: string;
  reviewDateTo: string;
  page: number;
  pageSize: number;
}
