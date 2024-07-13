import api from "../api";
import { ISchedule } from "@/ts/schedule.interface";

export const getScheduleByDate = (date: string): Promise<ISchedule[]> => {
  return api
    .get(`/schedule/schedules/date/?date=${date}`)
    .then((res) => res.data);
};
