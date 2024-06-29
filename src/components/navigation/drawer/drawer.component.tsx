import { Fragment, useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Collapse,
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
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = "25.6rem";

interface Props {
  window?: () => Window;
}
const ResponsiveDrawer = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [selectedParentIndex, setSelectedParentIndex] = useState<string | null>(
    null
  );
  const [selectedChildIndex, setSelectedChildIndex] = useState<string | null>(
    null
  );

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleParentClick = (text: string, index: number) => {
    setOpen(open === text ? null : text);
    setSelectedParentIndex(`${index}`);
    setSelectedChildIndex(null); // Reset child selection when a parent is selected
  };

  const handleChildClick = (parentIndex: number, childIndex: number) => {
    setSelectedParentIndex(`${parentIndex}`);
    setSelectedChildIndex(`${parentIndex}-${childIndex}`);
  };

  const items = [
    { text: "Рабочий стол", icon: <Home />, link: "/" },
    { text: "Касса", icon: <AttachMoney />, link: "/cashdesk" },
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

  const StyledDrawerPaper = styled(Drawer)(() => ({
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      backgroundColor: "#0a2744",
      overflowY: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  }));

  const renderListItems = (items: any[], parentIndex: number | null = null) => {
    return items.map((item, index) => {
      const uniqueIndex =
        parentIndex !== null ? `${parentIndex}-${index}` : `${index}`;

      return (
        <Fragment key={uniqueIndex}>
          <ListItem disablePadding className={classes["aba"]}>
            <ListItemButton
              selected={
                selectedParentIndex === uniqueIndex ||
                selectedChildIndex?.startsWith(uniqueIndex)
              }
              onClick={() =>
                parentIndex === null
                  ? handleParentClick(item.text, index)
                  : handleChildClick(parentIndex, index)
              }
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#0B6BCB",
                  borderRadius: "4px",
                  color: "#97C3F0",
                  width: "100%",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "#0B6BCB",
                  },
                },
                color: "#97C3F0",
                pl: parentIndex !== null ? "7.2rem" : undefined,
                pr: "1.6rem",
                pb: "0.4rem",
                pt: "0.4rem",
                ...(parentIndex !== null &&
                  index === 0 && {
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }),
              }}
            >
              <NavLink
                to={item.link || "#"}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                className={classes.link}
              >
                {parentIndex === null && (
                  <IconContainer>{item.icon}</IconContainer>
                )}
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: "common.white",
                    fontWeight: "400",
                    variant: parentIndex === null ? "body1" : "body2",
                    fontSize: parentIndex === null ? "1.6rem" : "1.4rem",
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
              </NavLink>
            </ListItemButton>
          </ListItem>
          {item.children ? (
            <Collapse in={open === item.text} unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  backgroundColor: "#12467B",
                  borderRadius: "4px",
                }}
              >
                {renderListItems(item.children, index)}
              </List>
            </Collapse>
          ) : null}
        </Fragment>
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        ></StyledDrawerPaper>
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
    </Box>
  );
};

export default ResponsiveDrawer;
