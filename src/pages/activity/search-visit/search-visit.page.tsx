import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Pagination,
} from "@mui/material";
import classes from "./styles.module.scss";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import RoleEmployeeCheckbox from "@/components/role-employee-checkbox/role-employee-checkbox";
import { useState } from "react";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import { useQuery } from "@tanstack/react-query";
import {
  getHierarchy,
  getHierarchyById,
} from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory } from "@/ts/service.interface";
import { Adjust, Inventory, CardGiftcard } from "@mui/icons-material";
import EmployeeVisitsTable from "@/pages/employees/employee-visits/visits-table/employee-visits-table";
import { TableData } from "@/modals/home/event-details/data";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IVisitsInfo, IVisitsResponse } from "@/ts/activity.interface";
import { searchVisits } from "@/service/activity/activity.service";

interface ITreeItemProps {
  id: number;
  isChecked: number;
  type: "service" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string | null;
}

interface IOption {
  label: string;
  value: number;
}

const SearchVisits = () => {
  const { register, handleSubmit, reset, control, setValue } =
    useForm<IVisitsInfo>();
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITreeItemProps[]>([]);
  const [visitsData, setVisitsData] = useState<IVisitsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: visitsInfo,
    refetch: refetchVistsData,
    isPending: visitsPending,
    isError: visitsError,
  } = useQuery({
    queryKey: [
      "visitsData",
      selectedEmployeeIds,
      selectedItems,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      searchVisits({
        bonuses: false,
        cashless_payment: false,
        certificate: false,
        bank_transfer: false,
        employee_id: selectedEmployeeIds,
        id: "",
        service_id: selectedItems.map((item) => item.id),
        status: "Любой",
        subscription: false,
        unapproved_materials: false,
        unpaid: false,
        with_products: false,
        amount_from: 0,
        amount_to: 0,
        date_from: "",
        date_to: "",
        ascending_order: false,
        sort_by_date: false,
        sorting: "",
        page: currentPage,
        page_size: pageSize,
      }).then((res) => {
        setVisitsData(res);
      }),
  });

  const handleSubmitSearch: SubmitHandler<IVisitsInfo> = async (data) => {
    const { sorting, ...restData } = data;
    const serviceIds = selectedItems.filter((item) => item.type === "service");
    const serviceIdMapped = serviceIds.map((item) => item.id);

    const formSearch: IVisitsInfo = {
      ...restData,
      service_id: serviceIdMapped.length > 0 ? serviceIdMapped : [],
      employee_id: selectedEmployeeIds.length > 0 ? selectedEmployeeIds : [],
      page: currentPage,
      page_size: pageSize,
      amount_from: restData.amount_from || 0,
      amount_to: restData.amount_to || 0,
      bank_transfer: restData.bank_transfer,
      bonuses: restData.bonuses,
      certificate: restData.certificate,
      date_from: restData.date_from || "",
      date_to: restData.date_to || "",
      ascending_order: restData.ascending_order,
      sort_by_date: restData.sort_by_date,
      status: restData.status || "Любой",
      subscription: restData.subscription,
      unapproved_materials: restData.unapproved_materials,
      unpaid: restData.unpaid,
      with_products: restData.with_products,
      cashless_payment: restData.cashless_payment,
    };

    searchVisits(formSearch).then((res) => {
      setVisitsData(res);
    });
  };

  const handleServiceChange = (
    id: number,
    isChecked: number,
    type: "service" | "category",
    serviceName: string,
    parent: number | null,
    parent_name: string | null,
  ) => {
    setSelectedItems((prev) => {
      if (isChecked === 1) {
        return [
          ...prev,
          { id, isChecked, type, serviceName, parent, parent_name },
        ];
      } else if (isChecked === 2) {
        return prev.filter((item) => !(item.id === id && item.type === type));
      } else if (isChecked === 3) {
        if (!prev.some((item) => item.id === id && item.type === type)) {
          return [
            ...prev,
            { id, isChecked, type, serviceName, parent, parent_name },
          ];
        } else {
          return prev;
        }
      }

      return prev;
    });
  };

  const onParentChange = async (
    parentCategoryId: number | null,
    childCheckedState: number,
  ) => {
    if (parentCategoryId === null) return;

    const parentCategory = await getHierarchyById(parentCategoryId);
    const childStates = parentCategory.children.map((child) => {
      const isChecked = selectedItems.some(
        (item) => item.id === child.id && item.type === "category",
      );

      const allServicesChecked = child.services.every((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service",
        ),
      );

      const allChildrenChecked = child.children.every((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category",
        ),
      );

      const anyChildrenChecked = child.children.some((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category",
        ),
      );

      const anyServicesChecked = child.services.some((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service",
        ),
      );

      if (allServicesChecked && allChildrenChecked) {
        return 1; // Fully checked
      } else if (
        (anyServicesChecked || anyChildrenChecked) &&
        !(allServicesChecked && allChildrenChecked)
      ) {
        return 3; // Indeterminate
      } else {
        return 2; // Unchecked
      }
    });

    // Determine the overall state of the parent category
    const allChecked = childStates.every((state) => state === 1);
    const anyIndeterminate = childStates.some((state) => state === 3);

    let parentState = 2; // Default to unchecked

    if (allChecked) {
      parentState = 1; // All checked
    } else if (anyIndeterminate || childCheckedState === 3) {
      parentState = 3; // Indeterminate
    }

    // Update the parent category's state
    handleServiceChange(
      parentCategory.id,
      parentState,
      "category",
      parentCategory.name,
      parentCategory.parent!,
      parentCategory.parent_name,
    );

    // Recursively propagate the state change to the parent's parent
    onParentChange(parentCategory.parent, parentState);
  };

  const handleEmployeeSelectionChange = (ids: number[]) => {
    setSelectedEmployeeIds(ids);
    console.log("Selected Employee IDs:", ids);
  };

  const {
    data: dataServices,
    isLoading: isLoadingServices,
    error: errorServices,
  } = useQuery<IServiceCategory[], Error>({
    queryKey: ["servicesAppointentSearch"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const checkboxOptions = [
    {
      label: "Только неоплаченные",
      value: "unpaid",
    },
    {
      label: "Только с несогласов. материал.",
      value: "unapproved_materials",
    },
    {
      label: "Только по абонементу",
      value: "subscription",
    },
    {
      label: "Только по сертификату",
      value: "certificate",
    },
    {
      label: "Только оплаченные бонусами",
      value: "bonuses",
    },
    {
      label: "Оплаченные по безналу",
      value: "cashless_payment",
    },
    {
      label: "Только с товарами",
      value: "with_products",
    },
  ];

  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const data: TableData[] =
    visitsData?.results.map((visit, index) => {
      return {
        id: index + 1,
        visit: visit.id.toString(),
        visitTime: visit.date || "",
        client:
          `${visit.client.first_name} ${visit.client.last_name}` ||
          "Нет данных",
        clientNote: visit.notes || "",
        services: visit.appointment_services.map((service) => {
          return {
            icon: Adjust,
            name: service.service_name,
            employee: visit.employee_name || "Нет данных",
            employeeRole: visit.employee_role,
            amount: Number(visit.service_amount) || 0,
            discount: visit.discount_custom || 0,
            total: Number(service.price) || 0,
          };
        }),
        grandTotal: visit.total_price,
        grandTotalCash: visit.total_cash,
        grandTotalCard: visit.total_card,
      };
    }) || [];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    refetchVistsData();
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
    refetchVistsData();
  };

  return (
    <div className={classes.visits}>
      <div className={classes.visits__header}>
        <BreadcrumbsCustom />
        <div className={classes.visits__header__text}>
          <h1>Поиск посещений</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className={classes.visits__content}>
          <div className={classes.visits__content__infos}>
            <div className={classes.visits__content__infos__header}>
              <h2 className={classes["u-header-text"]}>Основная информация</h2>
              <Divider />
            </div>
            <div className={classes.visits__content__infos__form}>
              <Controller
                name="status"
                control={control}
                defaultValue="Любой"
                render={({ field }) => {
                  const options = [
                    {
                      value: "Любой",
                      label: "Любой",
                    },
                    {
                      value: "Посещение завершено и оплачено",
                      label: "Посещение завершено и оплачено",
                    },
                    {
                      value: "Посещение идет, клиент в салоне",
                      label: "Посещение идет, клиент в салоне",
                    },
                  ];

                  const selectedOption = field.value
                    ? options.find((option) => option.value === field.value)
                    : null;

                  return (
                    <CustomAutoComplete
                      {...field}
                      name={"status"}
                      label={"Статус"}
                      placeholder="Любой"
                      selectValue={"label"}
                      options={options}
                      size="small"
                      labelClassName={classes["u-label"]}
                      value={selectedOption}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                    />
                  );
                }}
              />

              <VerticalTextField
                name={"date"}
                label={"Сумма"}
                placeholder="Начиная с"
                placeholderOptional="Заканчивая"
                size="small"
                type="double"
                doubleDivier="-"
                labelClassName={classes["u-label"]}
                onChangeFrom={(e) => {
                  setValue("amount_from", Number(e.target.value));
                }}
                onChangeTo={(e) => {
                  setValue("amount_to", Number(e.target.value));
                }}
              />

              <VerticalTextField
                name={"date"}
                label={"Дата"}
                placeholder="01.01.2021"
                size="small"
                type="double-calendar"
                doubleDivier="-"
                labelClassName={classes["u-label"]}
                onChangeFrom={(e) => {
                  setValue("date_from", e.target.value);
                }}
                onChangeTo={(e) => {
                  setValue("date_to", e.target.value);
                }}
              />

              <VerticalTextField
                label={"Номер"}
                size="small"
                labelClassName={classes["u-label"]}
                placeholder={"№ посещения"}
                {...register("id")}
              />

              <FormGroup
                sx={{
                  marginLeft: "10rem",
                }}
              >
                {checkboxOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Controller
                        name={option.value as keyof IVisitsInfo}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            size="medium"
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 20 },
                            }}
                          />
                        )}
                      />
                    }
                    label={option.label}
                    sx={{
                      "& .MuiTypography-root": { fontSize: "1.4rem" },
                    }}
                  />
                ))}
              </FormGroup>

              <Controller
                name={"sorting" as keyof IVisitsInfo}
                control={control}
                defaultValue=""
                render={({ field }) => {
                  const options = [
                    {
                      value: "1",
                      label: "По дате, по убыванию",
                    },
                    {
                      value: "2",
                      label: "По дате, по возрастанию",
                    },
                    {
                      value: "3",
                      label: "По сумме, по возрастанию",
                    },
                    {
                      value: "4",
                      label: "По сумме, по убыванию",
                    },
                  ];

                  const selectedOption = field.value
                    ? options.find((option) => option.value === field.value)
                    : null;

                  return (
                    <CustomAutoComplete
                      {...field}
                      value={selectedOption}
                      label={"Сортировка"}
                      placeholder="По дате, по убыванию"
                      selectValue={"label"}
                      options={options}
                      size="small"
                      labelClassName={classes["u-label"]}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);

                        if (newValue?.value === "1") {
                          setValue("sort_by_date", true);
                          setValue("ascending_order", false);
                        } else if (newValue?.value === "2") {
                          setValue("sort_by_date", true);
                          setValue("ascending_order", true);
                        } else if (newValue?.value === "3") {
                          setValue("sort_by_date", false);
                          setValue("ascending_order", true);
                        } else if (newValue?.value === "4") {
                          setValue("sort_by_date", false);
                          setValue("ascending_order", false);
                        }
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className={classes.visits__content__infos}>
            <div className={classes.visits__content__infos__header}>
              <h2 className={classes["u-header-text"]}>Основная информация</h2>
              <Divider />
            </div>
            <RoleEmployeeCheckbox
              onEmployeeSelectionChange={handleEmployeeSelectionChange}
            />
          </div>
          <div className={classes.visits__content__infos}>
            <div className={classes.visits__content__infos__header}>
              <h2 className={classes["u-header-text"]}>Основная информация</h2>
              <Divider />
              {dataServices?.map((service) => (
                <RecursiveCheckbox
                  key={`category-${service.id}`}
                  category={service}
                  onServiceChange={handleServiceChange}
                  preCheckedItems={selectedItems}
                  onParentChange={onParentChange}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={classes["visits__search-buttons"]}>
          <Button
            variant="outlined"
            sx={{
              fontSize: "1.4rem",
            }}
            onClick={() => reset()}
            type="reset"
          >
            Сбросить
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1.4rem",
            }}
            type="submit"
          >
            Искать
          </Button>
        </div>
      </form>
      <div className={classes.visits__table}>
        {visitsData && visitsData.results && visitsData.results.length > 0 ? (
          <EmployeeVisitsTable
            onClickVisit={(id) => window.location.assign(`/visits/${id}`)}
            data={data}
          />
        ) : (
          <p>Нет данныx</p>
        )}
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderBottomLeftRadius: "0.8rem",
            borderBottomRightRadius: "0.8rem",
            padding: "0.5rem",
            backgroundColor: "white",
            boxShadow:
              "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);",
          }}
        >
          <div
            style={{
              padding: "2rem",
              paddingBottom: "2rem",
              display: "flex",
              flexDirection: "row",
              height: "50px",
              fontSize: "1.6rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className={classes["main__cashDesk__lower__container__label"]}>
              Показано {pageSize} из {visitsData?.count} записей
            </p>
            <div>
              <div className={classes["tableSettings"]}>
                Показывать
                <select
                  name="pageSize"
                  id="pageSize"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                записей
              </div>
            </div>
            {visitsData && (
              <Pagination
                variant="outlined"
                shape="rounded"
                boundaryCount={1}
                color="primary"
                count={Math.ceil(visitsData?.count / pageSize)}
                page={currentPage}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVisits;
