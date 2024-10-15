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
import {
  Fragment,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
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
import { NavLink, To, useLocation } from "react-router-dom";
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

const StyledBox = styled(Box)(
  ({
    isMinimized,
    isSecondary,
  }: {
    isMinimized: boolean;
    isSecondary?: boolean;
  }) => ({
    width: isMinimized ? "6rem" : "28.6rem",
    backgroundColor: isSecondary ? "#4393E4" : "#0B6BCB",
    padding: isMinimized ? "0.5rem" : "1rem",
    height: "100vh",
    overflowY: "auto",
    transition: "width 0.2s",
  })
);

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
  const [selectedParent, setSelectedParent] = useState<Item | null>(null);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) setSelectedParent(null);
  };

  const handleParentClick = (item: Item) => {
    if (item.children && item.children.length > 0) {
      setSelectedParent(item);
    } else {
      setSelectedParent(null);
    }
  };

  const items = [
    {
      text: "Поиск отчетов",
      icon: <SearchOutlined />,
      link: "/analytics/reports/search",
      children: [
        {
          text: "Отчет по поисковым запросам",
          link: "/analytics/reports/search/query-report",
        },
        {
          text: "Отчет по аналитике поиска",
          link: "/analytics/reports/search/analytics-report",
        },
      ],
    },
    {
      text: "Все отчеты",
      icon: <Topic />,
      link: "/analytics/reports/all-reports",
      children: [
        {
          text: "Отчет об использовании",
          link: "/analytics/reports/all-reports/usage-report",
        },
        {
          text: "Отчет по загрузке",
          link: "/analytics/reports/all-reports/load-report",
        },
      ],
    },
    {
      text: "Клиенты",
      icon: <Groups />,
      link: "/analytics/reports/clients",
      children: [
        {
          text: "Отчет по активным клиентам",
          link: "/analytics/reports/clients/active-clients-report",
        },
        {
          text: "Отчет по ушедшим клиентам",
          link: "/analytics/reports/clients/lost-clients-report",
        },
      ],
    },

    {
      text: "Общие отчеты",
      icon: <InsertDriveFile />,
      link: "/analytics/reports/general-reports",
      children: [
        {
          text: "Отчет об использовании адм. функций",
          link: "/analytics/reports/general-reports/admin-functions-report",
        },
        {
          text: "Отчет по загрузке кабинетов",
          link: "/analytics/reports/general-reports/cabinets-load-report",
        },
        {
          text: "Отчет по записям",
          link: "/analytics/reports/general-reports/records-report",
        },
        {
          text: "Отчет по оплаченным посещениям",
          link: "/analytics/reports/general-reports/paid-visits-report",
        },
        {
          text: "Полный отчет",
          link: "/analytics/reports/general-reports/full-report",
        },
      ],
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
              onClick={() => handleParentClick(item)}
            >
              <StyledIconContainer>{item.icon}</StyledIconContainer>
              {!isMinimized && <StyledListItemText primary={item.text} />}
            </StyledListItemButton>
          </NavLink>
        </ListItem>
      </Fragment>
    ));
  };

  const renderSecondaryDrawer = () => {
    if (
      !selectedParent ||
      !selectedParent.children ||
      selectedParent.children.length === 0
    ) {
      return null;
    }

    return (
      <StyledBox isMinimized={false} isSecondary={true}>
        <Box style={boxStyles(false)}>
          <p style={drawerTitleStyles}>{selectedParent.text}</p>
        </Box>
        <List>
          {selectedParent.children.map((child, index) => (
            <ListItem key={index} disablePadding>
              <NavLink to={child.link} style={navLinkStyles}>
                <StyledListItemButton
                  selected={location.pathname === child.link}
                  isMinimized={false}
                >
                  <ListItemText primary={child.text} />
                </StyledListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </StyledBox>
    );
  };

  return (
    <Box display="flex">
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

      {!isMinimized || (selectedParent && selectedParent.children)
        ? renderSecondaryDrawer()
        : null}
    </Box>
  );
};

export default ReportsDrawer;
