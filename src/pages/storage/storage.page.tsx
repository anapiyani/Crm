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
import {
  Divider,
  CircularProgress,
  Autocomplete,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getServiceParent } from "@/service/services/services.service";
import {
  ISearchResult,
  IServiceParent,
  IfiltersResponse,
} from "@/ts/hierarchy.inteface";
import { IService } from "@/ts/service.interface";
import {
  LanOutlined,
  Folder,
  Science,
  TableChartOutlined,
  Settings,
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

const StoragePage: React.FC = () => {
  const [material, setMaterial] = useState<IMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isPending, isError } = useQuery({
    queryKey: ["storageHierarchyData"],
    queryFn: () => getHierarchyStorage(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const handialMaterialSelect = (material: IMaterial) => {
    setMaterial(material);
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
    { IconComponent: Folder, color: "#1565C0", label: "Группа" },
    { IconComponent: Folder, color: "#7B1FA2", label: "Марка" },
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
        <div className={classes.storage__upper__content}>
          <div className={classes.storage__upper__content__header}>
            <h5 className={classes.storage__upper__content__label}>
              Каталог материалов
            </h5>
            <Divider />
            <div className={classes.storage__upper__content__items}>
              {isPending ? <CircularProgress /> : ""}
              <DndProvider backend={HTML5Backend}>
                <TreeViewStorage
                  categories={data || []}
                  onMaterialSelect={handialMaterialSelect}
                />
              </DndProvider>
            </div>
            <Divider />
            <div className={classes.storage__upper__content__hint}>
              {rows.map((row, index) => (
                <div className={classes.storage__upper__content__hint__row}>
                  <row.IconComponent
                    style={{ color: row.color, fontSize: "24px" }}
                  />
                  <label>{row.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.storage__upper__search}>
          <h5 className={classes.storage__upper__content__label}>
            Основные характеристики
          </h5>
          <Divider />
          <div className={classes.storage__upper__search__content}>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Артикул
              </p>

              <CustomTextField
                label={"Введите артикул"}
                onChange={(e) =>
                  setFormData({ ...formData, keyword: e.target.value })
                }
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
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
                  />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Материал
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите название"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Отделы
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите отдел"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Категория
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите Категорию"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Группа
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите группу"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Марка
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите марку"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Линия
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите линию"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
              <p className={classes.storage__upper__search__content__label}>
                Подлиния
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={[]}
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите подлинию"} />
                )}
              />
            </div>
            <div className={classes.storage__upper__search__content__row}>
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
      </div>
      <div className={classes.storage__lower}>
        <Grid container spacing={3}>
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
                <Box
                  component={Paper}
                  sx={{
                    border: "0.1rem solid #CDD7E1",
                    borderRadius: "8px",
                    boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
                    p: 2,
                  }}
                >
                  <h5 className={classes.storage__lower__grid__section__title}>
                    Плавающая цена
                  </h5>
                  {/* Implement custom floating price table */}
                </Box>
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
                <TableVertical data={discountData} title="Скидка" />
              </Grid>
              <Grid xs={12}>
                <Box
                  component={Paper}
                  sx={{
                    border: "0.1rem solid #CDD7E1",
                    borderRadius: "8px",
                    boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
                    p: 2,
                  }}
                >
                  <h5 className={classes.storage__lower__grid__section__title}>
                    Нормативы в услугах
                  </h5>

                  {/* Implement custom floating price table */}
                </Box>
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
                <Box
                  component={Paper}
                  sx={{
                    border: "0.1rem solid #CDD7E1",
                    borderRadius: "8px",
                    boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
                    p: 2,
                  }}
                >
                  <h5 className={classes.storage__lower__grid__section__title}>
                    Фотография
                  </h5>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: "1.6rem", fontWeight: "400" }}
                  >
                    + Добавить файлы
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12}>
                <TableVertical
                  data={purchaseHistoryData}
                  title="История закупок и списаний"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default StoragePage;
