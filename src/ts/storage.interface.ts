export interface IStorage {
  count: number;
  next: string;
  previous: string;
  total_pages: number;
  items_per_page: number;
  results: IStorageData[];
}

export interface IStorageData {
  id: number;
  name: string;
  type: string;
}

export type IStorageResponse = {
  count: number;
  items_per_page: number;
  next: string;
  previous: string;
  results: IStorage[];
  total_pages: number;
};

export interface IMaterialnameId {
  id: number;
  name: string;
}

export interface IMaterial {
  id: number;
  vendor_code: string;
  alternative_name: string | null;
  barcode: string;
  name: string;
  description: string;
  provider: string;
  purchase_price: string;
  retail_price: string;
  wholesale_price: string;
  selling_price: string;
  is_product: boolean;
  unit_of_measurement: string;
  volume: string;
  norm_volume: string;
  tare_weight: string;
  discount_size: string;
  service_volume: string;
  is_active: boolean;
  date_added: string;
  date_updated: string;
  service: string | null;
  parent_id: number | null;
  parent_name: string | null;
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

export type IMaterialsResponse = {
  count: number;
  items_per_page: number;
  next: string;
  previous: string;
  results: IMaterials[];
  total_pages: number;
};

export type IMaterials = {
  date_added: string;
  date_updated: string;
  description: string;
  discount_size: string;
  id: number;
  is_active: boolean;
  is_product: boolean;
  name: string;
  norm_volume: string;
  parent_id: number;
  parent_name: string;
  provider: string;
  purchase_price: string;
  retail_price: string;
  selling_price: string;
  service: number;
  service_volume: string;
  tare_weight: string;
  total_quantity: number;
  unit_of_measurement: string;
  vendor_code: string;
  volume: string;
  wholesale_price: string;
};

export type IMaterialsStorageResponse = {
  count: number;
  items_per_page: number;
  next: string;
  previous: string;
  results: IMaterialsStorage[];
  total_pages: number;
};

export type IMaterialsStorage = {
  id: number;
  material: number;
  material_name: string;
  quantity: string;
  storage: number;
  storage_name: string;
};
