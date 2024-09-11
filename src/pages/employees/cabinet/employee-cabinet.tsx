import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/service/rooms/rooms.service";
import { getHierarchy } from "@/service/hierarchy/hierarchy.service";
import { IRoom } from "@/ts/types";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Button, Divider } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import classes from "./styles.module.scss";
import NiceModal from "@ebay/nice-modal-react";
import CreateCabinetModal from "@/modals/employees/create-cabinet.modal";
import { useUpdateRoom } from "@/service/rooms/rooms.hook";

const EmployeeCabinet = () => {
  const updateRoom = useUpdateRoom();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; type: "service" | "category"; isChecked: number }[]
  >([]);

  const handleRoomClick = (room: IRoom) => {
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
        // Add the item if it's checked
        return [...prev, { id, type, isChecked }];
      } else if (isChecked === 2) {
        // Remove the item if it's unchecked
        return prev.filter((item) => !(item.id === id && item.type === type));
      } else if (isChecked === 3) {
        // For intermediate state, you might want to handle differently.
        // This example does not add or remove but could be extended based on your needs.
        return prev; // Keep the state as is or update based on specific logic.
      }
      return prev;
    });
  };

  const handleSave = (room: IRoom) => {
    room.services = selectedItems
      .filter((item) => item.type === "service")
      .map((item) => item.id);

    updateRoom.mutate(room);
  };

  const { data: roomData } = useQuery({
    queryKey: ["roomData"],
    queryFn: getRooms,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

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
            <ul>
              {roomData?.map((room: IRoom) => (
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
          </div>
        </div>
        <div className={classes["main__content__cabinets"]}>
          <div className={classes["main__content__cabinets__header"]}>
            <h1>Услуги</h1>
            <Button
              startIcon={<SaveOutlined />}
              onClick={() =>
                handleSave(
                  roomData?.find((room) => room.id === selectedRoom) as IRoom
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
