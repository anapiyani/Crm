import { Room, RoomsData } from "@/ts/types";
import api from "../api";

export const getRooms = async (
  page: number = 1,
  pageSize: number = 10
): Promise<RoomsData> => {
  const res = await api.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`);
  return res.data;
};
export const createRoom = async (data: Room): Promise<Room> => {
  const res = await api.post("/rooms/rooms/", data);
  return res.data;
};

export const updateRoom = async (data: Room): Promise<Room> => {
  const res = await api.patch(`/rooms/rooms/${data.id}/`, data);
  return res.data;
};
