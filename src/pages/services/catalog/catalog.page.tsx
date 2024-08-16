import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  getHierarchy,
  getHierarchySearchOption,
  getSearchResults,
} from "@/service/hierarchy/hierarchy.service";
import { getServiceParent } from "@/service/services/services.service";
import { IService } from "@/ts/service.interface";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  LanOutlined,
  Folder,
  ContentCut,
} from "@mui/icons-material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";
import TreeView from "@/components/treeItem/treeItem";

import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
import { useEffect, useState } from "react";

import {
  IfiltersResponse,
  ISearchResult,
  IServiceParent,
} from "@/ts/hierarchy.inteface";
import dayjs from "dayjs";
import CostTable from "./service/_components/table-price/table-price";
import {
  costData,
  durationData,
  materialData,
} from "./service/_components/table-price/data";
import MaterialTable from "./service/_components/table-materials/table-materials";
import Calculation from "./service/_components/calculation/calculation";

const ServiceCatalog = () => {
  const [service, setService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const [searchResults, setSearchResults] = useState<ISearchResult>();
  const [serviceParents, setServiceParents] = useState<IServiceParent[]>();
  const handleOptionLoad = () => {
    getHierarchySearchOption().then((data) => setFilterOptions(data));
  };
  const [filterOptions, setFilterOptions] = useState<IfiltersResponse>();
  const { data, isPending, isError } = useQuery({
    queryKey: ["hierarchyData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const handleServiceSelect = (service: IService) => {
    setService(service);
    getServiceParent(service.id).then((data) => setServiceParents(data));

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };

  const handleSearch = () => {
    getSearchResults(formData).then((data) => setSearchResults(data));
  };

  useEffect(() => {
    handleOptionLoad();
  }, []);

  const rows = [
    { IconComponent: LanOutlined, color: "#0B6BCB", label: "Отдел" },
    { IconComponent: Folder, color: "#1E88E5", label: "Секция" },
    { IconComponent: Folder, color: "#1565C0", label: "Тип" },
    { IconComponent: Folder, color: "#7B1FA2", label: "Группа" },
    { IconComponent: Folder, color: "#EF6C00", label: "Категория" },
    { IconComponent: Folder, color: "#FBC02D", label: "Подкатегория" },
    { IconComponent: ContentCut, color: "#388E3C", label: "Услуга" },
  ];

  if (isError) {
    toast.error("Произошла ошибка при получении данных.");
  }

  function handleAutocompleteChange(value: any, fieldName: string): void {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  return (
    <div className={classes.catalog}>
      <div className={classes.catalog__bread}>
        <BreadcrumbsCustom />
      </div>

      <div className={classes.catalog__upper}>
        <div className={classes.catalog__upper__content}>
          <div className={classes.catalog__upper__content__header}>
            <h5 className={classes.catalog__upper__content__label}>
              Каталог услуг
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
                <div className={classes.catalog__upper__content__hint__row}>
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
                Услуга
              </p>

              <CustomTextField
                label={"Введите Услугу"}
                onChange={(e) =>
                  setFormData({ ...formData, keyword: e.target.value })
                }
              />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                {" "}
                Отдел
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
                Секция
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={filterOptions?.sections || []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue?.name, "section")
                }
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите Секцию"} />
                )}
              />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Тип
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={filterOptions?.service_types || []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue?.name, "service_type")
                }
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите Тип"} />
                )}
              />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Категория
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={filterOptions?.categories || []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue?.name, "category")
                }
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите Категорию"} />
                )}
              />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Подкатегория
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={filterOptions?.subcategories || []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue?.name, "subcategory")
                }
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите Подкатегорию"} />
                )}
              />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Должность
              </p>
              <Autocomplete
                sx={{ width: "100%" }}
                options={filterOptions?.roles || []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleAutocompleteChange(newValue?.name, "role")
                }
                renderInput={(params) => (
                  <CustomTextField {...params} label={"Введите должность"} />
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
      </div>

      <div className={classes.catalog__lower}>
        {isLoading ? (
          <div style={{ height: "250px" }}></div>
        ) : (
          <div className={classes.catalog__lower__service}>
            <div className={classes.catalog__lower__info}>
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card1}
                title={"Обзор"}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.name}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Отобр. онлайн</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.active ? "Да" : "Нет"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Продолж. мин</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.duration.toString() + " мин"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p> Мин. объем</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={
                          service?.min_volume.toString() +
                          " " +
                          service?.unit_mes
                        }
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Статус</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={
                          service?.is_deleted ? "Удалено" : "Активно"
                        }
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p> Цвет в журнале </p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Нет цвета"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
                openEnabled={false}
              />
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card2}
                title={"Основные характеристики"}
                openEnabled={false}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    {serviceParents?.map((parent) => (
                      <div
                        key={parent.id}
                        className={classes.catalog__lower__info__row}
                      >
                        <p>{parent.level}</p>
                        <TextField
                          className={classes.catalog__lower__info__row__input}
                          disabled
                          variant="standard"
                          defaultValue={parent.name}
                          sx={{
                            "& .MuiInputBase-root.Mui-disabled:before": {
                              fontSize: "1.6rem",
                              borderBottom: "0.5px solid #636b744d",
                            },
                          }}
                        />
                      </div>
                    ))}
                  </div>
                }
              />
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card3}
                title={"Скидка"}
                openEnabled={false}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Скидка</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.discount.size + "%"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
              />
            </div>
            <div className={classes.catalog__lower__service__wrapper}>
              <div className={classes.catalog__lower__service__wrapper__header}>
                <h1>Стоимость</h1>
              </div>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Должность</TableCell>
                    <TableCell>Стоимость</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Мастер</TableCell>
                    <TableCell>1000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        <CostTable title="Стоимость" unit="руб." data={costData} />
        <CostTable
          title="Продолжительность"
          unit="мин"
          showIcons={false}
          data={durationData}
          hierarchy
        />
        <MaterialTable title="Материалы" data={materialData} />
        <Calculation
          material="Материалы салона"
          employeePercentage="50%"
          position="Универсал"
          employeeName="Имя Фамилия"
        />
      </div>
    </div>
  );
};

export default ServiceCatalog;
