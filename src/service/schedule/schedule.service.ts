import api from "../api";
import { IBreaks, ISchedule } from "@/ts/schedule.interface";
import { IResponseData } from "@/ts/types";

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

export const deleteBreakFromSchedule = (id: number) => {
  return api.delete(`/schedule/breaks/${id}/`).then((res) => res.data);
};

export const addTimeOffToSchedule = (
  employee_id: number,
  data: { status: string },
  date: string
) => {
  return api
    .post(
      `/schedule/day-statuses/add-time-off/${employee_id}/date/?date=${date}`,
      data
    )
    .then((res) => res.data);
};

export const getEmployeeScheduleDates = (
  employee_id: number
): Promise<{ date: string }[]> => {
  return api
    .get(`/schedule/schedules/employee/dates/?employee_id=${employee_id}`)
    .then((res) => res.data);
};

export const addTimeOffToScheduleByDate = (
  employee_id: string,
  date: string
): Promise<{
  id: number;
  status: string;
}> => {
  return api
    .post(`/schedule/day-statuses/add-time-off/${employee_id}/date/?${date}`, {
      status: "time_off",
    })
    .then((res) => res.data);
};

export const getEmployeeMonthlySchedule = (
  employee_id: number
): Promise<IResponseData<ISchedule[]>> => {
  return api
    .get(`/schedule/schedules/monthly/${employee_id}/`)
    .then((res) => res.data);
};

export const getEmployeeWeeklySchedule = (
  employee_id: number
): Promise<IResponseData<ISchedule[]>> => {
  return api
    .get(`/schedule/schedules/weekly/${employee_id}/`)
    .then((res) => res.data);
};

export const addEmployeeToSchedule = ({
  date,
  employee_id,
  start_time,
  end_time,
}: {
  date: string;
  employee_id: number;
  start_time: string;
  end_time: string;
}) => {
  return api
    .post(
      `/schedule/schedules/add/?date=${date}&employee_id=${employee_id}&end_time=${end_time}&start_time=${start_time}`
    )
    .then((res) => res.data);
};
