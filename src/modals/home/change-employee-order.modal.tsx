import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import EmployeeReorder from "./_components/employee-reorder/employee-reorder";
import { useReorderEmployee } from "@/service/schedule/schedule.hook";

interface IConvertedEmployee {
  id: number;
  first_name: string;
  last_name: string;
  position: number;
}

const ChangeEmployee = () => {
  const modal = useModal();
  const employeeReorderMutation = useReorderEmployee();

  const { data, isPending } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () =>
      searchEmployee({
        role: "employee",
      }),
  });

  const employeeReorderProps = data?.results.map((employee) => ({
    id: employee.user_id,
    position: Number(employee.position),
    first_name: employee.first_name,
    last_name: employee.last_name,
  }));

  const handleReorder = (updatedEmployees: IConvertedEmployee[]) => {
    const order_data = updatedEmployees.map((employee) => ({
      employee_id: employee.id,
      order: employee.position,
      is_hidden: false,
    }));

    employeeReorderMutation.mutate({ order_data: order_data });
  };

  return (
    <ModalWindow
      title="Изменение порядка сотрудников"
      open={modal.visible}
      handleClose={() => modal.hide()}
      afterClose={modal.remove}
    >
      <EmployeeReorder
        employees={employeeReorderProps || []}
        onReorder={handleReorder}
        isLoading={isPending || employeeReorderMutation.isPending}
      />
    </ModalWindow>
  );
};

const ChangeEmployeeModal = NiceModal.create(ChangeEmployee);
export default ChangeEmployeeModal;
