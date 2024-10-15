import {
  Box,
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
import { NavLink, useLocation } from "react-router-dom";
import { CSSProperties } from "react";

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
};

type BaseItem = {
  text: string;
  icon?: ReactNode;
  link: string;
};

type Item = BaseItem & {
  children?: BaseItem[];
};

const StyledBox = styled(Box)(({ isMinimized }: { isMinimized: boolean }) => ({
  width: isMinimized ? "6rem" : "28.6rem",
  backgroundColor: "#0B6BCB",
  padding: isMinimized ? "0.5rem" : "1rem",
  height: "100vh",
  overflowY: "auto",
  transition: "width 0.3s",
}));

const StyledIconButton = styled(IconButton)({
  color: "#fff",
});

const StyledListItemButton = styled(ListItemButton)(
  ({ isMinimized }: { isMinimized: boolean }) => ({
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
    paddingLeft: isMinimized ? "1.6rem" : "1rem",
  })
);

const StyledListItemText = styled(ListItemText)({
  color: "#fff",
  marginLeft: "3.2rem",
  "& span": {
    fontSize: "1.6rem !important",
  },
});

const StyledIconContainer = styled(ListItemIcon)({
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

const navLinkStyles: CSSProperties = {
  textDecoration: "none",
  display: "flex",
  width: "100%",
};

const boxStyles = (isMinimized: boolean): CSSProperties => ({
  display: "flex",
  justifyContent: isMinimized ? "center" : "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  padding: isMinimized ? "0" : "0 0 0 1rem",
});

const drawerTitleStyles: CSSProperties = {
  color: "#fff",
  fontSize: "2.4rem",
};

const ReportsDrawer = (props: IProps) => {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const items = [
    {
      text: "Поиск отчетов",
      icon: <SearchOutlined />,
      link: "/analytics/reports/search",
    },
    {
      text: "Все отчеты",
      icon: <Topic />,
      link: "/analytics/reports/all-reports",
    },
    {
      text: "Клиенты",
      icon: <Groups />,
      link: "/analytics/reports/clients",
    },
    {
      text: "Общие отчеты",
      icon: <InsertDriveFile />,
      link: "/analytics/reports/general-reports",
    },
    {
      text: "Склад",
      icon: <Inventory2 />,
      link: "/analytics/reports/inventory",
    },
    {
      text: "Сотрудники, зарплата",
      icon: <Person />,
      link: "/analytics/reports/employees",
    },
    {
      text: "Услуги",
      icon: <ContentCut />,
      link: "/analytics/reports/services",
    },
    {
      text: "Финансы",
      icon: <Payments />,
      link: "/analytics/reports/finance",
    },
  ];

  const renderListItems = (items: Item[]) => {
    return items.map((item, index) => (
      <Fragment key={index}>
        <ListItem disablePadding>
          <NavLink to={item.link} style={navLinkStyles}>
            <StyledListItemButton
              selected={location.pathname === item.link}
              isMinimized={isMinimized}
            >
              <StyledIconContainer>{item.icon}</StyledIconContainer>
              {!isMinimized && <StyledListItemText primary={item.text} />}
            </StyledListItemButton>
          </NavLink>
        </ListItem>
      </Fragment>
    ));
  };

  return (
    <StyledBox isMinimized={isMinimized}>
      <Box style={boxStyles(isMinimized)}>
        {!isMinimized && <p style={drawerTitleStyles}>Отчеты</p>}
        <StyledIconButton onClick={toggleMinimized}>
          {isMinimized ? (
            <MenuOutlined sx={{ fontSize: "3.2rem" }} />
          ) : (
            <FirstPageOutlined sx={{ fontSize: "2.4rem" }} />
          )}
        </StyledIconButton>
      </Box>
      <List>{renderListItems(items)}</List>
    </StyledBox>
  );
};

export default ReportsDrawer;
