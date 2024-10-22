import React, { FC } from "react";
import { useDrag } from "react-dnd";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { ServiceItemProps } from "./types";
import classes from "./styles.module.scss";

export const ServiceItem: FC<ServiceItemProps> = ({
  service,
  isSelected,
  onSelect,
  isHighlighted,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: service.id, type: "service" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`${classes.tree__service} ${isSelected ? classes.selected : ""}`}
      style={{
        listStyle: "none",
        gap: "1.6rem",
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => onSelect(service)}
    >
      <ContentCutIcon style={{ color: "#388E3C", fontSize: "24px" }} />
      <p style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
        {service.name}
      </p>
    </li>
  );
};
