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

const SearchVisits = () => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          voluptatibus debitis, asperiores illo aspernatur excepturi hic
          veritatis necessitatibus dolore, quaerat magnam provident unde
          reiciendis qui nostrum distinctio quos ut ratione incidunt dicta
          doloremque minima eum iusto! Explicabo nihil nemo quia consequatur,
          mollitia beatae aliquam. Quas, saepe at soluta minus ab, laboriosam
          tenetur fuga perspiciatis expedita, eius libero consequatur quia
          voluptatem nostrum aliquam. Necessitatibus voluptas ut rerum
          doloribus, voluptate neque qui, eligendi quidem nihil atque laudantium
          a dolor vitae non quasi. Ducimus eum vitae enim et quod voluptate.
          Corporis saepe ipsa dignissimos iure aut expedita, illo officiis,
          quibusdam vel ratione fugit? Quia quaerat quo numquam doloremque
          necessitatibus velit molestiae aspernatur fugit eaque ab, repudiandae
          magni ipsam consectetur sit quae nam accusamus pariatur unde? Incidunt
          expedita vitae asperiores quasi nulla ratione praesentium facere,
          fuga, mollitia, dicta tempore veritatis maiores ex doloribus? Quae
          eligendi minima iusto?
        </div>
        <div className={classes.visits__content__infos}>
          <div className={classes.visits__content__infos__header}>
            <h2 className={classes["u-header-text"]}>Основная информация</h2>
            <Divider />
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          voluptatibus debitis, asperiores illo aspernatur excepturi hic
          veritatis necessitatibus dolore, quaerat magnam provident unde
          reiciendis qui nostrum distinctio quos ut ratione incidunt dicta
          doloremque minima eum iusto! Explicabo nihil nemo quia consequatur,
          mollitia beatae aliquam. Quas, saepe at soluta minus ab, laboriosam
          tenetur fuga perspiciatis expedita, eius libero consequatur quia
          voluptatem nostrum aliquam. Necessitatibus voluptas ut rerum
          doloribus, voluptate neque qui, eligendi quidem nihil atque laudantium
          a dolor vitae non quasi. Ducimus eum vitae enim et quod voluptate.
          Corporis saepe ipsa dignissimos iure aut expedita, illo officiis,
          quibusdam vel ratione fugit? Quia quaerat quo numquam doloremque
          necessitatibus velit molestiae aspernatur fugit eaque ab, repudiandae
          magni ipsam consectetur sit quae nam accusamus pariatur unde? Incidunt
          expedita vitae asperiores quasi nulla ratione praesentium facere,
          fuga, mollitia, dicta tempore veritatis maiores ex doloribus? Quae
          eligendi minima iusto?
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
