import { IRoom, RoomsData } from "@/ts/types";
import api from "../api";

export const getRooms = async (
  page: number = 1,
  pageSize: number = 10
): Promise<RoomsData> => {
  const res = await api.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`);
  return res.data;
};
export const createRoom = (data: IRoom): Promise<IRoom> => {
  return api.post("/rooms/rooms/", data).then((res) => res.data);
};

export const updateRoom = (data: IRoom): Promise<IRoom> => {
  return api.patch(`/rooms/rooms/${data.id}/`, data).then((res) => res.data);
};
