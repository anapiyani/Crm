import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import classes from "./styles.module.scss";
import {
  Notifications,
  Comment,
  Add,
  CheckCircle,
  ContentPaste,
  Create,
  Folder,
  Inventory,
  LocalOffer,
  RemoveRedEye,
  Science,
  TaskAlt,
  TransferWithinAStation,
  SvgIconComponent,
} from "@mui/icons-material";
import { useState } from "react";
import CounterCard from "@/components/counter-card/counter-card";
import InventoryChart from "./_components/chart1/chart-inventory";
import {
  getHierarchy,
  getSearchResults,
} from "@/service/hierarchy/hierarchy.service";
import { HTML5Backend } from "react-dnd-html5-backend";
import TreeView from "@/components/treeItem/treeItem";
import { useQuery } from "@tanstack/react-query";
import {
  IfiltersResponse,
  ISearchResult,
  IServiceParent,
} from "@/ts/hierarchy.inteface";
import { IService, IServiceCostData } from "@/ts/service.interface";
import {
  getServiceParent,
  getServicePrices,
} from "@/service/services/services.service";
import CustomTextField from "@/components/textField/textField.component";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import Table1 from "./_components/table1/table1";
import TableView from "./_components/table-view/tableView";
import {
  MovingColumns,
  MovingData,
  PurchaseColumns,
  PurchaseData,
  WriteOffColumns,
  WriteOffData,
} from "./_components/table-view/data";
import TableAccounting from "./_components/table-accounting/tableAccounting";
import {
  tableConfig1,
  tableConfig2,
  tableConfig3,
  tableData1,
  tableData2,
  tableData3,
} from "./_components/table-accounting/data";

const InventoryPage: React.FC = () => {
  type TabItem = {
    to: string;
    icon: SvgIconComponent;
    label: string;
  };

  const tabs: TabItem[] = [
    { to: "", icon: Inventory, label: "Инвентаризация" },
    { to: "", icon: Inventory, label: "Закупка" },
    { to: "", icon: Inventory, label: "Списание" },
    { to: "", icon: TransferWithinAStation, label: "Перемещение" },
  ];
  const [service, setService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serviceParents, setServiceParents] = useState<IServiceParent[]>();
  type FormData = {
    category: string;
    department: string;
    group: string;
    keyword: string;
    role: string;
    section: string;
    service_type: string;
    subcategory: string;
  };

  const [formData, setFormData] = useState<FormData>({
    category: "",
    department: "",
    group: "",
    keyword: "",
    role: "",
    section: "",
    service_type: "",
    subcategory: "",
  });

  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const graphData = [
    { month: "Июнь", inventory: 10, materials: 19, purchase: 5 },
    { month: "Июль", inventory: 38, materials: 43, purchase: 35 },
    { month: "Август", inventory: 55, materials: 20, purchase: 50 },
    { month: "Сентябрь", inventory: 60, materials: 23, purchase: 60 },
  ];

  const { data, isPending, isError } = useQuery({
    queryKey: ["hierarchyData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const [searchResults, setSearchResults] = useState<ISearchResult>();
  const [hasParameters, setHasParameters] = useState<boolean>(false);
  const [costData, setCostData] = useState<IServiceCostData[]>([
    {
      position: "Unknown",
      cost: 0,
    },
  ]);

  type RowItem = {
    IconComponent: React.ElementType;
    color: string;
    label: string;
  };

  const rows: RowItem[] = [
    { IconComponent: Folder, color: "#0B6BCB", label: "Поиск" },
    { IconComponent: Folder, color: "#1E88E5", label: "Отделы" },
    { IconComponent: Folder, color: "#1565C0", label: "Категория" },
    { IconComponent: Folder, color: "#7B1FA2", label: "Группа" },
    { IconComponent: Folder, color: "#EF6C00", label: "Марка" },
    { IconComponent: Folder, color: "#FBC02D", label: "Линия" },
    { IconComponent: Folder, color: "#388E3C", label: "Подлиния" },
  ];

  const handleServiceSelect = (service: IService) => {
    setService(service);
    getServiceParent(service.id).then((data) => setServiceParents(data));
    setIsLoading(true);
    getServicePrices(service.id).then((data) => {
      const prices: IServiceCostData[] = [];
      data.roles.map((role) => {
        if (role.prices.length > 1) {
          setHasParameters(true);
        }
        if (role.prices.length === 1) {
          setHasParameters(false);
          console.log(role);
          const oneRolePrice: IServiceCostData = {
            position: role.role,
            cost: role.prices[0].price,
          };
          prices.push(oneRolePrice);
          return {
            position: role.role,
            cost: role.prices[0].price,
          };
        } else {
          const oneRolePrice: IServiceCostData = {
            position: role.role,
            cost: 0,
            shortHair: 0,
            mediumHair: 0,
            longHair: 0,
            roots: 0,
          };
          role.prices.map((price) => {
            if (price.parameter === "Короткие от 10 см") {
              oneRolePrice.shortHair = price.price;
            } else if (price.parameter === "Средние 15-20 см") {
              oneRolePrice.mediumHair = price.price;
            } else if (price.parameter === "Длинные 30-40 см") {
              oneRolePrice.longHair = price.price;
            } else if (price.parameter === "Очень длинные 50-60 см") {
              oneRolePrice.roots = price.price;
            }
          });
          prices.push(oneRolePrice);
        }
      });
      setCostData(prices);
      setIsLoading(false);
    });
  };

  const [filterOptions, setFilterOptions] = useState<IfiltersResponse>();

  type TableActionItem = {
    icon: JSX.Element;
    label: string;
  };

  const tableActions: TableActionItem[] = [
    { icon: <RemoveRedEye />, label: "Посмотреть" },
    { icon: <ContentPaste />, label: "Накладная" },
    { icon: <LocalOffer />, label: "Ценники" },
    { icon: <Create />, label: "Изменить" },
    { icon: <Add />, label: "Отменить" },
  ];

  const renderContentHeader = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem", alignItems: "center" }}>
            <div className={classes["inventory__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"#2196F34D"}
                icon={<TaskAlt />}
                iconColor={"var(--primary-main)"}
                textTitle={"Расходы за отчетный период"}
                valueText={"Дата последней закупки"}
              />
              <CounterCard
                backgroundColor={"#2E7D324D"}
                icon={<CheckCircle />}
                iconColor={"var(--success-main)"}
                textTitle={"Накопленная статистика доходов"}
                valueText={"Дата последней инвентеризации"}
              />
              <CounterCard
                backgroundColor={"#FCE4E4"}
                icon={<Science />}
                iconColor={"#C41C1C"}
                textTitle={"Средняя сумма расходов в месяц"}
                valueText={"Количество наименований"}
              />
            </div>
            <InventoryChart data={graphData} />
          </Grid>
        );
      default:
        return <div>Select a tab above to see more details.</div>;
    }
  };

  const renderContentMain = () => {
    switch (currentTab) {
      case 0:
        return (
          <div className={classes.catalog}>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <div className={classes.catalog__upper__content__header}>
                  <h5 className={classes.catalog__upper__content__label}>
                    Каталог материалов
                  </h5>
                  <Divider />
                  <div className={classes.catalog__upper__content__items}>
                    {isPending ? <CircularProgress /> : ""}
                    <DndProvider backend={HTML5Backend}>
                      <TreeView
                        categories={data || []}
                        searchResults={searchResults}
                        onServiceSelect={handleServiceSelect}
                      />
                    </DndProvider>
                  </div>
                  <Divider />
                  <div className={classes.catalog__upper__content__hint}>
                    {rows.map((row, index) => (
                      <div
                        key={index}
                        className={classes.catalog__upper__content__hint__row}
                      >
                        <row.IconComponent
                          style={{ color: row.color, fontSize: "24px" }}
                        />
                        <label>{row.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={classes.catalog__upper__search}>
                <h5 className={classes.catalog__upper__content__label}>
                  Основные характеристики
                </h5>
                <Divider />
                <div className={classes.catalog__upper__search__content}>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Поиск
                    </p>
                    <CustomTextField
                      label={"Введите текст для поиска"}
                      onChange={(e) =>
                        setFormData({ ...formData, keyword: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      {" "}
                      Отделы
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.departments || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField {...params} label={"Введите Отдел"} />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Категория
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.sections || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          label={"Введите категорию"}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Группа
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.service_types || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField {...params} label={"Введите группу"} />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Марка
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.categories || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField {...params} label={"Введите марку"} />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Линия
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.subcategories || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField {...params} label={"Введите линию"} />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <p
                      className={classes.catalog__upper__search__content__label}
                    >
                      Подлиния
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filterOptions?.roles || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          label={"Введите подлинию"}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.catalog__upper__search__content__row}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      sx={{ fontSize: "1.6rem", fontWeight: "400" }}
                    >
                      Очистить
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      size="medium"
                      sx={{ fontSize: "1.6rem", fontWeight: "400" }}
                      type="submit"
                    >
                      Искать
                    </Button>
                  </div>
                </div>
              </div>
              <div className={classes.catalog__upper__info}>
                <h5 className={classes.catalog__upper__content__label}>
                  Информация
                </h5>
                <Divider />
                <h3 className={classes.catalog__upper__info__label2}>
                  Инвентаризация
                </h3>
                <p className={classes.text}>
                  ПрофСалон автоматически рассчитывает расход материалов и
                  поддерживает информацию о наличии материалов на складе в
                  актуальном состоянии.
                </p>
                <p className={classes.text}>
                  Тем не менее периодически рекомендуется проводить
                  инвентаризацию для выявления несоответствия между рассчитанным
                  кол-вом материалов и реальным их наличием.
                </p>
                <p className={classes.text}>
                  Для начала инвентаризации необходимо: 1. выбрать раздел, по
                  которому будет проводиться инвентаризация (в каталоге
                  материалов слева, используя кнопку "Ctrl"); 2. нажать кнопку
                  "Искать"; 3. убедиться, что в результатах поиска выведены
                  необходимые материалы/товары; 4. нажать на кнопку "Начать
                  инвентаризацию" (ниже данной справки).
                </p>
                <p className={classes.text}>
                  Во время инвентаризации вы можете: 1. ввести реальное кол-во
                  материалов/товаров; 2. отменить инвентаризацию; 3. при
                  необходимости для удобства распечатать список
                  материалов/товаров, подлежащих инвентаризации; 4. по окончании
                  инвентаризации нажать на кнопку "Завершить инвентаризацию".
                </p>
                <p className={classes.text}>
                  Обратите внимание! Если вам нужно принять новый товар при
                  закупке, списать товар с истекшим сроком или переместить между
                  складом, витриной и залом, то используйте соответствующие
                  вкладки наверху страницы.
                </p>
              </div>
            </div>
            <div className={classes.materials}>
              <div className={classes.materials__title}>
                <h1>Список материалов/товаров</h1>
              </div>
              <div className={classes.materials__lower}>
                <Table1 />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={classes.catalog}>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  Список закупки
                </h5>
                <Divider />
                <div className={classes.materials__lower__container}>
                  <TableAccounting data={tableData1} config={tableConfig1} />
                </div>
              </div>
            </div>
            <div className={classes.catalog__lower}>
              <div className={classes.catalog__lower__supplier}>
                <StepInput
                  labelName={"Выберите поставщика"}
                  placeholder={"Не указано"}
                  onChange={(value) => console.log(value)}
                  isAutoComplete={true}
                  options={[]}
                  afterChild={<Notifications sx={{ color: "blue" }} />}
                  labelLength={{ width: "320px" }}
                />
              </div>
              <div className={classes.catalog__lower__supplier}>
                <StepInput
                  labelName={"Выберите поставщика"}
                  placeholder={"Не указано"}
                  onChange={(value) => console.log(value)}
                  isAutoComplete={true}
                  options={[]}
                  afterChild={<Comment sx={{ color: "blue" }} />}
                  labelLength={{ width: "320px" }}
                />
              </div>
              <div className={classes.catalog__lower__btn}>
                <Button
                  // onClick={}
                  type="submit"
                  variant="contained"
                  style={{ height: "3.5rem", width: "10rem" }}
                >
                  Завершить
                </Button>
              </div>
            </div>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  История закупки
                </h5>
                <div className={classes.materials__lower__container}>
                  <TableView
                    data={PurchaseData}
                    columns={PurchaseColumns}
                    actions={tableActions}
                    pageCount={5}
                    page={1}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={classes.catalog}>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  Список списания
                </h5>
                <Divider />
                <div className={classes.materials__lower__container}>
                  <TableAccounting data={tableData2} config={tableConfig2} />
                </div>
              </div>
            </div>
            <div className={classes.catalog__lower__btn}>
              <Button
                type="submit"
                variant="contained"
                style={{ height: "3.5rem", width: "10rem" }}
              >
                Завершить
              </Button>
            </div>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  История списаний
                </h5>
                <Divider style={{ paddingBottom: "10px" }} />
                <div className={classes.materials__lower__container}>
                  <TableView
                    data={WriteOffData}
                    columns={WriteOffColumns}
                    actions={tableActions}
                    pageCount={5}
                    page={1}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={classes.catalog}>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  Список списания
                </h5>
                <Divider />
                <div className={classes.materials__lower__container}>
                  <TableAccounting data={tableData3} config={tableConfig3} />
                </div>
              </div>
            </div>
            <div className={classes.catalog__lower__btn}>
              <Button
                type="submit"
                variant="contained"
                style={{ height: "3.5rem", width: "10rem" }}
              >
                Завершить
              </Button>
            </div>
            <div className={classes.catalog__upper}>
              <div className={classes.catalog__upper__content}>
                <h5 className={classes.catalog__upper__content__label}>
                  История списаний
                </h5>
                <Divider style={{ paddingBottom: "10px" }} />
                <div className={classes.materials__lower__container}>
                  <TableView
                    data={MovingData}
                    columns={MovingColumns}
                    actions={tableActions}
                    pageCount={5}
                    page={1}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab above to see more details.</div>;
    }
  };

  return (
    <div className={classes["inventory"]}>
      <div className={classes["inventory__header"]}>
        <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
          <div className={classes["inventory__header__upper"]}>
            <div className={classes["inventory__header__upper__bread"]}>
              <BreadcrumbsCustom />
            </div>
            <div className={classes["inventory__header__upper__title"]}>
              <h1>Инвентаризация</h1>
            </div>
            <ResponsiveTabs
              tabsData={tabs}
              onTabChange={handleTabChange}
              currentTab={currentTab}
            />
            <div className={classes["inventory__header__upper__row"]}>
              {renderContentHeader()}
            </div>
          </div>
        </Box>
      </div>
      {renderContentMain()}
    </div>
  );
};

export default InventoryPage;
