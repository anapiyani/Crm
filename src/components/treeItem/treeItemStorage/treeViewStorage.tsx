import React, { ReactNode, useState } from "react";
import {
  Add,
  ContentCut,
  ContentPaste,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Folder,
  LanOutlined,
} from "@mui/icons-material";
import {
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { useQuery } from "@tanstack/react-query";
import {
  useDeleteStorageHierarchy,
  useMoveStorageHierarchy,
} from "@/service/hierarchy/hierarchy.hook";
import { IMaterial } from "@/ts/storage.interface";
import { IMoveHierarchy, ISearchResultStorage } from "@/ts/hierarchy.inteface";
import { useDragAndDrop } from "@/components/treeItem/hooks/useDragAndDrop.ts";
import MaterialItem from "@/components/treeItem/MaterialItem.tsx";
import { TKatalogHierarchy } from "@/ts/service.interface.ts";
import createStorageCategoryModal from "@/modals/storage-catalog/create-storage-category.modal";
import editStorageCategoryModal from "@/modals/storage-catalog/edit-storage-category.modal";
import classes from "./styles.module.scss";
import { getHierarchyKatalog } from "@/service/hierarchy/hierarchy.service";

const LEVEL_ICONS: Record<string, ReactNode> = {
  department: (
    <LanOutlined
      style={{ color: "#0B6BCB", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  section: (
    <Folder
      style={{ color: "#1E88E5", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  brand: (
    <Folder
      style={{ color: "#1565C0", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  group: (
    <Folder
      style={{ color: "#7B1FA2", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  category: (
    <Folder
      style={{ color: "#EF6C00", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  subcategory: (
    <Folder
      style={{ color: "#FBC02D", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
};

type TreeItemProps = {
  item: TKatalogHierarchy;
  selectedMaterialId: number | null;
  selectedCategoryId: TKatalogHierarchy | null;
  searchResults?: ISearchResultStorage;
  onSelectCategory: (category: TKatalogHierarchy) => void;
  onSelectMaterial: (material: IMaterial) => void;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  isOver: boolean;
  onHover: (hovered: boolean, category: TKatalogHierarchy) => void;
};

const TreeItem: React.FC<TreeItemProps> = ({
  item,
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
  const { isDragging, isOverCurrent, drag, drop } = useDragAndDrop({
    id: item.id,
    type: "category",
    onDropItem,
    onHover: (isHovering) => onHover(isHovering, item),
  });

  const {
    data: children,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["storageHierarchyData", item.id],
    queryFn: () => getHierarchyKatalog(item.id),
    enabled: isOpen,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const isHighlighted = searchResults?.hierarchical_items.some(
    (searchItem) =>
      searchItem.id === item.id &&
      searchItem.level === item.level &&
      searchItem.name === item.name
  );

  const toggle = () => {
    setIsOpen(!isOpen);
    onSelectCategory(item);
  };

  return (
    <div
      className={classes["tree"]}
      ref={drop}
      style={{ backgroundColor: isOver ? "#f0f0f0" : "transparent" }}
    >
      <div
        onClick={toggle}
        className={`${classes["tree__branch"]} ${selectedCategoryId === item ? classes["selected"] : ""}`}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          border: isOverCurrent ? "1px dashed #0B6BCB" : "none",
        }}
      >
        {LEVEL_ICONS[item.level]}
        <span style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
          {item.name}
        </span>
        <span style={{ paddingTop: "8px" }} onClick={toggle}>
          {isOpen ? (
            <ExpandLess style={{ fontSize: "24px" }} />
          ) : (
            <ExpandMore style={{ fontSize: "24px" }} />
          )}
        </span>
      </div>
      {isOpen && (
        <div className={classes["tree__open"]}>
          {isPending ? (
            <CircularProgress size={24} />
          ) : isError ? (
            <div>Error loading children</div>
          ) : (
            <>
              {children?.map((child) => (
                <TreeItem
                  key={child.id}
                  item={child}
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
              {item.materials.length > 0 && (
                <ul>
                  {item.materials.map((material) => (
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  categories: TKatalogHierarchy[];
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
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<TKatalogHierarchy | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [hoveredCategory, setHoveredCategory] =
    useState<TKatalogHierarchy | null>(null);
  const [copiedCategory, setCopiedCategory] =
    useState<TKatalogHierarchy | null>(null);

  const moveHierarchyItems = useMoveStorageHierarchy();
  const deleteHierarchyItems = useDeleteStorageHierarchy();

  const handleAddHierarchy = (levelName: string) => {
    NiceModal.show(createStorageCategoryModal, {
      level: levelName,
      parent: selectedCategoryId?.id,
    });
    setAnchorEl(null);
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
      onSuccess: () => setIsDropping(false),
      onError: () => setIsDropping(false),
    });
  };

  const handlePasteItem = () => {
    if (copiedCategory && selectedCategoryId) {
      const temp: IMoveHierarchy = {
        item: copiedCategory.id,
        type: "hierarchical_item",
        to: selectedCategoryId.id,
      };
      moveHierarchyItems.mutate(temp);
    }
  };

  const renderMenuItem = (level: string, disabled: boolean) => (
    <MenuItem disabled={disabled} onClick={() => handleAddHierarchy(level)}>
      <ListItemIcon>{LEVEL_ICONS[level]}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
        {level === "section"
          ? "Секция"
          : level === "brand"
            ? "Марка"
            : level === "group"
              ? "Группа"
              : level === "category"
                ? "Категория"
                : level === "subcategory"
                  ? "Подкатегория"
                  : ""}
      </ListItemText>
    </MenuItem>
  );

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
              "&:hover": { backgroundColor: "var(--primary-700)" },
              "&:disabled": { color: "white" },
            }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Add fontSize="large" />
            <ExpandMore />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {renderMenuItem(
              "section",
              !["department"].includes(selectedCategoryId?.level || "")
            )}
            {renderMenuItem(
              "brand",
              !["department", "section"].includes(
                selectedCategoryId?.level || ""
              )
            )}
            {renderMenuItem(
              "group",
              !["department", "section", "brand"].includes(
                selectedCategoryId?.level || ""
              )
            )}
            {renderMenuItem(
              "category",
              !["department", "section", "brand", "group"].includes(
                selectedCategoryId?.level || ""
              )
            )}
            {renderMenuItem(
              "subcategory",
              selectedCategoryId?.level !== "category"
            )}
            <MenuItem onClick={() => setAnchorEl(null)}>
              <ListItemIcon>
                <ContentCut
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
                "&:hover": { backgroundColor: "var(--primary-700)" },
                "&:disabled": { color: "white" },
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
              "&:hover": { backgroundColor: "var(--primary-700)" },
              "&:disabled": { color: "white" },
            }}
            onClick={() => setCopiedCategory(selectedCategoryId)}
          >
            <ContentCut fontSize="large" />
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
                "&:hover": { backgroundColor: "var(--primary-700)" },
                "&:disabled": { color: "white" },
              }}
              onClick={handlePasteItem}
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
                "&:hover": { backgroundColor: "var(--primary-700)" },
                "&:disabled": { color: "white" },
              }}
              onClick={() => {
                if (selectedCategoryId) {
                  deleteHierarchyItems.mutate(selectedCategoryId.id);
                }
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
            item={category}
            selectedMaterialId={selectedMaterialId}
            selectedCategoryId={selectedCategoryId}
            searchResults={searchResults}
            onSelectCategory={setSelectedCategoryId}
            onSelectMaterial={(material) => {
              setSelectedMaterialId(material.id);
              setSelectedCategoryId(null);
              onMaterialSelect(material);
            }}
            onDropItem={handleDropItem}
            isOver={hoveredCategory?.id === category.id}
            onHover={(hovered, category) =>
              setHoveredCategory(hovered ? category : null)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TreeViewStorage;
