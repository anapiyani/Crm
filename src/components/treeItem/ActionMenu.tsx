import React, { FC, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, Delete, Edit, ExpandMore, Man } from "@mui/icons-material";
import { ActionMenuProps } from "./types";
import { levelsIcon } from "./constants";

export const ActionMenu: FC<ActionMenuProps> = ({
  selectedCategoryId,
  onAddHierarchy,
  onAddService,
  onEditCategory,
  onAddRole,
  onDeleteCategory,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddHierarchy = (levelName: string) => {
    onAddHierarchy(levelName);
    handleClose();
  };

  return (
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
        onClick={handleClick}
      >
        <Add fontSize="large" />
        <ExpandMore />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          disabled={
            !["department", "section"].includes(selectedCategoryId?.level || "")
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
            !["department", "section", "service_type"].includes(
              selectedCategoryId?.level || ""
            )
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
            !["department", "section", "service_type", "group"].includes(
              selectedCategoryId?.level || ""
            )
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
            ![
              "department",
              "section",
              "service_type",
              "group",
              "category",
            ].includes(selectedCategoryId?.level || "")
          }
          onClick={() => handleAddHierarchy("category")}
        >
          <ListItemIcon>{levelsIcon["category"]}</ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
            Категория
          </ListItemText>
        </MenuItem>
        <MenuItem
          disabled={selectedCategoryId?.level === "subcategory"}
          onClick={() => handleAddHierarchy("subcategory")}
        >
          <ListItemIcon>{levelsIcon["subcategory"]}</ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
            Подкатегория
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={onAddService}>
          <ListItemIcon>{levelsIcon["service"]}</ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "1.6rem" }}>
            Услуга
          </ListItemText>
        </MenuItem>
      </Menu>
      {selectedCategoryId?.level !== "department" && (
        <>
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
            onClick={onEditCategory}
          >
            <Edit fontSize="large" />
          </IconButton>
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
            onClick={onAddRole}
          >
            <Man fontSize="large" />
          </IconButton>
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
            onClick={onDeleteCategory}
          >
            <Delete fontSize="large" />
          </IconButton>
        </>
      )}
    </div>
  );
};
