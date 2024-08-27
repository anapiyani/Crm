import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import {
  CircularProgress,
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
  CreditCardOutlined,
  ContentCut,
  Inventory2Outlined,
} from "@mui/icons-material/";
import { Link, useParams } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import reportModal from "@/modals/activity/report.modal";
import feedbackModal from "@/modals/activity/feedback.modal";
import bonusesModule from "@/modals/activity/bonuses.modal";
import fineModal from "@/modals/activity/fine.modal";
import { useQuery } from "@tanstack/react-query";
import { getVisit } from "@/service/activity/activity.service";
import { IViewVistInfo } from "@/ts/activity.interface";
import deleteModal from "@/modals/activity/delete.modal";

const ViewVisits = () => {
  const params = useParams<{ id: string }>();

  const {
    data: visitInfo,
    isLoading: visitLoading,
    isError: visitError,
  } = useQuery<IViewVistInfo>({
    queryKey: ["cardInfoEmployee", params.id],
    queryFn: () => getVisit(params.id || ""),
  });

  if (visitLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const handleDeleteVisit = (id: string | undefined) => {
    NiceModal.show(deleteModal, { id });
  };

  const handleOpenReport = () => {
    NiceModal.show(reportModal);
  };

  const handleOpenFeedBack = () => {
    NiceModal.show(feedbackModal);
  };

  const handleOpenBonuse = () => {
    NiceModal.show(bonusesModule);
  };

  const handleOpenFine = () => {
    NiceModal.show(fineModal);
  };

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
              <LabelInfo name={"Номер"} info={`Посещение ${params.id}`} />
              <LabelInfo
                name={"Клиент"}
                info={`${visitInfo?.client?.first_name} ${visitInfo?.client?.last_name}`}
                isClick={true}
              />
              {visitInfo?.notes && visitInfo?.notes !== "no notes" ? (
                <LabelInfo
                  name={"Характеристика"}
                  info={`${visitInfo?.notes}`}
                />
              ) : null}
              <LabelInfo name={"Начало"} info={`${visitInfo?.start_time}`} />
              <LabelInfo name={"Окончание"} info={`${visitInfo?.end_time}`} />
              <LabelInfo
                name={"Оплачено"}
                info={visitInfo?.status === "completed" ? "Да" : "Нет"}
              />
              <LabelInfo
                name={"Оплату принял"}
                info={`${visitInfo?.written_by.name}`}
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
              <LabelInfo name={"До скидки"} info={`${visitInfo?.do_skidki}`} />
              <LabelInfo name={"Скидка"} info={`${visitInfo?.skidka}`} />
              <LabelInfo name={"Итого"} info={`${visitInfo?.itogo}`} />
              <LabelInfo name={"Оплачено"} info={`${visitInfo?.oplacheno}`} />
            </div>
          </div>
        </div>
        <div className={classes.view__main__content}>
          <div className={classes.view__main__content__header}>
            <h2>Действия</h2>
            <Divider />
          </div>
          <div className={classes.view__main__content__body}>
            {visitInfo?.status === "completed" ? (
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
                  onButtonClick={() => handleDeleteVisit(params.id)}
                />
                <CardButton
                  onButtonClick={handleOpenReport}
                  text={"Жалоба"}
                  icon={AnnouncementOutlined}
                  backgroundIcon={"rgba(239, 108, 0, 0.3)"}
                  colorIcon={"rgba(239, 108, 0, 1)"}
                />
                <CardButton
                  onButtonClick={handleOpenFeedBack}
                  text={"Отзыв"}
                  icon={RateReviewOutlined}
                  backgroundIcon={"rgba(199, 223, 247, 1)"}
                  colorIcon={"rgba(11, 107, 203, 1)"}
                />
                <CardButton
                  onButtonClick={handleOpenFine}
                  text={"Оштрафовать"}
                  icon={ThumbDownOutlined}
                  backgroundIcon={"rgba(156, 39, 176, 0.3)"}
                  colorIcon={"rgba(156, 39, 176, 1)"}
                />
                <CardButton
                  onButtonClick={handleOpenBonuse}
                  text={"Премировать"}
                  icon={ThumbUpOutlined}
                  backgroundIcon={"rgba(46, 125, 50, 0.3)"}
                  colorIcon={"rgba(46, 125, 50, 1)"}
                />
              </div>
            ) : (
              <div className={classes.view__main__content__body__item}>
                <CardButton
                  text={"Оплатить"}
                  icon={CreditCardOutlined}
                  backgroundIcon={"rgba(46, 125, 50, 0.3)"}
                  colorIcon={"rgba(46, 125, 50, 1)"}
                />
                <CardButton
                  text={"Добавить услуги"}
                  icon={ContentCut}
                  backgroundIcon={"rgba(199, 223, 247, 1)"}
                  colorIcon={"rgba(11, 107, 203, 1)"}
                />
                <CardButton
                  text={"Добавить товары"}
                  icon={Inventory2Outlined}
                  backgroundIcon={"rgba(239, 108, 0, 0.3)"}
                  colorIcon={"rgba(239, 108, 0, 1)"}
                />
                <CardButton
                  text={"Добавить абонементы/сертификаты"}
                  backgroundIcon={"rgba(199, 223, 247, 1)"}
                  colorIcon={"rgba(11, 107, 203, 1)"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {(visitInfo && visitInfo?.material_purchases.length > 0) ||
        (visitInfo && visitInfo?.salary_info.length > 0) ||
        (visitInfo && visitInfo.appointment_services.length > 0 && (
          <div className={classes.view__tables}>
            <div className={classes.view__tables__header}>
              <h1>Услуги и товары</h1>
            </div>
            {visitInfo && visitInfo?.material_purchases.length > 0 && (
              <div className={classes.view__tables__firstTable}>
                <div className={classes.view__tables__firstTable__header}>
                  <h2>Магазин</h2>
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
                      {visitInfo.material_purchases.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell>
                            <p style={{ fontSize: "1.6rem" }}>
                              {purchase.material_name} <br />{" "}
                              <span style={{ fontSize: "1.2rem" }}>
                                {purchase.material || "Для любой длины"}
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
                          <TableCell>{purchase.quantity} шт.</TableCell>
                          <TableCell>
                            <p>{purchase.price} руб</p>{" "}
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
                            <p>{purchase.price} руб.</p>
                          </TableCell>
                        </TableRow>
                      ))}
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
            )}
            {visitInfo && visitInfo?.appointment_services.length > 0 && (
              <div className={classes.view__tables__firstTable}>
                <div className={classes.view__tables__firstTable__header}>
                  <h2>Услуги</h2>
                  <Divider />
                </div>
                <div className={classes.view__tables__firstTable__table}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Услуга</TableCell>
                        <TableCell>Материалы</TableCell>
                        <TableCell>Сотрудник</TableCell>
                        <TableCell>Кол-во</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Скидка</TableCell>
                        <TableCell>Итого</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visitInfo?.appointment_services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <p style={{ fontSize: "1.6rem" }}>
                              {service.service_name} <br />{" "}
                              <span style={{ fontSize: "1.2rem" }}>
                                {service.parameter || "Для любой длины"}
                              </span>
                            </p>
                          </TableCell>
                          <TableCell>
                            {service.materials?.map((material) => (
                              <p key={material.id}>
                                {material.material_name} - {material.quantity}
                                шт.
                              </p>
                            ))}
                            <Link to="/" className={classes.link}>
                              Добавить материалы
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to="/" className={classes.link}>
                              {visitInfo.employee_name}
                            </Link>
                          </TableCell>
                          <TableCell>{service.quantity} шт.</TableCell>
                          <TableCell>
                            <p>{service.summa} руб</p>{" "}
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
                            <p>{service.discount_service || "-"}</p>
                          </TableCell>
                          <TableCell>
                            <p>{service.total_summ} руб.</p>
                          </TableCell>
                        </TableRow>
                      ))}
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
                        Итого по отделу: <strong>4950</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {visitInfo && visitInfo?.salary_info.length > 0 && (
              <div className={classes.secondTable}>
                <div className={classes.secondTable__header}>
                  <h1
                    style={{
                      paddingBottom: "1rem",
                      paddingTop: "3rem",
                      fontSize: "3.4rem",
                      fontWeight: 400,
                    }}
                  >
                    Зарплаты
                  </h1>
                </div>
                <div className={classes.view__tables__firstTable__table}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Сотрудник</TableCell>
                        <TableCell>Статья зарплаты</TableCell>
                        <TableCell>Тип статьи</TableCell>
                        <TableCell>Выручка</TableCell>
                        <TableCell>Материалы</TableCell>
                        <TableCell>Зарплата</TableCell>
                        <TableCell>Формула з/п</TableCell>
                        <TableCell>Начислено</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visitInfo.salary_info.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Link className={classes.link} to="/">
                              <p style={{ fontSize: "1.6rem" }}>
                                {item.service} <br />{" "}
                              </p>
                            </Link>
                            <span style={{ fontSize: "1.2rem" }}>
                              {item.description}
                            </span>
                          </TableCell>
                          <TableCell>
                            {item.type.map((typeItem, i) => (
                              <div key={i}>{typeItem[1]}</div>
                            ))}
                          </TableCell>
                          <TableCell>1 шт.</TableCell>
                          <TableCell>
                            <p>{item.revenue} руб.</p>{" "}
                          </TableCell>
                          <TableCell>
                            <p>0 руб.</p>
                          </TableCell>
                          <TableCell>
                            <p>+{item.salary_change} руб.</p>
                          </TableCell>
                          <TableCell>
                            <p>{item.salary} руб.</p>
                          </TableCell>
                          <TableCell>
                            <p>
                              {new Date(item.date).toLocaleDateString("ru-RU")}
                            </p>
                            <br />
                            <span>Автоматически</span>
                          </TableCell>
                        </TableRow>
                      ))}
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
                        Итого зарплаты начислено:{" "}
                        <strong>
                          {visitInfo.salary_info.reduce(
                            (total, item) => total + item.salary_change,
                            0,
                          )}{" "}
                          руб
                        </strong>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ViewVisits;
