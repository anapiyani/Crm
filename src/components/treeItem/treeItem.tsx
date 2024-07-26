import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Add } from "@mui/icons-material";
import { IService, IServiceCategory } from "@/ts/service.interface";
import { ISearchResult } from "@/ts/hierarchy.inteface";
import classes from "./styles.module.scss";
import { useDrop, useDrag } from "react-dnd";
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

interface IServiceProps {
  service: IService;
  isSelected: boolean;
  onSelect: (service: IService) => void;
  isHighlighted: boolean | undefined;
}

const ServiceItem: React.FC<IServiceProps> = ({
  service,
  isSelected,
  onSelect,
  isHighlighted,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: service.id, type: "service" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`${classes["tree__service"]} ${
        isSelected ? classes["selected"] : ""
      }`}
      style={{
        listStyle: "none",
        gap: "1.6rem",
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => onSelect(service)}
    >
      <ContentCutIcon style={{ color: "#388E3C", fontSize: "24px" }} />{" "}
      <p style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
        {service.name}
      </p>
    </li>
  );
};

interface ICategoryProps {
  category: IServiceCategory;
  selectedServiceId: number | null;
  selectedCategoryId: IServiceCategory | null;
  searchResults?: ISearchResult;
  onSelectCategory: (category: IServiceCategory) => void;
  onSelectService: (service: IService) => void;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
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
  service_type: (
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
  selectedServiceId,
  selectedCategoryId,
  searchResults,
  onSelectCategory,
  onSelectService,
  onDropItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: category.id, type: "category" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: { id: number; type: string }) => {
      onDropItem(item.id, item.type, category.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
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
        style={{ opacity: isDragging ? 0.5 : 1 }}
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
      {isOpen && (
        <div className={classes["tree__open"]}>
          {category.children.map((child) => (
            <TreeItem
              key={child.id}
              category={child}
              selectedServiceId={selectedServiceId}
              selectedCategoryId={selectedCategoryId}
              searchResults={searchResults}
              onSelectCategory={onSelectCategory}
              onSelectService={onSelectService}
              onDropItem={onDropItem}
            />
          ))}
          {category.services.length > 0 && (
            <ul>
              {category.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isSelected={service.id === selectedServiceId}
                  onSelect={onSelectService}
                  isHighlighted={searchResults?.services.some(
                    (serviceresult) => serviceresult.id === service.id
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
  categories: IServiceCategory[];
  searchResults?: ISearchResult;
  onServiceSelect: (service: IService) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  categories,
  onServiceSelect,
  searchResults,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<IServiceCategory | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddHierarchy = (name: string) => {
    setAnchorEl(null);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleSelectService = (service: IService) => {
    setSelectedServiceId(service.id);
    setSelectedCategoryId(null);
    onServiceSelect(service);
  };

  const handleSelectCategory = (category: IServiceCategory) => {
    setSelectedCategoryId(category);
    setSelectedServiceId(null);
  };

  const handleDropItem = (
    itemId: number,
    itemType: string,
    targetId: number
  ) => {
    // Implement your logic to handle the dropped item here
    console.log(
      `Item ${itemType} with ID ${itemId} dropped on target with ID ${targetId}`
    );
  };

  return (
    <div className={classes["windows"]}>
      <div className={classes["window__header"]}>
        <p>Выберите услугу</p>
        <div>
          <IconButton
            disabled={selectedCategoryId === null}
            sx={{
              color: "white",
              backgroundColor: "var(--primary-main)",
              borderRadius: "10%",
              padding: "0.5rem",
              boxShadow: "None",
              marginRight: "1rem",
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
              disabled={
                selectedCategoryId?.level == "section" ||
                selectedCategoryId?.level == "service_type" ||
                selectedCategoryId?.level == "group" ||
                selectedCategoryId?.level == "category" ||
                selectedCategoryId?.level == "subcategory"
              }
              onClick={() => handleAddHierarchy("section")}
            >
              <ListItemIcon>{levelsIcon["section"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Секция
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={
                selectedCategoryId?.level == "service_type" ||
                selectedCategoryId?.level == "group" ||
                selectedCategoryId?.level == "category" ||
                selectedCategoryId?.level == "subcategory"
              }
              onClick={() => handleAddHierarchy("service_type")}
            >
              <ListItemIcon>{levelsIcon["service_type"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Тип
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={
                selectedCategoryId?.level == "group" ||
                selectedCategoryId?.level == "category" ||
                selectedCategoryId?.level == "subcategory"
              }
              onClick={() => handleAddHierarchy("group")}
            >
              <ListItemIcon>{levelsIcon["group"]}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
                Группа
              </ListItemText>
            </MenuItem>
            <MenuItem
              disabled={
                selectedCategoryId?.level == "category" ||
                selectedCategoryId?.level == "subcategory"
              }
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
                Услуга
              </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Divider />
      <div className={classes["window__content"]}>
        {categories.map((category) => (
          <TreeItem
            key={category.id}
            category={category}
            selectedServiceId={selectedServiceId}
            selectedCategoryId={selectedCategoryId}
            searchResults={searchResults}
            onSelectCategory={handleSelectCategory}
            onSelectService={handleSelectService}
            onDropItem={handleDropItem}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
