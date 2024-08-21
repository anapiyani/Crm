import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
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

interface ITreeItemProps {
  id: number;
  isChecked: number;
  type: "service" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string | null;
}

const SearchVisits = () => {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITreeItemProps[]>([]);

  const handleEmployeeSelectionChange = (ids: number[]) => {
    setSelectedEmployeeIds(ids);
    console.log("Selected Employee IDs:", ids);
  };

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
        // Add the item if it's checked
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

    // Determine the new state of the parent based on its children's states
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
      parentCategory.parent_name
    );

    // Recursively propagate the state change to the parent's parent
    onParentChange(parentCategory.parent, parentState);
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
      value: "disapproved_material",
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
      value: "bonus_payment",
    },
    {
      label: "Оплаченные по безналу",
      value: "cashless_payment",
    },
    {
      label: "Только с товарами",
      value: "with_goods",
    },
  ];
  return (
    <div className={classes.visits}>
      <div className={classes.visits__header}>
        <BreadcrumbsCustom />
        <div className={classes.visits__header__text}>
          <h1>Поиск посещений</h1>
        </div>
      </div>
      <div className={classes.visits__content}>
        <div className={classes.visits__content__infos}>
          <div className={classes.visits__content__infos__header}>
            <h2 className={classes["u-header-text"]}>Основная информация</h2>
            <Divider />
          </div>
          <div className={classes.visits__content__infos__form}>
            <CustomAutoComplete
              name={"status"}
              label={"Статус"}
              placeholder="Любой"
              selectValue={"label"}
              options={[
                {
                  value: "1",
                  label: "Любой",
                },
                {
                  value: "2",
                  label: "Посещение завершено и оплачено",
                },
                {
                  value: "3",
                  label: "Посещение идет, клиент в салоне",
                },
              ]}
              size="small"
              labelClassName={classes["u-label"]}
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
            />

            <VerticalTextField
              name={"date"}
              label={"Дата"}
              placeholder="01.01.2021"
              size="small"
              type="double-calendar"
              doubleDivier="-"
              labelClassName={classes["u-label"]}
            />

            <VerticalTextField
              name={"number"}
              label={"Номер"}
              size="small"
              labelClassName={classes["u-label"]}
              placeholder={"№ посещения"}
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
                    <Checkbox
                      size="medium"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 20 },
                      }}
                    />
                  }
                  label={option.label}
                  sx={{
                    "& .MuiTypography-root": { fontSize: "1.4rem" },
                  }}
                />
              ))}
            </FormGroup>

            <CustomAutoComplete
              name={"sorting"}
              label={"Сортировка"}
              placeholder="По дате, по убыванию"
              selectValue={"label"}
              options={[
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
              ]}
              size="small"
              labelClassName={classes["u-label"]}
            />

            <CustomAutoComplete
              name={"check"}
              label={"Чек ККМ"}
              placeholder="Не указано"
              selectValue={"label"}
              options={[
                {
                  value: "1",
                  label: "Не указано",
                },
                {
                  value: "2",
                  label: "Напечатан",
                },
                {
                  value: "3",
                  label: "Не напечатан",
                },
              ]}
              size="small"
              labelClassName={classes["u-label"]}
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
        >
          Сбросить
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Искать
        </Button>
      </div>
    </div>
  );
};

export default SearchVisits;
