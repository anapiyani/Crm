import React, { useRef, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import {
  Add,
  ContentPaste,
  Delete,
  Edit,
  Man,
  Science,
} from "@mui/icons-material";
import { useDrop, useDrag } from "react-dnd";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AddRoleModal from "@/modals/service-catalog/add-role.modal";
import NiceModal from "@ebay/nice-modal-react";
import createStorageCategoryModal from "@/modals/storage-catalog/create-storage-category.modal";
import classes from "./styles.module.scss";
import {
  useDeleteStorageHierarchy,
  useMoveStorageHierarchy,
} from "@/service/hierarchy/hierarchy.hook";
import { IMaterial } from "@/ts/storage.interface";
import {
  ISearchResultStorage,
  IStorageCategory,
} from "@/ts/hierarchy.inteface";
import { IMoveHierarchy } from "@/ts/hierarchy.inteface";
import editStorageCategoryModal from "@/modals/storage-catalog/edit-storage-category.modal";

interface IMaterialProps {
  material: IMaterial;
  isSelected: boolean;
  onSelect: (material: IMaterial) => void;
  isHighlighted: boolean | undefined;
}

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

interface ICategoryProps {
  category: IStorageCategory;
  selectedMaterialId: number | null;
  selectedCategoryId: IStorageCategory | null;
  searchResults?: ISearchResultStorage;
  onSelectCategory: (category: IStorageCategory) => void;
  onSelectMaterial: (material: IMaterial) => void;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  isOver: boolean;
  onHover: (hovered: boolean, category: IStorageCategory) => void;
}

const levelsIcon: Record<string, JSX.Element> = {
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

const TreeItem: React.FC<ICategoryProps> = ({
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dropZoneRef = useRef<string | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: category.id, type: "category" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOverCurrent }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: { id: number; type: string }) => {
      if (dropZoneRef.current !== category.id.toString()) {
        dropZoneRef.current = category.id.toString();
        onDropItem(item.id, item.type, category.id);
        console.log("Dropped item", item.id, item.type, "on", category.id);
      }
    },
    hover: (item: { id: number; type: string }) => {
      onHover(true, category);
    },
    collect: (monitor) => ({
      isOverCurrent: !!monitor.isOver(),
    }),
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

interface TreeViewProps {
  categories: IStorageCategory[];
  searchResults?: ISearchResultStorage;
  onMaterialSelect: (material: IMaterial) => void;
}

const TreeViewStorage: React.FC<TreeViewProps> = ({
  categories,
  onMaterialSelect,
  searchResults,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(
    null
  );
  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<IStorageCategory | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [
    hoveredCategory,
    setHoveredCategory,
  ] = useState<IStorageCategory | null>(null);
  const [copiedCategory, setCopiedCategory] = useState<IStorageCategory | null>(
    null
  );

  const moveHierarchyItems = useMoveStorageHierarchy();
  const deleteHierarchyItems = useDeleteStorageHierarchy();

  const handleClickAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddHierarchy = (levelName: string) => {
    NiceModal.show(createStorageCategoryModal, {
      level: levelName,
      parent: selectedCategoryId?.id,
    });
    setAnchorEl(null);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleSelectMaterial = (material: IMaterial) => {
    setSelectedMaterialId(material.id);
    setSelectedCategoryId(null);
    onMaterialSelect(material);
  };

  const handleSelectCategory = (category: IStorageCategory) => {
    setSelectedCategoryId(category);
    setSelectedMaterialId(null);
  };

  const handleDropItem = (
    itemId: number,
    itemType: string,
    targetId: number
  ) => {
    if (isDropping) {
      console.log("Drop event ignored because another drop is in progress.");
      return;
    }

    setIsDropping(true);
    const typeItem = [
      "section",
      "brand",
      "group",
      "category",
      "subcategory",
    ].includes(itemType)
      ? "hierarchical_item"
      : "material";

    const temp: IMoveHierarchy = {
      item: itemId,
      type: typeItem,
      to: targetId,
    };

    moveHierarchyItems.mutate(temp, {
      onSuccess: () => {
        setIsDropping(false);
      },
      onError: () => {
        setIsDropping(false);
      },
    });
  };

  const handlePasteItem = () => {
    const temp: IMoveHierarchy = {
      item: copiedCategory!.id,
      type: "hierarchical_item",
      to: selectedCategoryId!.id,
    };
    moveHierarchyItems.mutate(temp);
  };

  const handleHover = (hovered: boolean, category: IStorageCategory) => {
    if (hovered) {
      setHoveredCategory(category);
    } else {
      setHoveredCategory(null);
    }
  };

  return (
    <div className={classes["windows"]}>
      <div className={classes["window__header"]}>
        <p>Выберите материал</p>
        <div>
          <IconButton
            disabled={selectedCategoryId === null}
            sx={{
              color: "white",
              backgroundColor: "var(--success-500)",
              borderRadius: "10%",
              padding: "0.5rem",
              boxShadow: "None",

              ...{ "&:hover": { backgroundColor: "var(--primary-700)" } },
              ...{ "&:disabled": { color: "white" } },
            }}
            onClick={handleClickAnchor}
          >
            <Add fontSize="large" />
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseAnchor}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              disabled={[
                "section",
                "brand",
                "group",
                "category",
                "subcategory",
                undefined,
              ].includes(selectedCategoryId?.level)}
              onClick={() => handleAddHierarchy("section")}
            >
              <ListItemIcon>{levelsIcon["section"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Секция
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={[
                "brand",
                "group",
                "category",
                "subcategory",
                undefined,
              ].includes(selectedCategoryId?.level)}
              onClick={() => handleAddHierarchy("service_type")}
            >
              <ListItemIcon>{levelsIcon["service_type"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Марка
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={[
                "group",
                "category",
                "subcategory",
                undefined,
              ].includes(selectedCategoryId?.level)}
              onClick={() => handleAddHierarchy("group")}
            >
              <ListItemIcon>{levelsIcon["group"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Группа
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={["category", "subcategory", undefined].includes(
                selectedCategoryId?.level
              )}
              onClick={() => handleAddHierarchy("category")}
            >
              <ListItemIcon>{levelsIcon["category"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Категория
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={selectedCategoryId?.level == "subcategory"}
              onClick={() => handleAddHierarchy("subcategory")}
            >
              <ListItemIcon>{levelsIcon["subcategory"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Подкатегория
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCloseAnchor}>
              <ListItemIcon>
                <ContentCutIcon
                  sx={{
                    fontSize: "24px",
                    marginRight: "1.6rem",
                    color: "#388E3C",
                  }}
                />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Материал
              </ListItemText>
            </MenuItem>
          </Menu>
          {selectedCategoryId?.level !== "department" && (
            <IconButton
              disabled={selectedCategoryId === null}
              sx={{
                color: "white",
                backgroundColor: "var(--primary-main)",
                borderRadius: "10%",
                padding: "0.5rem",
                boxShadow: "None",

                ...{ "&:hover": { backgroundColor: "var(--primary-700)" } },
                ...{ "&:disabled": { color: "white" } },
              }}
              onClick={() => {
                NiceModal.show(editStorageCategoryModal, {
                  category: selectedCategoryId ? selectedCategoryId : undefined,
                });
              }}
            >
              <Edit fontSize="large" />
            </IconButton>
          )}

          <IconButton
            disabled={selectedCategoryId === null}
            sx={{
              color: "white",
              backgroundColor: "#F09800",
              borderRadius: "10%",
              padding: "0.5rem",
              boxShadow: "None",

              ...{ "&:hover": { backgroundColor: "var(--primary-700)" } },
              ...{ "&:disabled": { color: "white" } },
            }}
            onClick={() => {
              setCopiedCategory(selectedCategoryId);
            }}
          >
            <ContentCutIcon fontSize="large" />
          </IconButton>
          {copiedCategory !== null && (
            <IconButton
              disabled={selectedCategoryId === null}
              sx={{
                color: "white",
                backgroundColor: "#F09800",
                borderRadius: "10%",
                padding: "0.5rem",
                boxShadow: "None",

                ...{ "&:hover": { backgroundColor: "var(--primary-700)" } },
                ...{ "&:disabled": { color: "white" } },
              }}
              onClick={() => {
                handlePasteItem();
              }}
            >
              <ContentPaste fontSize="large" />
            </IconButton>
          )}

          {selectedCategoryId?.level !== "department" && (
            <IconButton
              disabled={selectedCategoryId === null}
              sx={{
                color: "white",
                backgroundColor: "var(--danger-500)",
                borderRadius: "10%",
                padding: "0.5rem",
                boxShadow: "None",

                ...{ "&:hover": { backgroundColor: "var(--primary-700)" } },
                ...{ "&:disabled": { color: "white" } },
              }}
              onClick={() => {
                deleteHierarchyItems.mutate(selectedCategoryId!.id);
              }}
            >
              <Delete fontSize="large" />
            </IconButton>
          )}
        </div>
      </div>
      <Divider />
      <div className={classes["window__content"]}>
        {categories.map((category) => (
          <TreeItem
            key={category.id}
            category={category}
            selectedMaterialId={selectedMaterialId}
            selectedCategoryId={selectedCategoryId}
            searchResults={searchResults}
            onSelectCategory={handleSelectCategory}
            onSelectMaterial={handleSelectMaterial}
            onDropItem={handleDropItem}
            isOver={hoveredCategory?.id === category.id}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeViewStorage;
