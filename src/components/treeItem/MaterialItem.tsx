import { IMaterial } from "@/ts/storage.interface.ts";
import React from "react";
import { useDrag } from "react-dnd";
import classes from "@/components/treeItem/treeItemStorage/styles.module.scss";
import { Science } from "@mui/icons-material";

type IMaterialProps = {
  material: IMaterial;
  isSelected: boolean;
  onSelect: (material: IMaterial) => void;
  isHighlighted: boolean | undefined;
};

const MaterialItem: React.FC<IMaterialProps> = ({
  material,
  isSelected,
  onSelect,
  isHighlighted,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: material.id, type: "material" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`${classes["tree__material"]} ${
        isSelected ? classes["selected"] : ""
      }`}
      style={{
        listStyle: "none",
        gap: "1.6rem",
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => onSelect(material)}
    >
      <Science style={{ color: "#388E3C", fontSize: "24px" }} />{" "}
      <p style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
        {material.name}
      </p>
    </li>
  );
};

export default MaterialItem;
