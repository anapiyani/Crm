import api from "../api";
import { ISchedule } from "@/ts/schedule.interface";

interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export const getSchedules = (): Promise<IResponseData<ISchedule[]>> => {
  return api.get(`/schedule/schedules/`).then((res) => res.data);
};

export const getScheduleByDate = (
  date: string
): Promise<ISchedule[]> => {
  return api
    .get(`/schedule/schedules/date/?date=${date}`)
    .then((res) => res.data);
};
