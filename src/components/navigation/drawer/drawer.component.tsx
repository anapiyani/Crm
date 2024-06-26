import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

import classes from "./styles.module.scss";
import logo from "@/assets/icons/icon_wise_white.svg";
import {
  Home,
  AttachMoney,
  Notifications,
  Groups,
  Person,
  ContentCut,
  Inventory2,
  ShoppingCart,
  CreditCard,
  Mail,
  Description,
  Settings,
  Info,
  Store,
} from "@mui/icons-material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const drawerWidth = "25.6rem";

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const [open, setOpen] = React.useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<string | null>(null);

  const handleClick = (text: string, index: number) => {
    setOpen(open === text ? null : text);
    setSelectedIndex(`${index}`);
  };

  const handleChildClick = (parentIndex: number, childIndex: number) => {
    setSelectedIndex(`${parentIndex}-${childIndex}`);
  };

  const items = [
    { text: "Рабочий стол", icon: <Home /> },
    { text: "Касса", icon: <AttachMoney /> },
    { text: "Активности", icon: <Notifications /> },
    { text: "Клиенты", icon: <Groups /> },
    {
      text: "Сотрудники",
      icon: <Person />,
      children: [
        { text: "Найти" },
        { text: "Добавить" },
        { text: "График работы" },
        { text: "Зарплата" },
        { text: "Отделы" },
        { text: "Кабинеты" },
        { text: "Права доступа" },
        { text: "Посещаемость" },
        { text: "Рейтинг" },
      ],
    },
    { text: "Услуги", icon: <ContentCut /> },
    { text: "Склад", icon: <Inventory2 /> },
    { text: "Поставщики", icon: <ShoppingCart /> },
    { text: "Карты и скидки", icon: <CreditCard /> },
    { text: "Рассылка", icon: <Mail /> },
    { text: "Отчеты", icon: <Description /> },
    { text: "Настройки", icon: <Settings /> },
    { text: "Поддержка", icon: <Info /> },
    { text: "Маркет", icon: <Store /> },
  ];

  const LogoContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem 0 1rem 2rem",
    flexDirection: "row",
    marginTop: "1.2rem",
  });

  const LogoImage = styled("img")({
    height: "3.6rem",
  });

  const IconContainer = styled(ListItemIcon)({
    height: "2.4rem",
    width: "5.6rem",
    minWidth: "auto",
    color: "#C7DFF7",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& svg": {
      fontSize: "2.4rem",
    },
  });

  const StyledDrawerPaper = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      backgroundColor: "#0a2744",
      overflowY: "auto",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For Internet Explorer and Edge
      "&::-webkit-scrollbar": {
        display: "none", // For Chrome, Safari, and Opera
      },
    },
  }));

  const renderListItems = (items: any[], parentIndex: number | null = null) => {
    return items.map((item, index) => {
      const uniqueIndex =
        parentIndex !== null ? `${parentIndex}-${index}` : `${index}`;

      return (
        <React.Fragment key={uniqueIndex}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === uniqueIndex}
              onClick={() =>
                parentIndex === null
                  ? handleClick(item.text, index)
                  : handleChildClick(parentIndex, index)
              }
              sx={{
                transition: "background-color 0.5s ease, color 0.5s ease",
                "&.Mui-selected": {
                  backgroundColor: "#0B6BCB",
                  borderRadius: "4px",
                  color: "#97C3F0",
                  transition: "background-color 0.5s ease",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "#0B6BCB", // Ensure the background color remains the same on hover
                  },
                },
                color: "#97C3F0",
                
              }}
            >
              {parentIndex === null && (
                <IconContainer>{item.icon}</IconContainer>
              )}
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: "common.white",
                  fontWeight: "400",
                  variant: "body1",
                  fontSize: "1.6rem",
                  padding: "0.4rem 0 0.4rem 0",
                }}
              />
              {item.children && parentIndex === null ? (
                open === item.text ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>
          </ListItem>
          {item.children ? (
            <Collapse in={open === item.text} timeout={1000} unmountOnExit>
              <List component="div" disablePadding>
                {renderListItems(item.children, index)}
              </List>
            </Collapse>
          ) : null}
        </React.Fragment>
      );
    });
  };

  const drawer = (
    <div>
      <LogoContainer>
        <LogoImage src={logo} alt="SuperWise" />
      </LogoContainer>
      <List sx={{ padding: "0.8rem" }}>{renderListItems(items)}</List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}/10rem)` },
          ml: { sm: `${drawerWidth}/10rem` },
        }}
      ></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <StyledDrawerPaper
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </StyledDrawerPaper>
        <StyledDrawerPaper
          className={classes["sidebar"]}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#0a2744",
            },
          }}
          open
        >
          {drawer}
        </StyledDrawerPaper>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: "0.3rem",
          width: { sm: `calc(100% - ${drawerWidth}/10rem)` },
        }}
      ></Box>
    </Box>
  );
}
