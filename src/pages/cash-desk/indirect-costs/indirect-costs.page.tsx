import { FC, useEffect, useRef, useState } from "react";
import CounterCard from "@/components/counter-card/counter-card";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  deleteCategoryIndirectCosts,
  getIndirectCosts,
  getIndirectCostsSummary,
} from "@/service/kassa/kassa.service";
import {
  Add,
  Edit,
  ExpandLess,
  ExpandMore,
  Check,
  Close,
  DeleteOutline,
  PaymentsOutlined,
  BarChartOutlined,
  FunctionsOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import classes from "./style.module.scss";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import { IIndirectForm } from "@/ts/kassa.interface";
import { AddCategoryModal } from "@/modals";
import NiceModal from "@ebay/nice-modal-react";

const IndirectCostsPage: FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset, getValues } =
    useForm<IIndirectForm>();
  const [defaultDate, setDefaultDate] = useState({
    date_from: dayjs().startOf("month").format("DD.MM.YYYY"),
    date_to: dayjs().endOf("month").format("DD.MM.YYYY"),
  });
  const thisMonth = dayjs().locale("ru").format("MMMM");

  const {
    data: indirectCostsSumarryData,
    isLoading: indirectCostsSummaryLoading,
    isError: indirectCostsSummaryError,
    refetch: refetchIndirectCostsSummary,
  } = useQuery({
    queryKey: ["indirectCostsSummary"],
    queryFn: () => getIndirectCostsSummary(),
  });
  const {
    data: indirectCostsData,
    isLoading: indirectCostsLoading,
    isError: indirectCostsError,
    refetch: refetchIndirectCosts,
  } = useQuery({
    queryKey: ["indirectCosts"],
    queryFn: () => getIndirectCosts(defaultDate),
  });

  const inputRefStart = useRef<HTMLInputElement>(null);
  const inputRefEnd = useRef<HTMLInputElement>(null);

  const [openTables, setOpenTables] = useState<{ [key: string]: boolean }>({});

  const toggleTable = (tableKey: string) => {
    setOpenTables((prevState) => ({
      ...prevState,
      [tableKey]: !prevState[tableKey],
    }));
  };

  useEffect(() => {
    if (defaultDate) {
      refetchIndirectCosts();
    }
  }, [defaultDate]);

  const selectedPeriod = watch("selectedPeriod");

  const handleRadioChange = (value: string) => {
    if (value === "custom") {
      if (inputRefStart.current && inputRefEnd.current) {
        inputRefStart.current.focus();
      }
    } else {
      getValues("startDate") && reset({ startDate: "" });
      getValues("endDate") && reset({ endDate: "" });
    }
  };

  const openAddCategoryModal = () => {
    NiceModal.show(AddCategoryModal);
  };

  const handleSubmitDate = (data: IIndirectForm) => {
    switch (data.selectedPeriod) {
      case "custom": {
        setDefaultDate({
          date_from: dayjs(data.startDate!).format("DD.MM.YYYY"),
          date_to: dayjs(data.endDate!).format("DD.MM.YYYY"),
        });
        refetchIndirectCosts();
        break;
      }
      case "day": {
        setDefaultDate({
          date_from: dayjs().format("DD.MM.YYYY"),
          date_to: dayjs().format("DD.MM.YYYY"),
        });
        refetchIndirectCosts();
        break;
      }
      case "week": {
        setDefaultDate({
          date_from: dayjs().startOf("week").format("DD.MM.YYYY"),
          date_to: dayjs().endOf("week").format("DD.MM.YYYY"),
        });
        refetchIndirectCosts();
        break;
      }
      case "month": {
        setDefaultDate({
          date_from: dayjs().startOf("month").format("DD.MM.YYYY"),
          date_to: dayjs().endOf("month").format("DD.MM.YYYY"),
        });
        refetchIndirectCosts();
        break;
      }
      case "quarter": {
        setDefaultDate({
          date_from: dayjs()
            .subtract(3, "months")
            .startOf("month")
            .format("DD.MM.YYYY"),
          date_to: dayjs().endOf("month").format("DD.MM.YYYY"),
        });
        break;
      }
      case "year": {
        setDefaultDate({
          date_from: dayjs().startOf("year").format("DD.MM.YYYY"),
          date_to: dayjs().endOf("year").format("DD.MM.YYYY"),
        });
        refetchIndirectCosts();
        break;
      }
      default:
        break;
    }
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategoryIndirectCosts(id);
    refetchIndirectCosts();
  };

  const handleEditNameCategory = (id: number, name: string) => {
    // when in edit person should click name of category or operation and name should change to input and change the name only after clicking save button
  };

  const handleAddOperation = (parentId: number) => {
    NiceModal.show(AddCategoryModal, { parentId: parentId });
  };

  const handleSaveCategories = () => {
    setEdit(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.main__upper}>
        <BreadcrumbsCustom />
        <div className={classes.main__header}>
          <h1>Косвенные расчеты</h1>
          <div className={classes.main__header__row}>
            <CounterCard
              backgroundColor={"#2196F34D"}
              icon={<PaymentsOutlined />}
              iconColor={"var(--primary-main)"}
              textTitle={"Разходы за отчетный период"}
              valueText={indirectCostsSumarryData?.expenses_all_time}
            />
            <CounterCard
              backgroundColor={"#2E7D324D"}
              icon={<BarChartOutlined />}
              iconColor={"var(--success-main)"}
              textTitle={"Накопленная статистика доходов"}
              valueText={
                indirectCostsSumarryData?.accumulated_income_statistics_in_month
              }
            />
            <CounterCard
              backgroundColor={"#FCE4E4"}
              icon={<FunctionsOutlined />}
              iconColor={"#C41C1C"}
              textTitle={"Средняя сумма расходов в месяц"}
              valueText={indirectCostsSumarryData?.average_expenses_per_month}
            />
          </div>
        </div>
      </div>

      <div className={classes.main__content}>
        <div className={classes.main__content__control}>
          <div className={classes.main__content__control__item}>
            <label>Создать отчет за</label>

            <form onSubmit={handleSubmit(handleSubmitDate)}>
              <Controller
                name="selectedPeriod"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleRadioChange(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value="day"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label="День"
                      />
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value="week"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label="Неделя"
                      />
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value="month"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label="Месяц"
                      />
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value={"quarter"}
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label={"Квартал"}
                      />
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value="year"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label="Год"
                      />
                      <FormControlLabel
                        sx={{
                          padding: "0 10px",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6rem",
                          },
                        }}
                        value={"custom"}
                        control={
                          <Radio
                            checked={selectedPeriod === "custom"}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label={"Заданный период"}
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
              {selectedPeriod === "custom" && (
                <div className={classes.datePicker}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} ref={inputRefStart} />
                    )}
                  />
                  <p>-</p>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} ref={inputRefEnd} />
                    )}
                  />
                </div>
              )}
              <Button type="submit" variant="contained">
                Создать отчет
              </Button>
              <Button type="reset" variant="outlined">
                Сбросить
              </Button>
            </form>
          </div>
        </div>
        <div className={classes.main__content__result}>
          <div className={classes.main__content__result__item}>
            <div className={classes.main__content__result__header}>
              <div className={classes.main__content__result__header__row}>
                <label>{thisMonth}</label>
                <Pagination
                  count={0}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "2.6rem",
                      opacity: 1,
                    },
                  }}
                />
              </div>
              {edit ? (
                <div className={classes.main__content__result__header__row}>
                  <Button
                    onClick={() => setEdit(false)}
                    startIcon={<Close />}
                    variant="outlined"
                  >
                    Отменить
                  </Button>
                  <Button
                    startIcon={<Check />}
                    onClick={handleSaveCategories}
                    variant="contained"
                  >
                    Сохранить
                  </Button>
                </div>
              ) : (
                <div className={classes.main__content__result__header__row}>
                  <Button
                    onClick={() => setEdit(true)}
                    startIcon={<Edit />}
                    variant="outlined"
                  >
                    Редактивровать
                  </Button>
                  <Button
                    startIcon={<Add />}
                    onClick={openAddCategoryModal}
                    variant="outlined"
                  >
                    Добавить Категорию
                  </Button>
                </div>
              )}
            </div>
            {indirectCostsData &&
              indirectCostsData.map((item, index) => {
                const tableKey = `table${index + 1}`;
                return (
                  <div
                    className={classes.main__content__result__wrap}
                    key={index}
                  >
                    <div
                      onClick={() => toggleTable(tableKey)}
                      className={classes.main__content__result__wrap__header}
                    >
                      <h1>{item.main_operation_name}</h1>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <h1>-{item.total_expenses} руб</h1>
                        <span style={{ paddingTop: "8px" }}>
                          {openTables[tableKey] ? (
                            <ExpandLess style={{ fontSize: "24px" }} />
                          ) : (
                            <ExpandMore style={{ fontSize: "24px" }} />
                          )}
                        </span>
                        {edit && (
                          <Button
                            sx={{ minWidth: "4rem" }}
                            className={classes.editBtns}
                            onClick={() =>
                              handleAddOperation(item.main_operation_id)
                            }
                          >
                            <Add
                              sx={{
                                fontSize: "1.6rem",
                              }}
                            />
                          </Button>
                        )}
                        {edit && (
                          <Button
                            onClick={() =>
                              handleDeleteCategory(item.main_operation_id)
                            }
                            sx={{ minWidth: "4rem" }}
                            color="error"
                          >
                            <DeleteOutline sx={{ fontSize: "1.6rem" }} />
                          </Button>
                        )}
                      </div>
                    </div>
                    {openTables[tableKey] && item.details && (
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Название категории</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Тип операции</TableCell>
                            <TableCell>Сумма</TableCell>
                            {edit && <TableCell>Действия</TableCell>}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.details.map((itemDetail, detailIndex) =>
                            itemDetail.operations &&
                            itemDetail.operations.length > 0 ? (
                              itemDetail.operations.map(
                                (operation, opIndex) => (
                                  <TableRow key={`${detailIndex}-${opIndex}`}>
                                    <TableCell>{itemDetail.name}</TableCell>
                                    <TableCell>
                                      {dayjs(operation.date).format(
                                        "DD.MM.YYYY"
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {operation.money_type}
                                    </TableCell>
                                    <TableCell>
                                      {operation.total_amount_change}
                                    </TableCell>
                                    {edit && (
                                      <TableCell className={classes.editTable}>
                                        <Button>
                                          <DeleteOutline />
                                        </Button>
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )
                              )
                            ) : (
                              <TableRow key={detailIndex}>
                                <TableCell>{itemDetail.name}</TableCell>
                                <TableCell>Нет данных</TableCell>
                                <TableCell>Нет данных</TableCell>
                                <TableCell>Нет данных</TableCell>
                                {edit && (
                                  <TableCell className={classes.editTable}>
                                    <Button>
                                      <DeleteOutline />
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndirectCostsPage;
