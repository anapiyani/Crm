export interface IStorage {
  date_created: string;
  date_updated: string;
  employee: null | string;
  id: number;
  name: string;
  type: string;
}

export interface IMaterial {
  id: number;
  vendor_code: string;
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
