import { Link } from "react-router-dom";
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
import { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import classes from "./style.module.scss";
import NiceModal from "@ebay/nice-modal-react";
import salaryModal from "@/modals/cash-desk/salary.modal";
import withdrawModal from "@/modals/cash-desk/withdraw.modal";
import endureModal from "@/modals/cash-desk/endure.modal";
import CashCard from "../_components/cash-card/cash-card";
import {
  getCashRegister,
  getOperations,
  searchKassaData,
} from "@/service/kassa/kassa.service";
import { useQuery } from "@tanstack/react-query";
import {
  ICashRegister,
  IKassaOperations,
  ISearchKassa,
  ISearchKassaResponse,
} from "@/ts/kassa.interface";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "path";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const CashDesk = () => {
  const { data: operationsData } = useQuery({
    queryKey: ["kassaService"],
    queryFn: () => getOperations(),
  });

  const tabsData = [
    { to: "/cashdesk/", icon: HomeOutlined, label: "Обзор" },
    { to: "/cashdesk", icon: CalendarMonth, label: "Посещения" },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [today, setToday] = useState(true);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { register, handleSubmit, reset } = useForm<ISearchKassa>();
  const [money_type, setMoney_type] = useState<string[]>([]);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(
    null
  );
  const [searchResult, setSearchResult] = useState<ISearchKassaResponse | null>(
    null
  );

  const onSearchSubmit: SubmitHandler<ISearchKassa> = async (
    data: ISearchKassa
  ) => {
    const formData = {
      ...data,
      operation_type: Number(selectedOperationId),
      money_type: money_type,
    };
    const result = await searchKassaData(formData);
    setSearchResult(result);
  };
  const cashRegister: ICashRegister = {
    from_date: fromDate,
    to_date: toDate,
    today: today,
  };

  const {
    data: cashRegisterData,
    isPending: cashRegisterLoading,
    refetch: refetchCashRegister,
  } = useQuery({
    queryKey: ["cashregister"],
    queryFn: () => getCashRegister(cashRegister),
  });

  useEffect(() => {
    refetchCashRegister();
  }, [activeTab]);

  const onRefetchCashRegister = async () => {
    await setToday(false);
    refetchCashRegister();
  };

  const processOperationsData = (
    operations: IKassaOperations[]
  ): { label: string; value: string; isParent: boolean }[] => {
    const result: { label: string; value: string; isParent: boolean }[] = [];

    const traverse = (
      nodes: IKassaOperations[],
      parent: IKassaOperations | null
    ) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          result.push({
            label: node.name,
            value: node.id.toString(),
            isParent: true,
          });
          traverse(node.children, node);
        } else {
          result.push({
            label: node.name,
            value: node.id.toString(),
            isParent: false,
          });
        }
      });
    };

    traverse(operations, null);
    return result;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setMoney_type((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const options = operationsData ? processOperationsData(operationsData) : [];

  const handleSalaryModal = () => {
    NiceModal.show(salaryModal);
  };

  const handleWithdrawModal = () => {
    NiceModal.show(withdrawModal, { refetchCashRegister });
  };

  const handleEndureModal = () => {
    NiceModal.show(endureModal, { refetchCashRegister });
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (index === 0) {
      setToday(true);
    }
  };

  const handleShowClick = async () => {
    await refetchCashRegister();
  };

  if (cashRegisterLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

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
              <Button onClick={handleSalaryModal} variant="contained">
                Выплатить зарплату
              </Button>
              <Button
                onClick={handleEndureModal}
                startIcon={<South />}
                variant="outlined"
                color="success"
              >
                Внести деньги
              </Button>
              <Button
                onClick={handleWithdrawModal}
                startIcon={<North />}
                variant="outlined"
                color="error"
              >
                Снять деньги
              </Button>
            </div>
            <CashCard
              header={
                <>
                  <South /> Внесено за сегодня
                </>
              }
              content={[
                { icon: <Public />, text: cashRegisterData?.income_cash_money },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.income_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.income_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.income_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_cash_money,
                },
              ]}
            />
            <CashCard
              header={
                <>
                  <North
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за сегодня
                </>
              }
              content={[
                {
                  icon: <Public />,
                  text: cashRegisterData?.expense_cash_money,
                },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.expense_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.expense_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.expense_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_card_money,
                },
              ]}
            />
            <CashCard
              header={
                <>
                  <ImportExport
                    style={{ backgroundColor: "#E3EFFB", color: "#0B6BCB" }}
                  />
                  Итого за сегодня
                </>
              }
              content={[
                {
                  icon: <Public />,
                  text: cashRegisterData?.overall_cash_money,
                },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.overall_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.overall_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.overall_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_card_money,
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className={classes.main__day}>
          <div className={classes.main__day__info}>
            <div className={classes.main__day__info__period}>
              <h2>Укажите период</h2>
              <p>Будут показаны данные за выбранный период.</p>
              <div style={{ display: "flex", width: "90%" }}>
                <CustomDatePicker
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFromDate(e.target.value)
                  }
                />
                <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
                <CustomDatePicker
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setToDate(e.target.value)
                  }
                />
              </div>
              <Button onClick={onRefetchCashRegister} variant="contained">
                Показать
              </Button>
            </div>
            <CashCard
              header={
                <>
                  <South /> Внесено за период
                </>
              }
              content={[
                { icon: <Public />, text: cashRegisterData?.income_cash_money },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.income_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.income_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.income_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_cash_money,
                },
              ]}
            />
            <CashCard
              header={
                <>
                  <North
                    style={{ backgroundColor: "#FCE4E4", color: "#C41C1C" }}
                  />{" "}
                  Снято за период
                </>
              }
              content={[
                {
                  icon: <Public />,
                  text: cashRegisterData?.expense_cash_money,
                },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.expense_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.expense_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.expense_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_card_money,
                },
              ]}
            />
            <CashCard
              header={
                <>
                  <ImportExport
                    style={{ backgroundColor: "#E3EFFB", color: "#0B6BCB" }}
                  />{" "}
                  Итого за период
                </>
              }
              content={[
                {
                  icon: <Public />,
                  text: cashRegisterData?.overall_cash_money,
                },
                {
                  icon: <Payments />,
                  text: cashRegisterData?.overall_check_money,
                },
                {
                  icon: <CreditCard />,
                  text: cashRegisterData?.overall_card_money,
                },
                {
                  icon: <LocalActivity />,
                  text: cashRegisterData?.overall_checking_account_money,
                },
                {
                  icon: <MenuBook />,
                  text: cashRegisterData?.overall_card_money,
                },
              ]}
            />
          </div>
        </div>
      )}
      <div className={classes.main__searchForm}>
        <div className={classes.main__searchForm__header}>
          <h2>Поиск по кассе</h2>
          <Divider />
        </div>
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className={classes.main__searchForm__body}
        >
          <div className={classes.main__searchForm__body__items}>
            <h3>Способ оплаты</h3>
            <div className={classes.main__searchForm__body__items__methods}>
              <input
                type="checkbox"
                value="cash"
                onChange={handleCheckboxChange}
              />
              <span className={classes["tree__label"]}>Оплата наличными</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input
                type="checkbox"
                value="card"
                onChange={handleCheckboxChange}
              />
              <span className={classes["tree__label"]}>Оплата по карте</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input
                type="checkbox"
                value="check"
                onChange={handleCheckboxChange}
              />
              <span className={classes["tree__label"]}>Оплата чеками</span>
            </div>
            <div className={classes.main__searchForm__body__items__methods}>
              <input
                type="checkbox"
                value="checking_account"
                onChange={handleCheckboxChange}
              />
              <span className={classes["tree__label"]}>С расчетного счета</span>
            </div>
          </div>
          <div className={classes.main__searchForm__body__items}>
            <h3>Дата операции</h3>
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="01.01.2024"
                style={{ width: "42%" }}
                {...register("from_date")}
              />
              <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Заканчивая"
                style={{ width: "41%" }}
                {...register("to_date")}
              />
            </div>
            <Autocomplete
              sx={{ width: 330 }}
              options={options}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => {
                setSelectedOperationId(value ? value.value : null);
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.value}
                  style={{ pointerEvents: option.isParent ? "none" : "auto" }}
                >
                  <p
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: option.isParent ? "bold" : "normal",
                      marginLeft: option.isParent ? "0" : "1rem",
                    }}
                  >
                    {option.label}
                  </p>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Выберите операцию"}
                  variant="outlined"
                />
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
                  {...register("from_amount")}
                />
                <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>-</p>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="До, руб."
                  style={{ width: "41%" }}
                  {...register("to_amount")}
                />
              </div>
            </div>
          </div>
          <div className={classes.main__searchForm__body__items}>
            <h3>Сумма</h3>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <Button onClick={() => reset()} variant="outlined">
                  Сбросить
                </Button>
                <Button
                  onClick={handleShowClick}
                  type="submit"
                  variant="contained"
                >
                  Поиск
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {searchResult ? (
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
                {searchResult?.results.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link to="/" className={classes.name_link}>
                        {result.operation_name} №{result.id} <br />{" "}
                        {dayjs(result.operation_date).format("DD.MM.YYYY")}
                      </Link>
                    </TableCell>
                    <TableCell>По умолчанию</TableCell>
                    <TableCell>
                      <p className={classes.money}>{result.amount} руб.</p>
                    </TableCell>
                    <TableCell>
                      {result.overall_change_in_cash_register?.card !==
                        "0.00" && (
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {result.overall_change_in_cash_register.card} руб.
                          <CreditCard />
                        </p>
                      )}
                      {result.overall_change_in_cash_register?.cash !==
                        "0.00" && (
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {result.overall_change_in_cash_register.cash} руб.{" "}
                          <Public />
                        </p>
                      )}
                      {result.overall_change_in_cash_register?.check !==
                        "0.00" && (
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {result.overall_change_in_cash_register.check} руб.{" "}
                          <LocalActivity />
                        </p>
                      )}
                      {result.overall_change_in_cash_register
                        ?.checking_account !== "0.00" && (
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {
                            result.overall_change_in_cash_register
                              .checking_account
                          }
                          руб. <MenuBook />
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{result.change}</TableCell>
                    <TableCell>{result.deposit} </TableCell>
                    <TableCell>
                      {" "}
                      {result.customer ? (
                        <Link to="/" className={classes.name_link}>
                          {result.customer_name}
                        </Link>
                      ) : (
                        <p>Нет данных</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.employee ? (
                        <Link
                          to={"/employees/" + result.employee}
                          className={classes.name_link}
                        >
                          {result.employee_name}
                        </Link>
                      ) : (
                        <p>Нет данных</p>
                      )}
                    </TableCell>
                    <TableCell>{result.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes["main__cashDesk__lower__container"]}>
              <div className={classes["main__cashDesk__lower__container__row"]}>
                <p
                  className={classes["main__cashDesk__lower__container__label"]}
                >
                  Показано {searchResult?.results.length} из{" "}
                  {searchResult?.count} записей
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
      ) : (
        ""
      )}
    </div>
  );
};

export default CashDesk;
