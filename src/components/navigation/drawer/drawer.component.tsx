import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { List, ListItem, styled } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import GroupsIcon from "@mui/icons-material/Groups";
// import PersonIcon from "@mui/icons-material/Person";
// import ContentCutIcon from "@mui/icons-material/ContentCut";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import MailIcon from "@mui/icons-material/Mail";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SettingsIcon from "@mui/icons-material/Settings";
// import InfoIcon from "@mui/icons-material/Info";
// import StoreIcon from "@mui/icons-material/Store";

const drawerWidth = 256;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
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

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const items = [
    { text: "Рабочий стол", icon: <Home /> },
    { text: "Касса", icon: <AttachMoney /> },
    { text: "Активности", icon: <Notifications /> },
    { text: "Клиенты", icon: <Groups /> },
    { text: "Сотрудники", icon: <Person /> },
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
    minWidth: 'auto',
    color: "#C7DFF7",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& svg': {
      fontSize: "2.4rem",
    }
  });

  const drawer = (
    <div>
      {/* <Toolbar />
      <Divider /> */}

      <LogoContainer>
        <LogoImage src={logo} alt="SuperWise" />
      </LogoContainer>

      <List sx={{padding: "0.8rem",}}>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <IconContainer>
                {item.icon}
              </IconContainer>
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
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
        </Drawer>
        <Drawer
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
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
