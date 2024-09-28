import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { Autocomplete, Box, Button, CircularProgress, Divider, Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DndProvider } from "react-dnd";
import classes from "./styles.module.scss";
import { CheckCircle, Folder, Inventory, Science, TaskAlt, TransferWithinAStation,  } from "@mui/icons-material";
import { useState } from "react";
import CounterCard from "@/components/counter-card/counter-card";
import InventoryChart from "./_components/chart1/chart-inventory";
import { getHierarchy, getSearchResults } from "@/service/hierarchy/hierarchy.service";
import { HTML5Backend } from "react-dnd-html5-backend";
import TreeView from "@/components/treeItem/treeItem";
import { useQuery } from "@tanstack/react-query";
import { IfiltersResponse, ISearchResult, IServiceParent } from "@/ts/hierarchy.inteface";
import { IService, IServiceCostData } from "@/ts/service.interface";
import { getServiceParent, getServicePrices } from "@/service/services/services.service";
import CustomTextField from "@/components/textField/textField.component";
import { ISearchFormData } from "@/ts/employee.interface";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CommentIcon from '@mui/icons-material/Comment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Table1 from "./_components/table1/table1";
import Table2 from "./_components/table2/table2";
import Table3 from "./_components/table3/table3";
import Table4 from "./_components/table4/table4";
import Table5 from "./_components/table5/table5";
import Table6 from "./_components/table6/table6";
import Table7 from "./_components/table7/table7";

const InventoryPage: React.FC = () => {
    const tabs = [
        { to: "", icon: Inventory, label: "Инвентаризация" },
        { to: "", icon: Inventory, label: "Закупка" },
        { to: "", icon: Inventory, label: "Списание" },
        {
            to: "",
            icon: TransferWithinAStation,
            label: "Перемещение",
        },
    ];
    const [service, setService] = useState<IService | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [serviceParents, setServiceParents] = useState<IServiceParent[]>();
    const [formData, setFormData] = useState({
        category: "",
        department: "",
        group: "",
        keyword: "",
        role: "",
        section: "",
        service_type: "",
        subcategory: "",
    });


    const [currentTab, setCurrentTab] = useState(0);
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
    const [hasParameters, setHasParameters] = useState(false);
    const [costData, setCostData] = useState<IServiceCostData[]>([
        {
            position: "Unknown",
            cost: 0,
        },
    ]);

    const handleSearch = () => {
        getSearchResults(formData).then((data) => setSearchResults(data));
    };

    const rows = [
        { IconComponent: Folder, color: "#0B6BCB", label: "Поиск" },
        { IconComponent: Folder, color: "#1E88E5", label: "Отделы" },
        { IconComponent: Folder, color: "#1565C0", label: "Категория" },
        { IconComponent: Folder, color: "#7B1FA2", label: "Группа" },
        { IconComponent: Folder, color: "#EF6C00", label: "Марка" },
        { IconComponent: Folder, color: "#FBC02D", label: "Линия" },
        { IconComponent: Folder, color: "#388E3C", label: "Подлиния" },
      ];

    function handleAutocompleteChange(value: any, fieldName: string): void {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }

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

    const handleFormDataChange = (field: keyof ISearchFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handlePageChange = (
      event: React.ChangeEvent<unknown>,
      value: number,
    ) => {
      handleFormDataChange("page", value);
    };
    
    const renderContentHeader = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem", alignItems: "center"}}>
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
      case 1:
        return (
          <div/>
        );
      case 2:
        return(
          <div/>
        );
      case 3:
        return (
          <div/>
        );
        default:
          return <div></div>;
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
                          <div key={index} className={classes.catalog__upper__content__hint__row}>
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
                        <p className={classes.catalog__upper__search__content__label}>
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
                        <p className={classes.catalog__upper__search__content__label}>
                          {" "}
                          Отделы
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.departments || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "department")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите Отдел"} />
                          )}
                        />
                      </div>
                      <div className={classes.catalog__upper__search__content__row}>
                        <p className={classes.catalog__upper__search__content__label}>
                          Категория
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.sections || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "section")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите категорию"} />
                          )}
                        />
                      </div>
                      <div className={classes.catalog__upper__search__content__row}>
                        <p className={classes.catalog__upper__search__content__label}>
                          Группа
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.service_types || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "service_type")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите группу"} />
                          )}
                        />
                      </div>
                      <div className={classes.catalog__upper__search__content__row}>
                        <p className={classes.catalog__upper__search__content__label}>
                          Марка
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.categories || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "category")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите марку"} />
                          )}
                        />
                      </div>
                      <div className={classes.catalog__upper__search__content__row}>
                        <p className={classes.catalog__upper__search__content__label}>
                          Линия
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.subcategories || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "subcategory")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите линию"} />
                          )}
                        />
                      </div>
                      <div className={classes.catalog__upper__search__content__row}>
                        <p className={classes.catalog__upper__search__content__label}>
                          Подлиния
                        </p>
                        <Autocomplete
                          sx={{ width: "100%" }}
                          options={filterOptions?.roles || []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            handleAutocompleteChange(newValue?.name, "role")
                          }
                          renderInput={(params) => (
                            <CustomTextField {...params} label={"Введите подлинию"} />
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
                          onClick={handleSearch}
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
                      <h3 className={classes.catalog__upper__info__label2}>Инвентаризация</h3>
                      <p>
                          ПрофСалон автоматически рассчитывает расход материалов и поддерживает информацию о наличии материалов на складе в актуальном состоянии.<br></br><br></br>
                          Тем не менее периодически рекомендуется проводить инвентаризацию для выявления несоответствия между рассчитанным кол-вом материалов и реальным их наличием.
                          <br></br><br></br>
                          Для начала инвентаризации необходимо:<br></br>
                          1. выбрать раздел, по которому будет проводиться инвентаризация (в каталоге материалов слева, используя кнопку "Ctrl");<br></br>
                          2. нажать кнопку "Искать";<br></br>
                          3. убедиться, что в результатах поиска выведены необходимые материалы/товары;<br></br>
                          4. нажать на кнопку "Начать инвентаризацию" (ниже данной справки).
                          <br></br><br></br>
                          Во время инвентаризации вы можете:<br></br>
                          1. ввести реальное кол-во материалов/товаров;<br></br>
                          2. отменить инвентаризацию;<br></br>
                          3. при необходимости для удобства распечатать список материалов/товаров, подлежащих инвентаризации;<br></br>
                          4. по окончании инвентаризации нажать на кнопку "Завершить инвентаризацию".
                          <br></br><br></br>
                          Обратите внимание! Если вам нужно принять новый товар при закупке, списать товар с истекшим сроком или переместить между складом, витриной и залом, то используйте соответствующие вкладки наверху страницы.<br></br>
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
                      <Table2/>
                    </div>
                  </div>
                </div>
                <div className={classes.catalog__lower}>
                  <div className={classes.catalog__lower__supplier}>
                    <StepInput 
                      labelName={"Выберите поставщика"} 
                      placeholder={"Не указано"} 
                      onChange={(value) => console.log(value)} 
                      isAutoComplete={true} options={[]} 
                      afterChild={<NotificationsIcon sx={{color: "blue"}}/>}
                      labelLength= {{width: "320px"}}
                    />
                  </div>
                  <div className={classes.catalog__lower__supplier}>
                    <StepInput
                      labelName={"Выберите поставщика"} 
                      placeholder={"Не указано"} 
                      onChange={(value) => console.log(value)} 
                      isAutoComplete={true} options={[]} 
                      afterChild={<CommentIcon sx={{color: "blue"}}/>}  
                      labelLength= {{width: "320px"}}
                    />
                  </div>
                  <div className={classes.catalog__lower__btn}>
                    <Button
                      // onClick={}
                      type="submit"
                      variant="contained"
                      style={{height: "3.5rem", width: "10rem"}}
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
                      <Table3/>
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
                    <Table4/>
                  </div>
                </div>
              </div>
              <div className={classes.catalog__lower__btn}>
                <Button
                  // onClick={}
                  type="submit"
                  variant="contained"
                  style={{height: "3.5rem", width: "10rem"}}
                >
                  Завершить
                </Button>
              </div>
              <div className={classes.catalog__upper}>
                <div className={classes.catalog__upper__content}>
                  <h5 className={classes.catalog__upper__content__label}>
                    История списаний
                  </h5>
                  <Divider style={{paddingBottom: "10px"}}/>
                  <div className={classes.materials__lower__container}>
                    <Table5/>
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
                      <Table6/>
                    </div>
                  </div>
                </div>
                <div className={classes.catalog__lower__btn}>
                  <Button
                    // onClick={}
                    type="submit"
                    variant="contained"
                    style={{height: "3.5rem", width: "10rem"}}
                  >
                    Завершить
                  </Button>
                </div>
                <div className={classes.catalog__upper}>
                  <div className={classes.catalog__upper__content}>
                    <h5 className={classes.catalog__upper__content__label}>
                      История списаний
                    </h5>
                    <Divider style={{paddingBottom: "10px"}}/>
                    <div className={classes.materials__lower__container}>
                      <Table7/>
                    </div>
                  </div>
                </div>
              </div>
            );
          default:
            return <div></div>;
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