export interface IStorage {
  date_created: string;
  date_updated: string;
  employee: null | string;
  id: number;
  name: string;
  type: string;
}

export interface IAddStorage {
  name: string;
  type: string | undefined;
  employee: string | undefined | null;
}
export interface IEditStorage {
  name: string;
  type: string | undefined;
  employee: string | undefined | null;
  id: number | null;
}
