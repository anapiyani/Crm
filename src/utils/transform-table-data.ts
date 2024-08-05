import { IAppointmentHistory } from "@/ts/appointments.interface";

interface IHeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

type ITableData = {
  [key: string]: string | number | boolean | undefined;
};

export function transformDataToTableFormat<T extends ITableData>(
  data: IAppointmentHistory[],
  headCells: IHeadCell<T>[]
): T[] {
  return data.map((appointment, index) => {
    const rowData: ITableData = {};

    headCells.forEach((headCell) => {
      const key = headCell.id as string;

      switch (key) {
        case "planned_id":
          rowData[key] = index + 1;
          break;
        case "id":
          rowData[key] = appointment.id;
          break;
        case "date":
          rowData[key] = appointment.date;
          break;
        case "time":
          rowData[key] =
            `с ${appointment.start_time.split(":").slice(0, 2).join(":")} по ${appointment.end_time.split(":").slice(0, 2).join(":")}`;
          break;
        case "status":
          rowData[key] = appointment.status;
          break;
        case "employee":
          rowData[key] = appointment.employee_name;
          break;
        case "service":
          rowData[key] = appointment.services
            .map((service) => service.service_name)
            .join(", ");
          break;
        case "price":
          rowData[key] = `${appointment.total_price} тенге`;
          break;
        case "admin":
          rowData[key] = "Admin 1";
          break;
        case "reason":
          rowData[key] = "Reason for deletion";
          break;
        case "deleted_by":
          rowData[key] = "Deleted by Admin";
          break;
        default:
          rowData[key] = appointment[key as keyof IAppointmentHistory] as any;
          break;
      }
    });

    return rowData as T;
  });
}
