import {
  IAddStorage,
  IEditStorage,
  IMaterials,
  IStorage,
} from "@/ts/storage.interface";
import api from "../api";

export const getStorages = (): Promise<IStorage[]> => {
  return api.get("/storages/").then((res) => res.data);
};

export const addStorage = (storage: IAddStorage): Promise<any> => {
  return api.post("/storages/", storage).then((res) => res.data);
};

export const editStorage = (storage: IEditStorage): Promise<any> => {
  return api.put(`/storages/${storage.id}/`, storage).then((res) => res.data);
};

export const getMaterials = (): Promise<IMaterials[]> => {
  return api.get("/materials/").then((res) => res.data);
};
