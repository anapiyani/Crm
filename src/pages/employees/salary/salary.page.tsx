import { useState, useEffect } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./salary.module.scss";
import { Button, CircularProgress, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";
import StepForm from "./_components/stepform/stepform.component";
import { useQuery } from "@tanstack/react-query";
import {
  editTemplateGet,
  getTemplateList,
} from "@/service/employee/employee.service";
import { ITemplate } from "@/ts/employee.interface";

const SalaryPage = () => {
  const [choosenTemplate, setChoosenTemplate] = useState<number | null>(null);
  const [newTemplate, setNewTemplate] = useState<ITemplate | null>(null);

  const { data: templateList, isLoading } = useQuery({
    queryKey: ["templateList"],
    queryFn: () => getTemplateList(),
  });

  const {
    data: editTemplate,
    isLoading: editTemplateLoading,
    refetch: editTemplateRefetch,
  } = useQuery({
    queryKey: ["editTemplate"],
    queryFn: () => editTemplateGet(choosenTemplate!),
    enabled: !!choosenTemplate,
  });

  useEffect(() => {
    if (templateList) {
      const firstProductionTemplate = templateList.find(
        (template) => template.template_type === "production"
      );
      if (firstProductionTemplate) {
        setChoosenTemplate(firstProductionTemplate.id!);
      }
    }
  }, [templateList]);

  useEffect(() => {
    if (choosenTemplate !== null) {
      setNewTemplate(null);
      editTemplateRefetch();
    }
  }, [choosenTemplate, editTemplateRefetch]);

  const handleAddTemplate = (type: "production" | "management" | "admin") => {
    setChoosenTemplate(null);
    setNewTemplate({
      name: "",
      template_type: type,
      item_sales: {
        subscription_sales: {
          calculation_type: "",
          from_percentage: "",
          to_percentage: "",
          constant_percentage: "",
        },
        certificate_sales: {
          calculation_type: "",
          from_percentage: "",
          to_percentage: "",
          constant_percentage: "",
          from_value: "",
          to_value: "",
        },
        product_sales: {
          revenue_type: "",
          calculation_type: "",
          percentage: "",
          from_percentage: "",
          to_percentage: "",
        },
        revenue_type: "",
      },
      fixed_part: {
        payroll_type: "",
        fixed_amount: "",
        from_amount: "",
        to_amount: "",
        from_value: "",
        to_value: "",
        salary_only_for_worked_time: false,
      },
      floating_part: {
        revenue_dependent_type: "",
        calculation_method: "",
        material_cost_method: "",
        employee_percentage: "",
        own_clients_percentage: "",
        min_amount: "",
        min_amount_period: "",
        bonus_type: "",
        from_percentage: "",
        to_percentage: "",
      },
      client_attraction: {
        calculation_type_client_of_master: "",
        calculation_type_referred_client: "",
        value_client_of_master: "",
        value_referred_client: "",
      },
      client_development: {
        calcualtion_type: "",
        value: "",
      },
      services_with_different_percentage: [
        {
          service: [],
          root: [],
          employee_percentage: "",
          calculation_method: "",
          fixed_amount: "",
        },
      ],
      products_with_different_percentage: [
        {
          material: [],
          root: [],
          employee_percentage: "",
          calculation_method: "",
          fixed_amount: "",
        },
      ],
    });
  };

  const renderTemplateList = (
    type: "production" | "management" | "admin",
    title: string
  ) => (
    <div className={classes.salary__content__list__items__item}>
      <div className={classes.salary__content__list__items__item__header}>
        <h2>{title}</h2>
        <Button startIcon={<Add />} onClick={() => handleAddTemplate(type)}>
          Добавить
        </Button>
      </div>
      <Divider />
      <div className={classes.salary__content__list__items__item__content}>
        {templateList?.map(
          (template) =>
            template.template_type === type && (
              <Button
                key={template.id}
                variant={
                  choosenTemplate === template.id ? "contained" : undefined
                }
                onClick={() => {
                  setChoosenTemplate(template.id!);
                  setNewTemplate(null);
                }}
              >
                <p
                  className={
                    choosenTemplate === template.id ? classes.active : ""
                  }
                >
                  {template.name}
                </p>
              </Button>
            )
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.salary}>
      <BreadcrumbsCustom />
      <div className={classes.salary__header}>
        <h1>Редактирование шаблонов зарплаты</h1>
      </div>
      <div className={classes.salary__content}>
        <div className={classes.salary__content__list}>
          <div className={classes.salary__content__list__header}>
            <h3>Список шаблонов</h3>
            <Divider />
          </div>
          <div className={classes.salary__content__list__items}>
            {renderTemplateList("production", "Производственный персонал")}
            {renderTemplateList("management", "Менеджмент")}
            {renderTemplateList("admin", "Администратор")}
          </div>
        </div>
        <div className={classes.salary__content__settings}>
          <div className={classes.salary__content__list__header}>
            <h3>Настройки шаблона</h3>
            <Divider />
          </div>
          <StepForm toEdit={newTemplate || editTemplate} />
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
