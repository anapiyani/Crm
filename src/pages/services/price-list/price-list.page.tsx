import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Divider,
  Radio,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import classes from "./styles.module.scss";
import TableService from "@/components/tables/table-service/table-service";

const departmentData = [
  {
    id: 1,
    name: "Парихмахерский зал",
  },
  {
    id: 2,
    name: "Маникюрный кабинет",
  },
  {
    id: 3,
    name: "Косметология",
  },
  {
    id: 4,
    name: "Массажный кабинет",
  },
  {
    id: 5,
    name: "Солярий",
  },
  {
    id: 6,
    name: "СПА",
  },
  {
    id: 7,
    name: "Фитнес зал",
  },
];

const tableHeaders = [
  "Парикмахерский зал",
  "Стоимость",
  "Стоимость от",
  "Стоимость до",
  "Короткие волосы",
  "Средние волосы",
  "Длинные волосы",
  "Корни",
];

const tableData = [
  {
    id: 1,
    category: "Парикмахерский зал",
    color: "#E0F7FA",
    items: [
      {
        name: "Стрижка",
        cost: "500",
        costFrom: "300",
        costTo: "700",
        shortHair: "200",
        mediumHair: "300",
        longHair: "400",
        roots: "100",
      },
      {
        name: "Окрашивание",
        cost: "1500",
        costFrom: "1000",
        costTo: "2000",
        shortHair: "200",
        mediumHair: "300",
        longHair: "400",
        roots: "100",
      },
    ],
  },
];

const ServicePriceList = () => {
  return (
    <div className={classes["price"]}>
      <BreadcrumbsCustom />
      <FormControl
        sx={{
          width: "100%",
        }}
      >
        <div className={classes["price__upper"]}>
          <div>
            <FormLabel id="department">
              <h5 className={classes["price__upper__header"]}>Отдел</h5>
              <Divider
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </FormLabel>
            <RadioGroup
              aria-labelledby="department"
              className={classes["price__upper__radio-container"]}
            >
              {departmentData.map((department) => (
                <FormControlLabel
                  key={department.id}
                  value={department.name}
                  control={<Radio />}
                  label={
                    <span className={classes["price__upper__radio-text"]}>
                      {department.name}
                    </span>
                  }
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <FormLabel>
              <h5 className={classes["price__upper__header"]}>Секция</h5>
              <Divider
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </FormLabel>
          </div>
          <div>
            <FormLabel>
              <h5 className={classes["price__upper__header"]}>Должность</h5>
              <Divider
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </FormLabel>
          </div>
          <div>
            <FormLabel>
              <h5 className={classes["price__upper__header"]}>Акции</h5>
              <Divider
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </FormLabel>
          </div>
        </div>
      </FormControl>

      <div>
        <TableService headers={tableHeaders} data={tableData} />
      </div>
    </div>
  );
};

export default ServicePriceList;
