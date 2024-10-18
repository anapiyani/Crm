import { useState } from "react";
import classes from "./styles.module.scss";
import {
  Button,
  Box,
  Divider,
  Chip,
  styled,
  IconButton,
  Collapse,
  Rating,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ReportsHeader from "../../_components/reports-header.component";

const RatingProceduresReport = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
    <div className={classes.ratingProcedureReport}>
      <ReportsHeader />

      <div className={classes.ratingProcedureReport__content}>
        <div className={classes.ratingProcedureReport__content__filters}>
          <div
            className={classes.ratingProcedureReport__content__filters__header}
          >
            <div
              className={
                classes.ratingProcedureReport__content__filters__header__content
              }
            >
              <p
                className={
                  classes.ratingProcedureReport__content__filters__header__content__title
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
          <div className={classes.ratingProcedureReport__content__list}>
            <div
              className={classes.ratingProcedureReport__content__list__header}
            >
              <p
                className={
                  classes.ratingProcedureReport__content__list__header__title
                }
              >
                Список тегов
              </p>
              <Divider />
            </div>

            <div className={classes.ratingProcedureReport__content__list__tags}>
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

export default RatingProceduresReport;
