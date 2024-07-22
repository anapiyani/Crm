import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./style.module.scss";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import {
  HomeOutlined,
  CalendarMonth,
  ImportExport,
  MenuBook,
  LocalActivity,
  CreditCard,
  Payments,
} from "@mui/icons-material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

const CashDesk = () => {
  const tabsData = [
    { to: "/cashdesk/", icon: HomeOutlined, label: "Обзор" },
    { to: "/cashdesk", icon: CalendarMonth, label: "Посещения" },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={classes.main}>
      <BreadcrumbsCustom />
      <div className={classes.main__header}>
        <h1>Виртуальная касса за текущий день</h1>
        <ResponsiveTabs
          tabsData={tabsData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      {activeTab === 0 ? (
        <div className={classes.main__day}>
          <div className={classes.main__day__info}>
            <div className={classes.main__day__info__buttons}>
              <Button variant="contained">Выплатить зарплату</Button>
              <Button
                startIcon={<SouthIcon />}
                variant="outlined"
                color="success"
              >
                Внести деньги
              </Button>
              <Button
                startIcon={<NorthIcon />}
                variant="outlined"
                color="error"
              >
                Снять деньги
              </Button>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <SouthIcon /> Внесено за сегодня
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 25 000 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />
                  25 000 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <NorthIcon
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за сегодня
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 0 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />0 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <ImportExport
                    style={{ backgroundColor: "#E3EFFB", color: "#0B6BCB" }}
                  />{" "}
                  Снято за сегодня
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 25 000 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />
                  25 000 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.main__day}>
          <div className={classes.main__day__info}>
            <div className={classes.main__day__info__period}>
              <h2>Укажите период</h2>
              <p>Будут показаны данные за выбранный период.</p>
              <div style={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="11.07.2024"
                  style={{ width: "42%" }}
                />
                <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="11.07.2024"
                  style={{ width: "41%" }}
                />
              </div>
              <Button variant="contained">Показать</Button>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <SouthIcon /> Внесено за период
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 25 000 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />
                  25 000 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <NorthIcon
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за период
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 0 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />0 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <ImportExport
                    style={{ backgroundColor: "#E3EFFB", color: "#0B6BCB" }}
                  />{" "}
                  Итого за период
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <PublicIcon /> 25 000 руб.
                </p>
                <p>
                  <Payments />0 руб.
                </p>
                <p>
                  <CreditCard />
                  25 000 руб.
                </p>
                <p>
                  <LocalActivity />0 руб.
                </p>
                <p>
                  <MenuBook />0 руб.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashDesk;
