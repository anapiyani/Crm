import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  updateRole,
  deleteRole,
  createRole,
  associateRole,
} from "./department.service";
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

const useAssociateRole = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: associateRole,
    onSuccess: () => {
      toast.success("Должность успешно добавлен.");
      QueryClient.invalidateQueries({ queryKey: ["departmentData"] });
    },
    onError: () => {
      toast.error("Ошибка при добавлении должности.");
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const associateRoleMutation = useAssociateRole();

  return useMutation<IRoleCreate, Error, IRoleCreate>({
    mutationFn: createRole,
    onSuccess: (data, department_id) => {
      queryClient.invalidateQueries({ queryKey: ["departmentData"] });
      associateRoleMutation.mutate({
        department_id: department_id.department_id,
        role_id: data.id!,
      });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добовлении: ${error.message}`);
    },
  });
};
