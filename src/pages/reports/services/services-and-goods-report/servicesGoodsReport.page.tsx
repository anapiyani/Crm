import { useState } from "react";
import classes from "./styles.module.scss";
import ReportsHeader from "../../_components/reports-header.component";
import {
  Chip,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import {
  getHierarchy,
  getHierarchyById,
} from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory } from "@/ts/service.interface";
import { useQuery } from "@tanstack/react-query";
import RadioButtons from "../../general-reports/paid-visits-report/_components/radiogroup";
import PaymentFilter from "../../general-reports/paid-visits-report/_components/paymentFilter";

type ITreeItemProps = {
  id: number;
  isChecked: number;
  type: "service" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string | null;
};

const reportOptions = [
  { value: "allPositions", label: "Все позиции" },
  { value: "services", label: "Услуги" },
  { value: "goods", label: "Товары" },
  { value: "giftCertificates", label: "Подарочные сертификаты" },
  { value: "memberships", label: "Абонементы" },
];

const StyledMenuItem = styled(MenuItem)({
  fontSize: 16,
});

const tags = [
  "Клиенты",
  "Финансы",
  "Услуги",
  "Склад и материалы",
  "Сотрудники",
  "Прочее",
];

const StyledChip = styled(Chip)(({ selected }: { selected: boolean }) => ({
  fontSize: "1.4rem",
  border: "none",
  height: "2.4rem",
  width: "auto",
  backgroundColor: selected ? "#97C3F0" : "#E3EFFB",
}));

type SelectedTags = {
  primary: string | null;
};

const ServicesGoodsReport = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<ITreeItemProps[]>([]);

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

  const handleServiceChange = (
    id: number,
    isChecked: number,
    type: "service" | "category",
    serviceName: string,
    parent: number | null,
    parent_name: string | null
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
    childCheckedState: number
  ) => {
    if (parentCategoryId === null) return;

    const parentCategory = await getHierarchyById(parentCategoryId);
    const childStates = parentCategory.children.map((child) => {
      const isChecked = selectedItems.some(
        (item) => item.id === child.id && item.type === "category"
      );

      const allServicesChecked = child.services.every((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service"
        )
      );

      const allChildrenChecked = child.children.every((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category"
        )
      );

      const anyChildrenChecked = child.children.some((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category"
        )
      );

      const anyServicesChecked = child.services.some((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service"
        )
      );

      if (allServicesChecked && allChildrenChecked) {
        return 1;
      } else if (
        (anyServicesChecked || anyChildrenChecked) &&
        !(allServicesChecked && allChildrenChecked)
      ) {
        return 3;
      } else {
        return 2;
      }
    });

    const allChecked = childStates.every((state) => state === 1);
    const anyIndeterminate = childStates.some((state) => state === 3);

    let parentState = 2;

    if (allChecked) {
      parentState = 1;
    } else if (anyIndeterminate || childCheckedState === 3) {
      parentState = 3;
    }

    handleServiceChange(
      parentCategory.id,
      parentState,
      "category",
      parentCategory.name,
      parentCategory.parent!,
      parentCategory.parent_name
    );

    onParentChange(parentCategory.parent, parentState);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    primary: null,
  });

  const handleTagClick = (level: "primary", tag: string) => {
    setSelectedTags((prev) => {
      const newSelection = { ...prev, [level]: tag };
      return newSelection;
    });
  };

  return (
    <div className={classes.servicesGoodsReport}>
      <ReportsHeader />
      <div className={classes.servicesGoodsReport__content}>
        <div className={classes.servicesGoodsReport__content__filters}>
          <div
            className={classes.servicesGoodsReport__content__filters__header}
          >
            <div
              className={
                classes.servicesGoodsReport__content__filters__header__content
              }
            >
              <p
                className={
                  classes.servicesGoodsReport__content__filters__header__content__title
                }
              >
                Фильтры отчета
              </p>
              <IconButton onClick={toggleExpand}>
                {isExpanded ? (
                  <ExpandLess sx={{ fontSize: "2.4rem" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "2.4rem" }} />
                )}
              </IconButton>
            </div>
            <Divider />
          </div>
        </div>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div className={classes.servicesGoodsReport__content__list}>
            <div className={classes.servicesGoodsReport__content__list__header}>
              <p
                className={
                  classes.servicesGoodsReport__content__list__header__title
                }
              >
                Список тегов
              </p>
              <Divider />
            </div>

            <div className={classes.servicesGoodsReport__content__list__tags}>
              {tags.map((tag) => (
                <StyledChip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  selected={selectedTags.primary === tag}
                  onClick={() => handleTagClick("primary", tag)}
                />
              ))}
            </div>
          </div>

          <div className={classes.servicesGoodsReport__content__list}>
            <div className={classes.servicesGoodsReport__content__list__header}>
              <p
                className={
                  classes.servicesGoodsReport__content__list__header__title
                }
              >
                Услуги
              </p>
              <Divider />
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                placeholder="Введите текст для поиска..."
              />
              <div
                className={
                  classes.servicesGoodsReport__content__list__header__checkbox
                }
              >
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
          <div className={classes.servicesGoodsReport__content__list}>
            <div className={classes.servicesGoodsReport__content__list__header}>
              <p
                className={
                  classes.servicesGoodsReport__content__list__header__title
                }
              >
                Товары
              </p>
              <Divider />
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                placeholder="Введите текст для поиска..."
              />
              <div
                className={
                  classes.servicesGoodsReport__content__list__header__checkbox
                }
              >
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

          <div className={classes.servicesGoodsReport__content__list}>
            <div className={classes.servicesGoodsReport__content__list__header}>
              <p
                className={
                  classes.servicesGoodsReport__content__list__header__title
                }
              >
                Отображать в отчете
              </p>
              <Divider />
              <RadioButtons
                options={reportOptions}
                defaultValue="allPositions"
              />
            </div>
          </div>
          <div className={classes.servicesGoodsReport__content__list}>
            <div className={classes.servicesGoodsReport__content__list__header}>
              <p
                className={
                  classes.servicesGoodsReport__content__list__header__title
                }
              >
                Сотрудники
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"Выберите сотрудника"}
              >
                <StyledMenuItem value="Выберите сотрудника">
                  Выберите сотрудника
                </StyledMenuItem>
              </TextField>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default ServicesGoodsReport;
