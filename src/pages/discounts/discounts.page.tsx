import CounterCard from "@/components/counter-card/counter-card";
import {
  CalendarMonthOutlined,
  Star,
  Groups,
  PlayArrow,
  BarChart,
  PaymentsOutlined,
  Check,
  Person,
  ShoppingCart,
  Add,
} from "@mui/icons-material";
import { Grid, Button, Box, Divider } from "@mui/material";
import { useState } from "react";
import RevenueChart from "../employees/employee-card/components/chart";
import classes from "./styles.module.scss";
import { useParams } from "react-router-dom";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { Controller, useForm } from "react-hook-form";
import DiscountsTable from "./_components/discountsTable/discounts-table";
import DiscountsChart from "./_components/charts/chart1/chart-discounts";
import DualYAxisChart from "./_components/charts/charts2/chart-doubleAxis";
import NiceModal from "@ebay/nice-modal-react";
import DiscountModal from "@/modals/discounts/discountProgram.modal";

// Import the required localization components
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Or another adapter like AdapterDateFns, etc.

interface IDiscountsInfo {
  nomination: string;
}

const discountsTabsData = [
  { to: "/employees/:id", icon: Groups, label: "Скидки для категорий" },
  {
    to: "/employees/visits",
    icon: Check,
    label: "Выданные скидки для категорий",
  },
  {
    to: "/employees/balance",
    icon: Person,
    label: "Персональные скидки",
  },
  {
    to: "/employees/work-schedule",
    icon: ShoppingCart,
    label: "Разовые скидки",
  },
];

const data = [
  {
    id: 1,
    recipient: "Имя Фамилия",
    status: "Активна",
    discount: 10,
    createdBy: "Имя Фамилия",
    createdDate: "Сегодня, 11:27",
    actions: ["Изменить", "Удалить"],
  },
  {
    id: 2,
    recipient: "Имя Фамилия",
    status: "Активна",
    discount: 0,
    createdBy: "Имя Фамилия",
    createdDate: "Сегодня, 11:27",
    actions: ["Изменить", "Удалить"],
  },
];

const graphData = [
  { month: "Июнь", discounts: 10, visits: 15, activeDiscounts: 12 },
  { month: "Июль", discounts: 20, visits: 25, activeDiscounts: 22 },
  { month: "Август", discounts: 30, visits: 35, activeDiscounts: 32 },
  { month: "Сентябрь", discounts: 45, visits: 50, activeDiscounts: 47 },
];

const graphPercentageData = [
  { month: "Июнь", discounts: 20, visits: 30, activeDiscounts: 25 },
  { month: "Июль", discounts: 40, visits: 56, activeDiscounts: 29 },
  { month: "Август", discounts: 60, visits: 89, activeDiscounts: 65 },
  { month: "Сентябрь", discounts: 80, visits: 99, activeDiscounts: 93 },
];

const DiscountPage = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { register, handleSubmit, reset, control, setValue } =
    useForm<IDiscountsInfo>();

  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };
  const params = useParams<{ id: string }>();

  // Handler to open and close the modal
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const renderContentHeader = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem", alignItems: "center" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"#F7C5C5"}
                icon={<Star />}
                iconColor="#C41C1C"
                textTitle="Скидки для категорий"
                valueText={"0 шт."}
              />
              <CounterCard
                backgroundColor={"#D1C4E9"}
                icon={<Groups />}
                iconColor="#673AB7"
                textTitle="Посещения по скидкам"
                valueText={"0 шт."}
              />

              <CounterCard
                backgroundColor={"#FFCCBC"}
                icon={<PlayArrow />}
                iconColor="#FF5722"
                textTitle="Активные скидки для категорий"
                valueText="0 шт."
              />
            </div>
            <DiscountsChart data={graphData} />
          </Grid>
        );
      case 1:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            {/* Add your other cases here */}
          </Grid>
        );
    }
  };

  const renderContentMain = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid
            container
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
            }}
            xs={9}
            md={10.5}
          >
            <div className={classes.main__discountsSection}>
              <div className={classes.main__discountsSection__header}>
                <div className={classes.main__discountsSection__header__box}>
                  <p
                    className={
                      classes.main__discountsSection__header__box__title
                    }
                  >
                    Скидки для категорий
                  </p>
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<Add />}
                    className="add-button"
                    sx={{
                      textTransform: "none",
                      padding: 0,
                      fontSize: "1.4rem",
                    }}
                    onClick={handleOpenModal}  // Change this line to use `handleOpenModal`
                  >
                    Добавить
                  </Button>
                </div>

                <Divider />
              </div>

              <p className={classes.main__discountsSection__info}>
                Нет скидочных программ
              </p>
            </div>
          </Grid>
        );
      case 1:
        return (
          <Grid
            container
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
            }}
            xs={9}
            md={10.5}
          >
            <div className={classes.main__discountsSection}>
              <div className={classes.main__discountsSection__header}>
                <div className={classes.main__discountsSection__header__box}>
                  <p
                    className={
                      classes.main__discountsSection__header__box__title
                    }
                  >
                    Выданные скидки
                  </p>
                </div>

                <Divider />
              </div>

              <p className={classes.main__discountsSection__info}>
                Ничего не найдено{" "}
              </p>
            </div>
          </Grid>
        );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes["main"]}>
        <div className={classes["main__header"]}>
          <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
            <div className={classes["main__header__upper"]}>
              <div>
                <BreadcrumbsCustom />
                <h1 className={classes["main__header__upper__title"]}>
                  Yesset Yedres
                </h1>
              </div>
              <ResponsiveTabs
                tabsData={discountsTabsData}
                onTabChange={handleTabChange}
                currentTab={currentTab}
              />
              <div className={classes["main__header__upper__row"]}>
                {renderContentHeader()}
              </div>
            </div>
          </Box>
        </div>
        {renderContentMain()}
        
        {/* Add the DiscountModal here */}
        <DiscountModal open={isModalOpen} onClose={handleCloseModal} />
      </div>
    </LocalizationProvider>
  );
};

export default DiscountPage;
