import {
  IAddStorage,
  IEditStorage,
  IMaterial,
  IMaterials,
  IMaterialsResponse,
  IMaterialsStorage,
  IMaterialsStorageResponse,
  IStorage,
  IStorageResponse,
} from "@/ts/storage.interface";
import api from "../api";

export const getStorages = ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<IStorage> => {
  return api
    .get(`/storages/?page=${queryKey[1]}&page_size=5`)
    .then((res) => res.data);
};

export const addStorage = (storage: IAddStorage): Promise<any> => {
  return api.post("/storages/", storage).then((res) => res.data);
};

export const editStorage = (storage: IEditStorage): Promise<any> => {
  return api.put(`/storages/${storage.id}/`, storage).then((res) => res.data);
};

export const getMaterials = (): Promise<IMaterialsResponse> => {
  return api.get("/materials/").then((res) => res.data);
};

export const getStorageMaterials = ({
  material,
  storage,
}: {
  material: number;
  storage: number;
}): Promise<IMaterialsStorageResponse> => {
  return api
    .get(`/material-storage/?material=${material}&storage=${storage}`)
    .then((res) => res.data);
};

export const getMaterialInformation = (
  id: number | undefined
): Promise<IMaterial> => {
  return api.get(`/materials/${id}/`).then((res) => res.data);
};

export const writeOff = (page: number): Promise<any> => {
  return api.get(`/write-off/?page=${page}`).then((res) => res.data);
};

export const purchaseMaterial = (page: number): Promise<any> => {
  return api.get(`/purchase/?page=${page}`).then((res) => res.data);
};
