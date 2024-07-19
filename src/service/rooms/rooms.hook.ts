import { IRoom } from "@/ts/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom, updateRoom } from "./rooms.service";
import toast from "react-hot-toast";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<IRoom, Error, IRoom>({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Кабинет успешно добавлен.");
      queryClient.invalidateQueries({ queryKey: ["roomData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при добавлении: ${error.message}`);
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<IRoom, Error, IRoom>({
    mutationFn: updateRoom,
    onSuccess: () => {
      toast.success("Кабинет успешно изменен.");
      queryClient.invalidateQueries({ queryKey: ["roomData"] });
    },
    onError: (error: Error) => {
      toast.error(`Упс! ошибка при изменении: ${error.message}`);
    },
  });
};
