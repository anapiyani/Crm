import { Link } from "react-router-dom";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import CustomTextField from "@/components/textField/textField.component";
import {
  HomeOutlined,
  CalendarMonth,
  ImportExport,
  MenuBook,
  LocalActivity,
  CreditCard,
  Payments,
  Public,
  South,
  North,
} from "@mui/icons-material";
import { useState } from "react";
import {
  Autocomplete,
  Button,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import classes from "./style.module.scss";

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
          currentTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      {activeTab === 0 ? (
        <div className={classes.main__day}>
          <div className={classes.main__day__info}>
            <div className={classes.main__day__info__buttons}>
              <Button variant="contained">Выплатить зарплату</Button>
              <Button startIcon={<South />} variant="outlined" color="success">
                Внести деньги
              </Button>
              <Button startIcon={<North />} variant="outlined" color="error">
                Снять деньги
              </Button>
            </div>
            <div className={classes.main__day__info__infoBox}>
              <div className={classes.main__day__info__infoBox__header}>
                <p>
                  <South /> Внесено за сегодня
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <Public /> 25 000 руб.
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
                  <North
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за сегодня
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <Public /> 0 руб.
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
                  <Public /> 25 000 руб.
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
                  <South /> Внесено за период
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <Public /> 25 000 руб.
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
                  <North
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за период
                </p>
              </div>
              <div className={classes.main__day__info__infoBox__content}>
                <p>
                  <Public /> 0 руб.
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
                  <Public /> 25 000 руб.
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
      <div className={classes.main__searchForm}>
        <div className={classes.main__searchForm__header}>
          <h2>Поиск по кассе</h2>
          <Divider />
        </div>
        <div className={classes.main__searchForm__body}>
          <div className={classes.main__searchForm__body__items}>
            <h3>Способ оплаты</h3>
            <div className={classes.main__searchForm__body__items__methods}>
              <input type="checkbox" />
              <span className={classes["tree__label"]}>Оплата наличными</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input type="checkbox" />
              <span className={classes["tree__label"]}>Оплата по карте</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input type="checkbox" />
              <span className={classes["tree__label"]}>Оплата чеками</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input type="checkbox" />
              <span className={classes["tree__label"]}>С расчетного счета</span>
            </div>
          </div>
          <div className={classes.main__searchForm__body__items}>
            <h3>Дата операции</h3>
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Начиная с"
                style={{ width: "42%" }}
              />
              <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Заканчивая"
                style={{ width: "41%" }}
              />
            </div>
            <Autocomplete
              sx={{ width: 330 }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
                { label: "Option 4", value: "4" },
                { label: "Option 5", value: "5" },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <CustomTextField {...params} label={"Выберите опцию"} />
              )}
            />
          </div>
          <div className={classes.main__searchForm__body__items}>
            <h3>Сумма</h3>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="От, руб."
                  style={{ width: "42%" }}
                />
                <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="До, руб."
                  style={{ width: "41%" }}
                />
              </div>
            </div>
          </div>
          <div className={classes.main__searchForm__body__items}>
            <h3>Сумма</h3>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <Button variant="outlined">Сбросить</Button>
                <Button variant="contained">Поиск</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main__cashDesk}>
        <div className={classes.main__cashDesk__header}>
          <h2>Касса</h2>
          <Divider />
        </div>
        <div className={classes["main__cashDesk__lower"]}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Операция</TableCell>
                <TableCell>Касса</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Оплачено</TableCell>
                <TableCell>Сдача</TableCell>
                <TableCell>Депозит</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Сотрудник</TableCell>
                <TableCell>Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <Link to="/" className={classes.name_link}>
                    Посещение №721 <br /> 11.07.2024 12:00
                  </Link>
                </TableCell>
                <TableCell>По умолчанию</TableCell>
                <TableCell>
                  <p className={classes.money}>25 000 руб.</p>
                </TableCell>
                <TableCell>25 000 руб.</TableCell>
                <TableCell>0 руб.</TableCell>
                <TableCell>0 руб.</TableCell>
                <TableCell>
                  {" "}
                  <Link to="/" className={classes.name_link}>
                    {" "}
                    Иванов Иван Иванович{" "}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to="/" className={classes.name_link}>
                    {" "}
                    Иванов Иван Иванович{" "}
                  </Link>
                </TableCell>
                <TableCell>Комментарий</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className={classes["main__cashDesk__lower__container"]}>
            <div className={classes["main__cashDesk__lower__container__row"]}>
              <p className={classes["main__cashDesk__lower__container__label"]}>
                Показано 2 из 2 записей
              </p>
              <div>
                <div className={classes["tableSettings"]}>
                  Показывать
                  <select name="pageSize" id="pageSize">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  записей
                </div>
              </div>
              <Pagination
                count={2}
                page={1}
                variant="outlined"
                shape="rounded"
                boundaryCount={1}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashDesk;
