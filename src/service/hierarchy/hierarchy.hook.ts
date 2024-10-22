import {
  IService,
  IServiceCategory,
  TKatalogHierarchy,
} from "@/ts/service.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addHierarchy,
  addStorageHierarchy,
  createServiceBasic,
  deleteHierarchy,
  deleteStorageHierarchy,
  moveHierarchy,
  moveStorageHierarchy,
  updateHierarchy,
  updateStorageHierarchy,
} from "./hierarchy.service";
import toast from "react-hot-toast";
import {
  IAddHierarchy,
  IAddStorageHierarchy,
  IMoveHierarchy,
  IStorageCategory,
} from "@/ts/hierarchy.inteface";

export const useCreateHierarchy = (queryKey: string[] = ["hierarchyData"]) => {
  const queryClient = useQueryClient();
  return useMutation<IServiceCategory, Error, IAddHierarchy>({
    mutationFn: addHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно добавлена.");
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добавлении: ${error.message}`);
    },
  });
};

export const useCreateServiceBasic = () => {
  const queryClient = useQueryClient();
  return useMutation<IService, Error, { parent: number; name: string }>({
    mutationFn: createServiceBasic,
    onSuccess: () => {
      toast.success("Иерархия успешно добавлена.");
      queryClient.invalidateQueries({ queryKey: ["hierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добавлении: ${error.message}`);
    },
  });
};

export const useCreateStorageHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<IStorageCategory, Error, IAddStorageHierarchy>({
    mutationFn: addStorageHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно добавлена.");
      queryClient.invalidateQueries({ queryKey: ["storageHierarchyData"] });
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

export const useMoveStorageHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<IStorageCategory, Error, IMoveHierarchy>({
    mutationFn: moveStorageHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно перемещена.");
      queryClient.invalidateQueries({ queryKey: ["storageHierarchyData"] });
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

export const useUpdateStorageHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<TKatalogHierarchy, Error, TKatalogHierarchy>({
    mutationFn: updateStorageHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно обновлена.");
      queryClient.invalidateQueries({ queryKey: ["storageHierarchyData"] });
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

export const useDeleteStorageHierarchy = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteStorageHierarchy,
    onSuccess: () => {
      toast.success("Иерархия успешно удалена.");
      queryClient.invalidateQueries({ queryKey: ["storageHierarchyData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при удалении: ${error.message}`);
    },
  });
};
