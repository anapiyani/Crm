import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/service/rooms/rooms.service.ts";
import { Room, RoomsData } from "@/ts/types.ts";
import { useState } from "react";

type UseRooms = {
  roomData: Room[] | null;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
};

const useRooms = (): UseRooms => {
  const [page, setPage] = useState(1);

  const { data: roomsData, isLoading } = useQuery<RoomsData>({
    queryKey: ["roomData", page],
    queryFn: () => getRooms(page),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const nextPage = () => {
    if (roomsData && roomsData.next) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (roomsData && roomsData.previous) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    roomData: roomsData ? roomsData.results : null,
    nextPage,
    prevPage,
    currentPage: page,
    totalPages: roomsData ? roomsData.total_pages : 0,
    isLoading,
  };
};

export default useRooms;
