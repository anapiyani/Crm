import { IServiceCategory } from "@/ts/service.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addHierarchy,
  moveHierarchy,
  updateHierarchy,
  deleteHierarchy,
} from "./hierarchy.service";
import toast from "react-hot-toast";
import { IAddHierarchy, IMoveHierarchy } from "@/ts/hierarchy.inteface";

export const useCreateHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<IServiceCategory, Error, IAddHierarchy>({
    mutationFn: addHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно добавлена.");
      queryClient.invalidateQueries({ queryKey: ["hierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добавлении: ${error.message}`);
    },
  });
};

export const useMoveHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<IServiceCategory, Error, IMoveHierarchy>({
    mutationFn: moveHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно перемещена.");
      queryClient.invalidateQueries({ queryKey: ["hierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при перемещении: ${error.message}`);
    },
  });
};

export const useUpdateHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<IServiceCategory, Error, IServiceCategory>({
    mutationFn: updateHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно обновлена.");
      queryClient.invalidateQueries({ queryKey: ["hierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при обновлении: ${error.message}`);
    },
  });
};

export const useDeleteHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно удалена.");
      queryClient.invalidateQueries({ queryKey: ["hierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при удалении: ${error.message}`);
    },
  });
};