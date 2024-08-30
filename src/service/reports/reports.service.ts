import api from "../api";

export const getExcelFile = ({
  date_from,
  date_to,
}: {
  date_from: string;
  date_to: string;
}): Promise<any> => {
  return api
    .get(`/reports/reports/full/?date_from=${date_from}&date_to=${date_to}`, {
      responseType: "blob",
    })
    .then((res) => res.data);
};
