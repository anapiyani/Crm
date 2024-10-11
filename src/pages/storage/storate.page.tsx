import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
import CustomTextField from "@/components/textField/textField.component";
import TreeView from "@/components/treeItem/treeItem";
import TreeViewStorage from "@/components/treeItem/treeItemStorage/treeItemStorage";
import {
  getHierarchy,
  getHierarchySearchOption,
  getHierarchyStorage,
  getSearchResults,
} from "@/service/hierarchy/hierarchy.service";
import { IMaterial, IMaterialnameId } from "@/ts/storage.interface";
import {
  Divider,
  CircularProgress,
  Autocomplete,
  Button,
  Pagination,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
  TableHead,
  Paper,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  LanOutlined,
  Folder,
  Science,
  TableChartOutlined,
  Settings,
  Add,
  Edit,
  PlayArrow,
  DoNotDisturbAltOutlined,
  Check,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import classes from "./styles.module.scss";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import { purchaseHistoryData } from "./data";
import FloatingPriceTable from "./_components/table-floatingPrice/tableFloatingPrice";
import NormativeService from "./_components/table-normativeService/tableNormativeService";
import TableView from "./_components/table-view/tableView";
import TableStock from "./_components/table-stock/tableStock.tsx";
import {
  getMaterialInformation,
  purchaseMaterial,
  writeOff,
} from "@/service/storage/storage.service.ts";

const StoragePage: React.FC = () => {
  const [materialId, setMaterialIds] = useState<IMaterialnameId | null>(null);
  const [material, setMaterial] = useState<IMaterial | null>(null);
  const [isWriteDown, setIsWriteDown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [overviewData, setOverviewData] = useState([
    { property: "Артикул", value: "Не указано" },
    { property: "Штрих-код", value: "Не указано" },
    { property: "Наименование", value: "Не указано" },
    { property: "Альт. название", value: "Не указано" },
    {
      property: "Описание",
      value: "Не указано",
      link: "#",
      linkLabel: "+ Добавить поставщика",
    },
  ]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["storageHierarchyData"],
    queryFn: () => getHierarchyStorage(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: materialsData,
    isLoading: materialsLoading,
    refetch: materialRefetch,
  } = useQuery({
    queryKey: ["materialData", materialId],
    queryFn: () => getMaterialInformation(materialId?.id),
    enabled: !!materialId?.id,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (materialsData) {
      setMaterial(materialsData);

      setOverviewData([
        {
          property: "Артикул",
          value: materialsData.vendor_code || "Не указано",
        },
        { property: "Штрих-код", value: materialsData.barcode || "Не указано" },
        { property: "Наименование", value: materialsData.name || "Не указано" },
        {
          property: "Альт. название",
          value: materialsData.alternative_name || "Не указано",
        },
        {
          property: "Описание",
          value: materialsData.description || "Не указано",
          link: "#",
          linkLabel: "+ Добавить поставщика",
        },
      ]);
    }
  }, [material, materialsData, materialId]);

  const handialMaterialSelect = async (material: IMaterialnameId) => {
    setMaterialIds(material);
    materialRefetch();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };

  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

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

  const rows = [
    { IconComponent: LanOutlined, color: "#0B6BCB", label: "Отдел" },
    { IconComponent: Science, color: "#388E3C", label: "Материал" },
    { IconComponent: Folder, color: "#1E88E5", label: "Категория" },
    { IconComponent: Folder, color: "#7B1FA2", label: "Группа" },
    { IconComponent: Folder, color: "#1565C0", label: "Марка" },
    { IconComponent: Folder, color: "#EF6C00", label: "Линия" },
    { IconComponent: Folder, color: "#FBC02D", label: "Подлиния" },
  ];

  if (isError) {
    toast.error("Произошла ошибка при получении данных.");
  }

  const tabs = [
    { to: "", icon: Science, label: "Каталог Материалов" },
    { to: "", icon: TableChartOutlined, label: "Табличный Вид" },
    {
      to: "",
      icon: Settings,
      label: "Лимиты Остатков",
    },
  ];

  function handleAutocompleteChange(value: any, fieldName: string): void {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const headers = [
    { id: "number", label: "№", align: "left" },
    { id: "date", label: "Дата", align: "left" },
    { id: "action", label: "Действие", align: "left" },
    { id: "price", label: "Закуп. цена", align: "left" },
    { id: "employee", label: "Сотрудник", align: "left" },
  ];

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    setIsEditing(false);
  };

  // ERRORS 500
  const { data: writeOffData, isLoading: writeOffLoading } = useQuery({
    queryKey: ["writeOffData"],
    queryFn: () => writeOff(1),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: purchaseData, isLoading: purchaseLoading } = useQuery({
    queryKey: ["purchaseData"],
    queryFn: () => purchaseMaterial(1),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const renderUpperContent = () => {
    switch (currentTab) {
      case 1:
        return (
          <div className={classes.storage__upper__main__content}>
            <div className={classes.storage__upper__main__content__header}>
              <h5 className={classes.storage__upper__main__content__label}>
                Информация
              </h5>
              <Divider />
              <div className={classes.storage__upper__main__content__items}>
                <p
                  className={
                    classes.storage__upper__main__content__items__title
                  }
                >
                  Табличный вид
                </p>
                <p
                  className={classes.storage__upper__main__content__items__body}
                >
                  На данной странице вы можете редактировать параметры
                  материалов из одной таблицы, не заходя в карту материала.
                  <br />
                  <br />
                  Такой режим может быть удобен для массового изменения цен или
                  артикулов материалов.
                  <br />
                  <br />
                  Выберите нужный раздел каталога слева, просмотрите таблицу
                  внизу и нажмите кнопку "Начать редактирование".
                  <br />
                  <br />
                  Не забудьте сохранить изменения нажатием соответствующей
                  кнопки.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={classes.storage__upper__main__content}>
            <div className={classes.storage__upper__main__content__header}>
              <h5 className={classes.storage__upper__main__content__label}>
                Информация
              </h5>
              <Divider />
              <div className={classes.storage__upper__main__content__items}>
                <p
                  className={
                    classes.storage__upper__main__content__items__title
                  }
                >
                  Лимит закупки{" "}
                </p>
                <p
                  className={classes.storage__upper__main__content__items__body}
                >
                  ПрофСалон автоматически отслеживает расход материалов и
                  предупреждает о необходимости проведения закупки, формируя
                  список заканчивающихся материалов.
                  <br />
                  <br />
                  Поскольку в каждом салоне красоты своя скорость расходования
                  материалов, рекомендуется установить лимит для различных групп
                  материалов.
                  <br />
                  <br />
                  Когда какого-либо материала останется меньше, чем указано в
                  лимите, ПрофСалон автоматически уведомит вас о необходимости
                  проведения закупки данного материала, включив его в список
                  заканчивающихся материалов.
                  <br />
                  <br />
                  Для формирования лимитов закупки необходимо:
                  <br />
                  1. Выбрать раздел, по которому будут устанавливаться лимиты (в
                  каталоге материалов слева, используя кнопку "Ctrl").
                  <br />
                  2. Нажать кнопку "Искать".
                  <br />
                  3. Убедиться, что в результатах поиска выведены необходимые
                  материалы/товары.
                  <br />
                  4. Нажать на кнопку "Редактировать лимиты" (ниже данной
                  справки).
                  <br />
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const renderUpperContentMain = () => {
    switch (currentTab) {
      case 1:
        return (
          <div className={classes.storage__upper__lower}>
            <div className={classes.storage__upper__lower__column}>
              <div className={classes.storage__upper__lower__column__content}>
                <p
                  className={
                    classes.storage__upper__lower__column__content__title
                  }
                >
                  Табличный вид
                </p>
                <p
                  className={
                    classes.storage__upper__lower__column__content__body
                  }
                >
                  Выберите нужные пункты в каталоге материалов или через фильтры
                  поиска справа от него
                </p>
              </div>
              <div className={classes.storage__upper__lower__column__button}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    fontSize: "1.4rem",
                    textTransform: "none",
                    width: "fit-content",
                    p: "0.4rem 1.6rem",
                  }}
                  startIcon={
                    <PlayArrow
                      sx={{
                        fontSize: "2.4rem",
                      }}
                    />
                  }
                  onClick={() => {}}
                >
                  Начать редактирование
                </Button>
              </div>
            </div>
            <Divider />
            <TableView />
          </div>
        );
      case 2:
        return (
          <div className={classes.storage__upper__lower}>
            <div className={classes.storage__upper__lower__column}>
              <div className={classes.storage__upper__lower__column__content}>
                <p
                  className={
                    classes.storage__upper__lower__column__content__title
                  }
                >
                  Настройка лимита закупки
                </p>
                <p
                  className={
                    classes.storage__upper__lower__column__content__body
                  }
                >
                  Выберите нужные пункты в каталоге материалов или через фильтры
                  поиска справа от него
                </p>
              </div>
              <div className={classes.storage__upper__lower__column__button}>
                {!isEditing ? (
                  <Button
                    variant="text"
                    color="primary"
                    sx={{
                      fontSize: "1.4rem",
                      textTransform: "none",
                      width: "fit-content",
                      p: "0.4rem 1.6rem",
                    }}
                    startIcon={
                      <Edit
                        sx={{
                          fontSize: "2.4rem",
                        }}
                      />
                    }
                    onClick={handleEditClick}
                  >
                    Редактировать лимиты
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{
                        fontSize: "1.4rem",
                        textTransform: "none",
                        width: "fit-content",
                        p: "0.4rem 1.6rem",
                        mr: "1.6rem",
                      }}
                      startIcon={
                        <DoNotDisturbAltOutlined
                          sx={{
                            fontSize: "2.4rem",
                          }}
                        />
                      }
                      onClick={handleCancelClick}
                    >
                      Отменить изменения
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{
                        fontSize: "1.4rem",
                        textTransform: "none",
                        width: "fit-content",
                        p: "0.4rem 1.6rem",
                      }}
                      startIcon={
                        <Check
                          sx={{
                            fontSize: "2.4rem",
                          }}
                        />
                      }
                      onClick={handleSaveClick}
                    >
                      Сохранить изменения
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Divider />
            <TableStock />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const renderLowerContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <div className={classes.storage__lower}>
            <Grid container columnSpacing={3} rowSpacing={3}>
              <Grid container md={3.7}>
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <TableVertical data={overviewData} title="Обзор" />
                  </Grid>

                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        { property: "Отдел", value: "Парикмахерский зал" },
                        { property: "Марка", value: "WELLA" },
                        {
                          property: "Линия",
                          value: "WELLA Красители для волос",
                        },
                        { property: "Подлиния", value: "WELLA Color Fresh" },
                      ]}
                      title="Основные характеристики"
                      noIcon
                    />
                  </Grid>

                  <Grid xs={12}>
                    <NormativeService
                      title="Нормативы в услугах"
                      items={[
                        {
                          name: "Мелирование на фольгу",
                          amount: "от 0 до 10 мл",
                        },
                        { name: "Коррекция длины волос", amount: "0 мл" },
                      ]}
                    />
                  </Grid>
                  <Grid xs={12}></Grid>
                </Grid>
              </Grid>

              <Grid container md={3.7}>
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        {
                          property: "Закупочная цена",
                          value: materialsData?.purchase_price,
                        },
                        {
                          property: "Розничная цена",
                          value: materialsData?.retail_price,
                        },
                        {
                          property: "Оптовая цена",
                          value: materialsData?.wholesale_price,
                        },
                        {
                          property: "Отпускная цена",
                          value: materialsData?.selling_price,
                        },
                      ]}
                      title="Цена"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        {
                          property: "Система бонуса",
                          value: "Нет",
                        },
                      ]}
                      title="Бонус за продажу"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        { property: "Размер", value: "0%" },
                        { property: "Действует", value: "Нет данных" },
                        {
                          property: "По акции",
                          value: "",
                          link: "#",
                          linkLabel: "скидка",
                        },
                        {
                          property: "Все скидки",
                          value: "",
                          link: "#",
                          linkLabel: "Показать",
                        },
                      ]}
                      title="Скидка"
                      showAddIcon
                    />
                  </Grid>
                  <Grid xs={12}></Grid>
                </Grid>
              </Grid>

              <Grid container md={4.6}>
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        {
                          property: "Может быть товаром",
                          value: materialsData?.is_product ? "Да" : "Нет",
                        },
                      ]}
                      title="Товар"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical
                      data={[
                        { property: "Ед. измер., материал", value: "мл" },
                        { property: "Объем", value: materialsData?.volume },
                        {
                          property: "Объем норматива",
                          value: materialsData?.norm_volume,
                        },
                        {
                          property: "Вес тары",
                          value: materialsData?.tare_weight,
                        },
                      ]}
                      title="Измерение / объем"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Paper
                      sx={{
                        border: "0.1rem solid #CDD7E1",
                        borderRadius: "8px",
                        boxShadow:
                          "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "2.4rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1.6rem",
                          borderBottom: "0.1rem solid #CDD7E1",
                        }}
                      >
                        <p style={{ fontSize: "2.4rem" }}>
                          {isWriteDown ? "История списаний" : "История закупок"}
                        </p>
                        <Button
                          onClick={() =>
                            !isWriteDown
                              ? setIsWriteDown(true)
                              : setIsWriteDown(false)
                          }
                        >
                          {isWriteDown ? "История закупок" : "История списаний"}
                        </Button>
                      </Box>
                      <div
                        style={{
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <TableContainer
                          sx={{
                            borderRadius: "4px",
                            border: "0.1rem solid #CDD7E1",
                          }}
                        >
                          <Table aria-label="purchase history table">
                            <TableHead
                              sx={{
                                backgroundColor: "#FBFCFE",
                              }}
                            >
                              <TableRow>
                                {headers.map((header) => (
                                  <TableCell
                                    key={header.id}
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                      textAlign: header.align,
                                    }}
                                  >
                                    {header.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            {isWriteDown ? (
                              <TableBody>
                                <TableRow
                                  sx={{
                                    backgroundColor: "white",
                                    "&:last-child td, &:last-child th": {
                                      borderBottom: "none", // Remove the bottom border for the last row
                                    },
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      fontSize: "1.6rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    12321
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    12.12.2020
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    <Link color="primary">action</Link>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    123
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    <Link color="primary">Employee</Link>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            ) : (
                              <TableBody>
                                <TableRow
                                  sx={{
                                    backgroundColor: "white",
                                    "&:last-child td, &:last-child th": {
                                      borderBottom: "none", // Remove the bottom border for the last row
                                    },
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      fontSize: "1.6rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    12321
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    12.12.2020
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    <Link color="primary">action</Link>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    123
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.4rem",
                                      border: "0.1rem solid #CDD7E1",
                                    }}
                                  >
                                    <Link color="primary">Employee</Link>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            )}
                          </Table>
                        </TableContainer>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Pagination
                            page={10}
                            variant="outlined"
                            shape="rounded"
                            boundaryCount={1}
                            color="primary"
                          />
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.storage}>
      <div className={classes.storage__bread}>
        <BreadcrumbsCustom />
      </div>

      <div className={classes.storage__tabs}>
        <ResponsiveTabs
          tabsData={tabs}
          onTabChange={handleTabChange}
          currentTab={currentTab}
        />
      </div>
      <div className={classes.storage__upper}>
        <div className={classes.storage__upper__main}>
          <div className={classes.storage__upper__main__content}>
            <div className={classes.storage__upper__main__content__header}>
              <h5 className={classes.storage__upper__main__content__label}>
                Каталог материалов
              </h5>
              <Divider />
              <div className={classes.storage__upper__main__content__items}>
                {isPending ? <CircularProgress /> : ""}
                <DndProvider backend={HTML5Backend}>
                  <TreeViewStorage
                    categories={data || []}
                    onMaterialSelect={handialMaterialSelect}
                  />
                </DndProvider>
              </div>
              <Divider />
              <div className={classes.storage__upper__main__content__hint}>
                {rows.map((row, index) => (
                  <div
                    className={classes.storage__upper__main__content__hint__row}
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
          <div className={classes.storage__upper__main__search}>
            <h5 className={classes.storage__upper__main__content__label}>
              Основные характеристики
            </h5>
            <Divider />
            <div className={classes.storage__upper__main__search__content}>
              {currentTab === 1 || currentTab === 2 ? (
                <div
                  className={classes.storage__upper__main__search__content__row}
                >
                  <p
                    className={
                      classes.storage__upper__main__search__content__label
                    }
                  >
                    Поиск
                  </p>

                  <CustomTextField
                    label={"Введите текст для поиска"}
                    onChange={(e) =>
                      setFormData({ ...formData, keyword: e.target.value })
                    }
                    size="small"
                  />
                </div>
              ) : (
                <>
                  <div
                    className={
                      classes.storage__upper__main__search__content__row
                    }
                  >
                    <p
                      className={
                        classes.storage__upper__main__search__content__label
                      }
                    >
                      Артикул
                    </p>

                    <CustomTextField
                      label={"Введите артикул"}
                      onChange={(e) =>
                        setFormData({ ...formData, keyword: e.target.value })
                      }
                      size="small"
                    />
                  </div>
                  <div
                    className={
                      classes.storage__upper__main__search__content__row
                    }
                  >
                    <p
                      className={
                        classes.storage__upper__main__search__content__label
                      }
                    >
                      {" "}
                      Штрих-код
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={[]}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          label={"Нажмите и считайте штрих-код"}
                          size="small"
                        />
                      )}
                    />
                  </div>
                  <div
                    className={
                      classes.storage__upper__main__search__content__row
                    }
                  >
                    <p
                      className={
                        classes.storage__upper__main__search__content__label
                      }
                    >
                      Материал
                    </p>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={[]}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          label={"Введите название"}
                          size="small"
                        />
                      )}
                    />
                  </div>
                </>
              )}

              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Отделы
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите отдел"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Категория
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите Категорию"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Группа
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите группу"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Марка
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите марку"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Линия
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите линию"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
                <p
                  className={
                    classes.storage__upper__main__search__content__label
                  }
                >
                  Подлиния
                </p>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[]}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label={"Введите подлинию"}
                      size="small"
                    />
                  )}
                />
              </div>
              <div
                className={classes.storage__upper__main__search__content__row}
              >
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
                  onClick={() => {}}
                >
                  Искать
                </Button>
              </div>
            </div>
          </div>
          {renderUpperContent()}
        </div>
        {renderUpperContentMain()}
      </div>
      {material && !isLoading && renderLowerContent()}
    </div>
  );
};

export default StoragePage;
