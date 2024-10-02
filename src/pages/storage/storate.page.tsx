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
import { IMaterial } from "@/ts/storage.interface";
import { Divider, CircularProgress, Autocomplete, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
import {
  overviewData,
  characteristicsData,
  priceData,
  bonusData,
  discountData,
  normativesData,
  measurementData,
  productData,
  purchaseHistoryData,
} from "./data";
import FloatingPriceTable from "./_components/table-floatingPrice/tableFloatingPrice";
import NormativeService from "./_components/table-normativeService/tableNormativeService";
import PurchaseHistoryTable from "./_components/table-purchaseHistory/tablePurchaseHistory";
import TablePhotography from "./_components/table-photography/tablePhotography.tsx";
import TableView from "./_components/table-view/tableView";
import TableStock from "./_components/table-stock/tableStock.tsx";

const StoragePage: React.FC = () => {
  const [material, setMaterial] = useState<IMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [overviewData, setOverviewData] = useState([
    { property: "Артикул", value: material?.vendor_code || "Не указано" },
    { property: "Штрих-код", value: material?.vendor_code || "Не указано" },
    {
      property: "Наименование",
      value: material?.name || "Не указано",
    },
    {
      property: "Альт. название",
      value: "Не указано",
    },
    {
      property: "Описание",
      value: material?.description || "Не указано",
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
  const handialMaterialSelect = (material: IMaterial) => {
    setMaterial(material);
    console.log(material);
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

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    setIsEditing(false);
  };

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
                  ПрофСалон автоматически отслеживает расход материалов
                  и предупреждает о необходимости проведения закупки, формируя
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
                      data={characteristicsData}
                      title="Основные характеристики"
                      noIcon
                    />
                  </Grid>

                  <Grid xs={12}>
                    <FloatingPriceTable />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container md={3.7}>
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <TableVertical data={priceData} title="Цена" />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical data={bonusData} title="Бонус за продажу" />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical
                      data={discountData}
                      title="Скидка"
                      showAddIcon
                    />
                  </Grid>
                  <Grid xs={12}>
                    <NormativeService
                      title="Нормативы в услугах"
                      items={normativesData}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container md={4.6}>
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <TableVertical data={productData} title="Товар" />
                  </Grid>
                  <Grid xs={12}>
                    <TableVertical
                      data={measurementData}
                      title="Измерение / объем"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TablePhotography />
                  </Grid>
                  <Grid xs={12}>
                    <PurchaseHistoryTable
                      data={purchaseHistoryData}
                      title="История закупок и списаний"
                    />
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
