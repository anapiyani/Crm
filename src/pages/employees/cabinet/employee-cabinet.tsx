import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHierarchy } from "@/service/hierarchy/hierarchy.service";
import { Room } from "@/ts/types";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Button, Divider } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import classes from "./styles.module.scss";
import NiceModal from "@ebay/nice-modal-react";
import CreateCabinetModal from "@/modals/employees/create-cabinet.modal";
import { useUpdateRoom } from "@/service/rooms/rooms.hook";
import useRooms from "@/pages/employees/hooks/useRooms.ts";
import CustomPagination from "@/components/customPagination/CustomPagination.tsx";

const EmployeeCabinet = () => {
  const updateRoom = useUpdateRoom();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; type: "service" | "category"; isChecked: number }[]
  >([]);

  const { roomData, nextPage, prevPage, currentPage, totalPages, isLoading } =
    useRooms();

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room.id);
    setSelectedItems(
      room.services.map((serviceId) => ({
        id: serviceId,
        type: "service",
        isChecked: 1,
      }))
    );
  };

  const handleAddClick = () => {
    NiceModal.show(CreateCabinetModal);
  };

  const handleServiceChange = (
    id: number,
    isChecked: number,
    type: "service" | "category"
  ) => {
    setSelectedItems((prev) => {
      if (isChecked === 1) {
        return [...prev, { id, type, isChecked }];
      } else if (isChecked === 2) {
        return prev.filter((item) => !(item.id === id && item.type === type));
      } else if (isChecked === 3) {
        return prev;
      }
      return prev;
    });
  };

  const handleSave = (room: Room) => {
    room.services = selectedItems
      .filter((item) => item.type === "service")
      .map((item) => item.id);

    updateRoom.mutate(room);
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      nextPage();
    } else if (page < currentPage) {
      prevPage();
    }
  };

  const { data: serviceData } = useQuery({
    queryKey: ["serviceData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={classes["main"]}>
      <BreadcrumbsCustom />
      <div className={classes["main__content"]}>
        <div className={classes["main__content__cabinets"]}>
          <div className={classes["main__content__cabinets__header"]}>
            <h1>Кабинеты</h1>{" "}
            <Button onClick={handleAddClick}>+ Добавить</Button>
          </div>
          <Divider />
          <div className={classes["main__content__cabinets__items"]}>
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              <>
                <ul>
                  {roomData?.map((room: Room) => (
                    <li key={room.id}>
                      <Button
                        onClick={() => handleRoomClick(room)}
                        className={
                          selectedRoom === room.id ? classes["selected"] : ""
                        }
                      >
                        <p>{room.name}</p>{" "}
                        <span>
                          {room.available_online
                            ? "Доступен онлайн"
                            : "Не доступен онлайн"}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
        <div className={classes["main__content__cabinets"]}>
          <div className={classes["main__content__cabinets__header"]}>
            <h1>Услуги</h1>
            <Button
              startIcon={<SaveOutlined />}
              onClick={() =>
                handleSave(
                  roomData?.find((room) => room.id === selectedRoom) as Room
                )
              }
            >
              Сохранить
            </Button>
          </div>
          <Divider />
          <div className={classes["main__content__cabinets__items"]}>
            <ul>
              {serviceData?.map((service) => (
                <RecursiveCheckbox
                  key={`category-${service.id}`}
                  category={service}
                  onServiceChange={handleServiceChange}
                  preCheckedItems={selectedItems}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCabinet;
