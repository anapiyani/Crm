import api from "../api";
import { IBreaks, ISchedule } from "@/ts/schedule.interface";

interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export const getSchedules = (): Promise<IResponseData<ISchedule[]>> => {
  return api.get(`/schedule/schedules/`).then((res) => res.data);
};

export const getScheduleByDate = async (date: string): Promise<ISchedule[]> => {
  return await api
    .get(`/schedule/schedules/date/?date=${date}`)
    .then((res) => res.data);
};

export const addBreakToSchedule = (data: Omit<IBreaks, "id">) => {
  return api.post(`/schedule/breaks/`, data).then((res) => res.data);
};
