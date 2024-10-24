import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Chip, Divider } from "@mui/material";
import { useState } from "react";
import CustomTextField from "@/components/textField/textField.component";
import {
  InsertDriveFile,
  VisibilityOutlined,
  ArrowForward,
  Description,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledIcon = styled("span")<{ fontSize: string }>(({ fontSize }) => ({
  display: "inline-flex",
  fontSize,
}));

const StyledSearchButton = styled(Button)({
  fontSize: "1.4rem",
  textTransform: "none",
  padding: "0.4rem 0.8rem 0.4rem 1.2rem",
  minHeight: "4rem",
  boxShadow: "none",
  borderRadius: "0.8rem",
});

const StyledShowTagsButton = styled(Button)({
  fontSize: "1.4rem",
  color: "#1976d2",
  textTransform: "none",
  padding: "0.2rem 1.2rem",
});

const StyledReportButton = styled(Button)({
  fontSize: "1.4rem",
  textTransform: "none",
  padding: "0.2rem 1.2rem",
  borderRadius: "0.4rem",
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: "#115293",
  },
  minHeight: "3.2rem",
});

const StyledChip = styled(Chip)(({ selected }: { selected: boolean }) => ({
  fontSize: "1.4rem",
  border: "none",
  height: "2.4rem",
  width: "auto",
  backgroundColor: selected ? "#97C3F0" : "#E3EFFB",
}));

const Report = () => {
  const [formData, setFormData] = useState({});
  const [showTags, setShowTags] = useState<boolean>(false);

  const handleTagClick = (
    level: "primary" | "secondary" | "tertiary",
    tag: string
  ) => {
    setSelectedTags((prev) => {
      const newSelection = { ...prev, [level]: tag };

      if (level === "primary") newSelection.secondary = null;
      if (level !== "tertiary") newSelection.tertiary = null;

      return newSelection;
    });
  };

  const toggleShowTags = () => {
    setShowTags((prev) => !prev);
  };

  interface TagCategories {
    primary: string[];
    secondary: Record<string, string[]>;
    tertiary: Record<string, string[]>;
  }

  const tagCategories: TagCategories = {
    primary: [
      "Клиенты",
      "Финансы",
      "Услуги",
      "Склад и материалы",
      "Сотрудники",
      "Прочее",
    ],
    secondary: {
      Клиенты: ["Активные клиенты", "Новые клиенты", "Ушедшие клиенты"],
      Финансы: ["Доходы", "Расходы", "Бюджет"],
      Услуги: ["Предоставленные услуги", "Прайс-листы"],
      "Склад и материалы": ["Инвентарь", "Заказы"],
    },
    tertiary: {
      "Активные клиенты": ["Регулярные", "VIP"],
      Доходы: ["По месяцам", "По годам"],
      Инвентарь: ["Списание", "Пополнение"],
    },
  };

  interface SelectedTags {
    primary: string | null;
    secondary: string | null;
    tertiary: string | null;
  }

  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    primary: null,
    secondary: null,
    tertiary: null,
  });

  return (
    <div className={classes.report}>
      <div className={classes.report__upper}>
        <BreadcrumbsCustom />
        <h1 className={classes.report__upper__title}>Поиск отчетов</h1>
        <div className={classes.reportSearchBar}>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomTextField {...params} label={"По тегам"} size="small" />
            )}
            sx={{ width: "36rem" }}
          />
          <div className={classes.textfield}>
            <CustomTextField
              label={"По названию отчета"}
              onChange={(e) =>
                setFormData({ ...formData, keyword: e.target.value })
              }
              size="small"
            />
          </div>

          <StyledSearchButton variant="contained" color="primary">
            Искать
          </StyledSearchButton>
        </div>
      </div>
      <div className={classes.report__content}>
        <div className={classes.report__tags}>
          <div className={classes.header}>
            <p className={classes.title}>Категории тегов</p>
            <Divider />
          </div>

          <div className={classes.report__tags__list}>
            {tagCategories.primary.map((tag) => (
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

        <div className={classes.report__list}>
          <div className={classes.header}>
            <p className={classes.title}>Список тегов</p>
            {selectedTags.primary &&
            tagCategories.secondary[selectedTags.primary]?.length > 0 ? null : (
              <p className={classes.content__text}>
                Выберите категорию из списка выше, чтобы увидеть список
                доступных тегов, или воспользуйтесь поиском.
              </p>
            )}
            <Divider />
          </div>

          <div className={classes.secondaryTags}>
            {tagCategories.secondary[selectedTags.primary || ""]?.map((tag) => (
              <StyledChip
                key={tag}
                label={tag}
                variant="outlined"
                selected={selectedTags.secondary === tag}
                onClick={() => handleTagClick("secondary", tag)}
              />
            ))}
          </div>
        </div>

        <div className={classes.report__results}>
          <div className={classes.header}>
            <p className={classes.title}>Список отчетов</p>
            {selectedTags.secondary &&
            tagCategories.tertiary[selectedTags.secondary]?.length >
              0 ? null : (
              <p className={classes.content__text}>
                Пожалуйста, выберите хотя бы один тег для поиска отчётов
              </p>
            )}
            <Divider />
          </div>
          {selectedTags.secondary &&
          tagCategories.tertiary[selectedTags.secondary]?.length > 0 ? (
            <div className={classes.reportCard}>
              <div className={classes.reportCard__container}>
                <div className={classes.reportCard__content}>
                  <StyledIcon as={Description} fontSize="2.4rem" />{" "}
                  <p className={classes.reportCard__title}>
                    Отчет по абонементам
                  </p>
                </div>

                <div className={classes.reportCard__actions}>
                  <StyledShowTagsButton
                    variant="text"
                    startIcon={
                      showTags ? (
                        <StyledIcon
                          as={VisibilityOffOutlined}
                          fontSize="2rem"
                        />
                      ) : (
                        <StyledIcon as={VisibilityOutlined} fontSize="2rem" />
                      )
                    }
                    onClick={toggleShowTags}
                  >
                    {showTags ? "Скрыть теги" : "Показать теги"}
                  </StyledShowTagsButton>
                  <StyledReportButton
                    variant="contained"
                    endIcon={<StyledIcon as={ArrowForward} fontSize="2rem" />}
                  >
                    Перейти к отчету
                  </StyledReportButton>
                </div>
              </div>

              {showTags && (
                <div className={classes.reportCard__tags}>
                  <Divider sx={{ my: 1 }} />
                  <div className={classes.reportCard__tagsList}>
                    {tagCategories.tertiary[selectedTags.secondary || ""]?.map(
                      (tag) => (
                        <StyledChip
                          key={tag}
                          label={tag}
                          variant="outlined"
                          selected={selectedTags.tertiary === tag}
                          onClick={() => handleTagClick("tertiary", tag)}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Report;
