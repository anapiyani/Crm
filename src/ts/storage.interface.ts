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
  employee: string | null;
  date_created: string;
  date_updated: string;
}

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

export interface IMaterials {
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
}

export interface IMaterialsStorage {
  id: number;
  material: number;
  material_name: string;
  quantity: string;
  storage: number;
  storage_name: string;
}
