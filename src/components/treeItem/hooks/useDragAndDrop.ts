import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

type UseDragAndDropProps = {
  id: number;
  type: string;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  onHover: (isHovering: boolean, category: any) => void;
};

export const useDragAndDrop = ({
  id,
  type,
  onDropItem,
  onHover,
}: UseDragAndDropProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dropZoneRef = useRef<string | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOverCurrent }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: { id: number; type: string }) => {
      if (dropZoneRef.current !== id.toString()) {
        dropZoneRef.current = id.toString();
        onDropItem(item.id, item.type, id);
        console.log("Dropped item", item.id, item.type, "on", id);
      }
    },
    hover: (item: { id: number; type: string }) => {
      onHover(true, { id, type });
    },
    collect: (monitor) => ({
      isOverCurrent: !!monitor.isOver(),
    }),
  });

  return {
    isOpen,
    toggle,
    isDragging,
    isOverCurrent,
    drag,
    drop,
  };
};
