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
import { ITemplateList } from "@/ts/employee.interface";

const SalaryPage = () => {
  const [choosenTemplate, setChoosenTemplate] = useState<number | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<ITemplateList> | null>(
    null,
  );

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
        (template) => template.type === "production",
      );
      if (firstProductionTemplate) {
        setChoosenTemplate(firstProductionTemplate.id);
      }
    }
  }, [templateList]);

  useEffect(() => {
    if (choosenTemplate !== null) {
      setNewTemplate(null);
      editTemplateRefetch();
    }
  }, [choosenTemplate, editTemplateRefetch]);

  const handleAddTemplate = (
    type: "production" | "management" | "admin" | undefined,
  ) => {
    setChoosenTemplate(null);
    setNewTemplate({
      name: "",
      type: type,
      fixed_components: [],
      floating_components: [],
      product_sales_components: [],
    });
  };

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
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Производственный персонал</h2>
                <Button
                  startIcon={<Add />}
                  onClick={() => handleAddTemplate("production")}
                >
                  Добавить
                </Button>
              </div>
              <Divider />
              <div
                className={classes.salary__content__list__items__item__content}
              >
                {templateList?.map(
                  (template) =>
                    template.type === "production" && (
                      <Button
                        key={template.id}
                        variant={
                          choosenTemplate === template.id
                            ? "contained"
                            : undefined
                        }
                        onClick={() => {
                          setChoosenTemplate(template.id);
                          setNewTemplate(null);
                        }}
                      >
                        <p
                          className={
                            choosenTemplate === template.id
                              ? classes.active
                              : ""
                          }
                        >
                          {template.name}
                        </p>
                      </Button>
                    ),
                )}
              </div>
            </div>
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Менеджмент</h2>
                <Button
                  startIcon={<Add />}
                  onClick={() => handleAddTemplate("management")}
                >
                  Добавить
                </Button>
              </div>
              <Divider />
              <div
                className={classes.salary__content__list__items__item__content}
              >
                {templateList?.map(
                  (template) =>
                    template.type === "management" && (
                      <Button
                        key={template.id}
                        variant={
                          choosenTemplate === template.id
                            ? "contained"
                            : undefined
                        }
                        onClick={() => {
                          setChoosenTemplate(template.id);
                          setNewTemplate(null);
                        }}
                      >
                        <p
                          className={
                            choosenTemplate === template.id
                              ? classes.active
                              : ""
                          }
                        >
                          {template.name}
                        </p>
                      </Button>
                    ),
                )}
              </div>
            </div>
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Администратор</h2>
                <Button
                  startIcon={<Add />}
                  onClick={() => handleAddTemplate("admin")}
                >
                  Добавить
                </Button>
              </div>
              <Divider />
              <div
                className={classes.salary__content__list__items__item__content}
              >
                {templateList?.map(
                  (template) =>
                    template.type === "admin" && (
                      <Button
                        key={template.id}
                        variant={
                          choosenTemplate === template.id
                            ? "contained"
                            : undefined
                        }
                        onClick={() => {
                          setChoosenTemplate(template.id);
                          setNewTemplate(null);
                        }}
                      >
                        <p
                          className={
                            choosenTemplate === template.id
                              ? classes.active
                              : ""
                          }
                        >
                          {template.name}
                        </p>
                      </Button>
                    ),
                )}
              </div>
            </div>
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
