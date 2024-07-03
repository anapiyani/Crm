import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRole, deleteRole, createRole } from "./department.service";
import { IRoleChange, IRoleCreate } from "@/ts/types";

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

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IRoleCreate, Error, IRoleCreate>({
    mutationFn: createRole,
    onSuccess: () => {
      toast.success("Должность успешно добавлен.");
      queryClient.invalidateQueries({ queryKey: ["departmentData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добовлении: ${error.message}`);
    },
  });
};
