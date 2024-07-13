import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addStorage, editStorage } from "./storage.service";
import { IAddStorage, IEditStorage } from "@/ts/storage.interface";

export const useAddStorage = () => {
  const queryClient = useQueryClient();
  return useMutation<IAddStorage, Error, IAddStorage>({
    mutationFn: addStorage,
    onSuccess: () => {
      toast.success("Склад успешно добавлен.");
      queryClient.invalidateQueries({ queryKey: ["storageData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добовлении: ${error.message}`);
    },
  });
};

export const useEditStorage = () => {
  const queryClient = useQueryClient();
  return useMutation<IEditStorage, Error, IEditStorage>({
    mutationFn: editStorage,
    onSuccess: () => {
      toast.success("Склад успешно изменен.");
      queryClient.invalidateQueries({ queryKey: ["storageData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при изменении: ${error.message}`);
    },
  });
};
