import {
  ISearchResultStorage,
  IStorageCategory,
} from "@/ts/hierarchy.inteface.ts";
import { IMaterial } from "@/ts/storage.interface.ts";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import React, { FC } from "react";
import { useDragAndDrop } from "@/components/treeItem/hooks/useDragAndDrop.ts";
import classes from "@/components/treeItem/treeItemStorage/styles.module.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialItem from "@/components/treeItem/MaterialItem.tsx";

type ICategoryProps = {
  category: IStorageCategory;
  selectedMaterialId: number | null;
  selectedCategoryId: IStorageCategory | null;
  searchResults?: ISearchResultStorage;
  onSelectCategory: (category: IStorageCategory) => void;
  onSelectMaterial: (material: IMaterial) => void;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  isOver: boolean;
  onHover: (hovered: boolean, category: IStorageCategory) => void;
};

export const levelsIcon: Record<string, JSX.Element> = {
  department: (
    <LanOutlinedIcon
      style={{ color: "#0B6BCB", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  section: (
    <FolderIcon
      style={{ color: "#1E88E5", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  brand: (
    <FolderIcon
      style={{ color: "#1565C0", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  group: (
    <FolderIcon
      style={{ color: "#7B1FA2", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  category: (
    <FolderIcon
      style={{ color: "#EF6C00", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  subcategory: (
    <FolderIcon
      style={{ color: "#FBC02D", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
};

const TreeItem: FC<ICategoryProps> = ({
  category,
  selectedMaterialId,
  selectedCategoryId,
  searchResults,
  onSelectCategory,
  onSelectMaterial,
  onDropItem,
  isOver,
  onHover,
}) => {
  const { isOpen, toggle, isDragging, isOverCurrent, drag, drop } =
    useDragAndDrop({
      id: category.id,
      type: "category",
      onDropItem,
      onHover: (isHovering, category) => onHover(isHovering, category),
    });

  const isHighlighted = searchResults?.hierarchical_items.some(
    (item) =>
      item.id === category.id &&
      item.level === category.level &&
      item.name === category.name
  );

  return (
    <div
      className={classes["tree"]}
      ref={drop}
      style={{ backgroundColor: isOver ? "#f0f0f0" : "transparent" }}
    >
      <div
        onClick={() => {
          toggle();
          onSelectCategory(category);
        }}
        className={`${classes["tree__branch"]} ${
          selectedCategoryId === category ? classes["selected"] : ""
        }`}
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
        {(category.children.length > 0 || category.materials.length > 0) && (
          <span style={{ paddingTop: "8px" }} onClick={toggle}>
            {isOpen ? (
              <ExpandLessIcon style={{ fontSize: "24px" }} />
            ) : (
              <ExpandMoreIcon style={{ fontSize: "24px" }} />
            )}
          </span>
        )}
      </div>
      {isOpen && (
        <div className={classes["tree__open"]}>
          {category.children.map((child) => (
            <TreeItem
              key={child.id}
              category={child}
              selectedMaterialId={selectedMaterialId}
              selectedCategoryId={selectedCategoryId}
              searchResults={searchResults}
              onSelectCategory={onSelectCategory}
              onSelectMaterial={onSelectMaterial}
              onDropItem={onDropItem}
              isOver={isOver}
              onHover={onHover}
            />
          ))}
          {category.materials.length > 0 && (
            <ul>
              {category.materials.map((material) => (
                <MaterialItem
                  key={material.id}
                  material={material}
                  isSelected={material.id === selectedMaterialId}
                  onSelect={onSelectMaterial}
                  isHighlighted={searchResults?.materials.some(
                    (materialResult) => materialResult.id === material.id
                  )}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
