import { IRoom } from "@/ts/types";
import api from "../api";

export const getRooms = (): Promise<IRoom[]> => {
  return api.get("/rooms/rooms/").then((res) => res.data);
};

export const createRoom = (data: IRoom): Promise<IRoom> => {
  return api.post("/rooms/rooms/", data).then((res) => res.data);
};

export const updateRoom = (data: IRoom): Promise<IRoom> => {
  return api.patch(`/rooms/rooms/${data.id}/`, data).then((res) => res.data);
};
