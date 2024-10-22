import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

type DragItem = {
  id: number;
  type: string;
};

type UseDragAndDropProps = {
  id: number;
  type: string;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  onHover: (
    isHovering: boolean,
    category: { id: number; type: string }
  ) => void;
  isBlocked?: boolean;
};

export const useDragAndDrop = ({
  id,
  type,
  onDropItem,
  onHover,
  isBlocked = false,
}: UseDragAndDropProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDroppedId = useRef<string | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    return () => {
      if (dropTimeoutRef.current) {
        clearTimeout(dropTimeoutRef.current);
      }
    };
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ITEM",
      item: { id, type },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      canDrag: !isBlocked,
      end: () => {
        // Reset state when drag ends
        isHoveringRef.current = false;
        onHover(false, { id, type });
      },
    }),
    [id, type, isBlocked]
  );

  // Memoize drop configuration
  const [{ isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "ITEM",
      drop: (item: DragItem, monitor) => {
        if (isBlocked) return;

        const dropId = `${item.id}-${id}`;
        if (lastDroppedId.current === dropId) return;

        if (!monitor.isOver({ shallow: true })) return;

        lastDroppedId.current = dropId;

        if (dropTimeoutRef.current) {
          clearTimeout(dropTimeoutRef.current);
        }

        dropTimeoutRef.current = setTimeout(() => {
          onDropItem(item.id, item.type, id);
          lastDroppedId.current = null;
        }, 100);
      },
      hover: (item: DragItem, monitor) => {
        if (isBlocked) return;

        // Only handle hover if it's directly over this component
        if (!monitor.isOver({ shallow: true })) {
          if (isHoveringRef.current) {
            isHoveringRef.current = false;
            onHover(false, { id, type });
          }
          return;
        }

        // Prevent unnecessary hover updates
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          onHover(true, { id, type });
        }
      },
      collect: (monitor) => ({
        isOverCurrent: !!monitor.isOver({ shallow: true }),
      }),
      canDrop: (item: DragItem) => {
        // Prevent dropping onto itself
        return !isBlocked && item.id !== id;
      },
    }),
    [id, type, isBlocked]
  );

  return {
    isOpen,
    toggle,
    isDragging,
    isOverCurrent,
    drag,
    drop,
  };
};
