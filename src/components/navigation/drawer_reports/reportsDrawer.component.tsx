import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Fragment, ReactNode, useState } from "react";
import {
  Inventory2,
  FirstPageOutlined,
  MenuOutlined,
  SearchOutlined,
  InsertDriveFile,
  Topic,
  Groups,
  Person,
  ContentCut,
  Payments,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import classes from "./styles.module.scss";

const expandedWidth = "28.6rem";
const minimizedWidth = "6rem";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface BaseItem {
  text: string;
  icon?: ReactNode;
  link?: string;
}

interface Item extends BaseItem {
  children?: BaseItem[];
}

const IconContainer = styled(ListItemIcon)({
  height: "2.4rem",
  width: "2.4rem",
  minWidth: "auto",
  color: "#FFF",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  "& svg": {
    fontSize: "2.4rem",
  },
});

const ReportsDrawer = (props: IProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleParentClick = (text: string) => {
    setOpen(open === text ? null : text);
  };

  const handleChildClick = (parentIndex: number, childIndex: number) => {
    setSelectedIndex(`${parentIndex}-${childIndex}`);
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const items = [
    {
      text: "Поиск отчетов",
      icon: <SearchOutlined />,
    },
    {
      text: "Все отчеты",
      icon: <Topic />,
    },
    {
      text: "Клиенты",
      icon: <Groups />,
    },
    {
      text: "Общие отчеты",
      icon: <InsertDriveFile />,
    },
    {
      text: "Склад",
      icon: <Inventory2 />,
    },
    {
      text: "Сотрудники, зарплата",
      icon: <Person />,
    },

    {
      text: "Услуги",
      icon: <ContentCut />,
    },
    {
      text: "Финансы",
      icon: <Payments />,
    },
  ];

  const renderListItems = (items: Item[]) => {
    return items.map((item, index) => (
      <Fragment key={index}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === `${index}`}
            onClick={() => handleParentClick(item.text)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#12467B",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#0B6BCB",
                },
              },
              color: "#fff",
              justifyContent: isMinimized ? "center" : "flex-start",
              pl: isMinimized ? "1.6rem" : "1rem",
            }}
          >
            <NavLink
              to={item.link || "#"}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: isMinimized ? "center" : "flex-start",
                width: "100%",
              }}
              className={classes["link"]}
            >
              <IconContainer>{item.icon}</IconContainer>
              {!isMinimized && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "#fff",
                    marginLeft: "3.2rem",
                    "& span": { fontSize: "1.6rem !important" },
                  }}
                />
              )}
            </NavLink>
          </ListItemButton>
        </ListItem>
        {item.children && !isMinimized && (
          <Collapse in={open === item.text} unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child, childIndex) => (
                <ListItemButton
                  key={childIndex}
                  selected={selectedIndex === `${index}-${childIndex}`}
                  onClick={() => handleChildClick(index, childIndex)}
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      backgroundColor: "#12467B",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#0B6BCB",
                      },
                    },
                    color: "#fff",
                  }}
                >
                  <NavLink
                    to={child.link || "#"}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={classes["link"]}
                  >
                    <ListItemText primary={child.text} />
                  </NavLink>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </Fragment>
    ));
  };

  return (
    <Box
      sx={{
        display: props.isOpen ? "block" : "none",
        width: isMinimized ? minimizedWidth : expandedWidth,
        backgroundColor: "#0B6BCB",
        padding: isMinimized ? "0.5rem" : "1rem",
        height: "100vh",
        overflowY: "auto",
        transition: "width 0.3s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isMinimized ? "center" : "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          padding: isMinimized ? "0" : "0 0 0 1rem",
        }}
      >
        {!isMinimized && (
          <p style={{ color: "#fff", fontSize: "2.4rem" }}>Отчеты</p>
        )}
        <IconButton sx={{ color: "#fff" }} onClick={toggleMinimized}>
          {isMinimized ? (
            <MenuOutlined sx={{ fontSize: "3.2rem" }} />
          ) : (
            <FirstPageOutlined sx={{ fontSize: "2.4rem" }} />
          )}
        </IconButton>
      </Box>
      <List>{renderListItems(items)}</List>
    </Box>
  );
};

export default ReportsDrawer;
