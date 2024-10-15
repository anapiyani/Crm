import React, { useState } from "react";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Button, Box, Divider, Chip, styled, IconButton, Collapse } from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const GeneralReports = () => {
  const [startDate, setStartDate] = useState<string | null>("01.08.2024");
  const [endDate, setEndDate] = useState<string | null>("14.08.2024");
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

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

  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    primary: null,
  });

  const handleTagClick = (level: "primary", tag: string) => {
    setSelectedTags((prev) => {
      const newSelection = { ...prev, [level]: tag };
      return newSelection;
    });
  };

  const tags = [
    "Клиенты",
    "Финансы",
    "Услуги",
    "Склад и материалы",
    "Сотрудники",
    "Прочее",
  ];

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={classes.generalReports}>
      <div className={classes.generalReports__upper}>
        <BreadcrumbsCustom />
        <p className={classes.generalReports__upper__reportTitle}>Название отчета</p>
        <p className={classes.generalReports__upper__reportDescription}>
          Выберите интересующий вас отчет, задайте отчетный период и нажмите на кнопку
          "Создать отчет" или скачайте его в Excel.
        </p>
        <Box className={classes.generalReports__upper__reportSearchBar}>
          <div className={classes.generalReports__upper__reportSearchBar__dateRange}>
            <CustomDatePicker />
            <span>-</span>
            <CustomDatePicker />
          </div>
          <div className={classes.generalReports__upper__reportSearchBar__buttonGroup}>
            <Button variant="outlined" onClick={handleReset}>Сбросить</Button>
            <Button variant="outlined">Скачать в Excel</Button>
            <Button variant="contained" color="primary">Создать отчет</Button>
          </div>
        </Box>
      </div>

      <div className={classes.generalReports__content}>
        <div className={classes.generalReports__content__filters}>
          <div className={classes.generalReports__content__filters__header}>
            <div className={classes.generalReports__content__filters__header__content}>
              <p className={classes.generalReports__content__filters__header__content__title}>
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
          <div className={classes.generalReports__content__list}>
            <div className={classes.generalReports__content__list__header}>
              <p className={classes.generalReports__content__list__header__title}>Список тегов</p>
              <Divider />
            </div>

            <div className={classes.generalReports__content__list__tags}>
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
        </Collapse>
      </div>
    </div>
  );
};

export default GeneralReports;
