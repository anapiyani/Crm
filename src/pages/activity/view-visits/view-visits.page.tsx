import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import LabelInfo from "./_components/label-info/label-info.component";
import CardButton from "./_components/card-button/card-button.component";
import {
  CreditCardOffOutlined,
  DeleteOutlineOutlined,
  AnnouncementOutlined,
  RateReviewOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
  Comment,
  Edit,
} from "@mui/icons-material/";
import { Link } from "react-router-dom";

const ViewVisits = () => {
  return (
    <div className={classes.view}>
      <div className={classes.view__header}>
        <BreadcrumbsCustom />
        <h1>Просмотр посещения</h1>
      </div>
      <div className={classes.view__main}>
        <div className={classes.view__main__content}>
          <div className={classes.view__main__content__header}>
            <h2>Информация</h2>
            <Divider />
          </div>
          <div className={classes.view__main__content__body}>
            <div className={classes.view__main__content__body__item}>
              <LabelInfo name={"Номер"} info={"Посещение №43025"} />
              <LabelInfo
                name={"Клиент"}
                info={"Тимур Тастанбеков"}
                isClick={true}
              />
              <LabelInfo
                name={"Характеристика"}
                info={"супруг Амины Оралбаевой"}
              />
              <LabelInfo name={"Начало"} info={"Вчера, 15:21"} />
              <LabelInfo name={"Окончание"} info={"Вчера, 16:21"} />
              <LabelInfo name={"Оплачено"} info={"Да"} />
              <LabelInfo
                name={"Оплату принял"}
                info={"Марина Вишневская"}
                isClick={true}
              />
              <LabelInfo
                name={"Комментарий"}
                info={"Посмотреть"}
                isClick={true}
              />
              <LabelInfo
                name={"Чек от имени"}
                isAutocomplete={true}
                isClick={true}
                info={""}
                placeholder="Текущего сотрудника"
              />
            </div>
          </div>
        </div>
        <div className={classes.view__main__content}>
          <div className={classes.view__main__content__header}>
            <h2>Оплата</h2>
            <Divider />
          </div>
          <div className={classes.view__main__content__body}>
            <div className={classes.view__main__content__body__item}>
              <LabelInfo name={"До скидки"} info={"14 000 руб."} />
              <LabelInfo name={"Скидка"} info={"0 руб."} />
              <LabelInfo name={"Итого"} info={"Вчера, 15:21"} />

              <LabelInfo name={"Оплачено"} info={"14 000 руб."} />
            </div>
          </div>
        </div>
        <div className={classes.view__main__content}>
          <div className={classes.view__main__content__header}>
            <h2>Действия</h2>
            <Divider />
          </div>
          <div className={classes.view__main__content__body}>
            <div className={classes.view__main__content__body__item}>
              <CardButton
                text={"Отменить оплату"}
                icon={CreditCardOffOutlined}
                backgroundIcon={"rgba(221, 231, 238, 1)"}
                colorIcon={"rgba(99, 107, 116, 1)"}
              />
              <CardButton
                text={"Удалить посещение"}
                icon={DeleteOutlineOutlined}
                backgroundIcon={"rgba(252, 228, 228, 1)"}
                colorIcon={"rgba(196, 28, 28, 1)"}
              />
              <CardButton
                text={"Жалоба"}
                icon={AnnouncementOutlined}
                backgroundIcon={"rgba(239, 108, 0, 0.3)"}
                colorIcon={"rgba(239, 108, 0, 1)"}
              />
              <CardButton
                text={"Отзыв"}
                icon={RateReviewOutlined}
                backgroundIcon={"rgba(199, 223, 247, 1)"}
                colorIcon={"rgba(11, 107, 203, 1)"}
              />
              <CardButton
                text={"Оштрафовать"}
                icon={ThumbDownOutlined}
                backgroundIcon={"rgba(156, 39, 176, 0.3)"}
                colorIcon={"rgba(156, 39, 176, 1)"}
              />
              <CardButton
                text={"Премировать"}
                icon={ThumbUpOutlined}
                backgroundIcon={"rgba(46, 125, 50, 0.3)"}
                colorIcon={"rgba(46, 125, 50, 1)"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.view__tables}>
        <div className={classes.view__tables__header}>
          <h1>Услуги и товары</h1>
        </div>
        <div className={classes.view__tables__firstTable}>
          <div className={classes.view__tables__firstTable__header}>
            <h2>Парикмахерский зал</h2>
            <Divider />
          </div>
          <div className={classes.view__tables__firstTable__table}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Услуга</TableCell>
                  <TableCell>Комментарий</TableCell>
                  <TableCell>Материалы</TableCell>
                  <TableCell>Сотрудник</TableCell>
                  <TableCell>Кол-во</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Скидка</TableCell>
                  <TableCell>Итого</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p style={{ fontSize: "1.6rem" }}>
                      Мужская стрижка <br />{" "}
                      <span style={{ fontSize: "1.2rem" }}>
                        Для любой длины
                      </span>
                    </p>
                  </TableCell>
                  <TableCell>
                    <Link className={classes.link} to="/">
                      Добавить комментарий <Comment />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to="/" className={classes.link}>
                      Добавить из посещения
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to="/" className={classes.link}>
                      Имя Фамилия
                    </Link>
                  </TableCell>
                  <TableCell>1 шт.</TableCell>
                  <TableCell>
                    <p>2 200 руб</p>{" "}
                    <Link to="/" className={classes.link}>
                      <Edit
                        sx={{
                          fontSize: "1.5rem",
                        }}
                      />
                      Редактировать
                    </Link>{" "}
                  </TableCell>
                  <TableCell>
                    <p>-</p>
                  </TableCell>
                  <TableCell>
                    <p>2 200 руб.</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
                padding: "1rem",
              }}
            >
              <div>
                <p style={{ fontSize: "1.6rem" }}>
                  Итого по отделу: <strong>2 200 руб</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVisits;
