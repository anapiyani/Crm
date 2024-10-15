import React, { FC } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItemContentProps } from "./types";
import { levelsIcon } from "./constants";
import classes from "./styles.module.scss";

export const TreeItemContent: FC<TreeItemContentProps> = ({
  category,
  isOpen,
  toggle,
  isHighlighted,
  selectedCategoryId,
  onSelectCategory,
  drag,
  isDragging,
  isOverCurrent,
}) => {
  return (
    <div
      onClick={() => {
        toggle();
        onSelectCategory(category);
      }}
      className={`${classes.tree__branch} ${selectedCategoryId === category ? classes.selected : ""}`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isOverCurrent ? "1px dashed #0B6BCB" : "none",
      }}
    >
      {levelsIcon[category.level]}
      <span style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
        {category.name}
      </span>
      {(category.children.length > 0 || category.services.length > 0) && (
        <span style={{ paddingTop: "8px" }} onClick={toggle}>
          {isOpen ? (
            <ExpandLessIcon style={{ fontSize: "24px" }} />
          ) : (
            <ExpandMoreIcon style={{ fontSize: "24px" }} />
          )}
        </span>
      )}
    </div>
  );
};
