import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRole, deleteRole } from "./department.service";
import { IRoleChange } from "@/ts/types";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IRoleChange, Error, IRoleChange>({
    mutationFn: updateRole,
    onSuccess: () => {
      toast.success("Role updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["departmentData"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так.");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success("Должность успешно удален.");
      queryClient.invalidateQueries({ queryKey: ["departmentData"] });
    },
    onError: () => {
      toast.error("Ошибка при удалении должности.");
    },
  });
};
