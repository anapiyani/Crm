import ModalWindow from "@/components/modal-window/modal-window";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import { useState } from "react";
import {
  IClientBalance,
  IPayment,
  IPaymentConfirm,
} from "@/ts/activity.interface";
import { Controller, useForm } from "react-hook-form";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { useConfirmPayment } from "@/service/activity/activity.hook";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/service/activity/activity.service";

const ConfirmPaymentModal = ({
  idPayment,
  total,
  client,
}: {
  idPayment: number | undefined;
  total: number | undefined;
  client: number | undefined;
}) => {
  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useQuery<IClientBalance>({
    queryKey: ["balanceData", client],
    queryFn: () => getBalance(client!.toString()),
  });

  const [checkedValues, setCheckedValues] = useState({
    cash: true,
    card: false,
    check: false,
    account: false,
  });
  const mutation = useConfirmPayment();
  const modal = useModal();
  const { register, handleSubmit, watch, setValue, control } =
    useForm<IPaymentConfirm>();

  const handleCloseModal = () => {
    modal.hide();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValues({
      ...checkedValues,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = (data: IPaymentConfirm) => {
    const payments: IPayment[] = [];

    if (checkedValues.cash) {
      payments.push({ money_type: "cash", amount: data.payments[0].amount });
    }
    if (checkedValues.card) {
      payments.push({ money_type: "card", amount: data.payments[1].amount });
    }
    if (checkedValues.check) {
      payments.push({ money_type: "check", amount: data.payments[2].amount });
    }
    if (checkedValues.account) {
      payments.push({
        money_type: "checking_account",
        amount: data.payments[3].amount,
      });
    }

    const paymentConfirm: IPaymentConfirm = {
      payments,
      comment: data.comment,
      discount_custom: data.discount_custom,
      on_deposit: data.on_deposit,
    };

    if (idPayment) {
      mutation.mutate({ id: idPayment.toString(), paymentConfirm });
    }

    modal.hide();
  };

  return (
    <ModalWindow
      title={"Создание жалобы"}
      titleStyles={{ fontSize: "2.4rem" }}
      open={modal.visible}
      className={classes["u-p-0"]}
      handleClose={handleCloseModal}
      withButtons={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.info}>
          <HeaderTemplate
            children={"Тип оплаты"}
            hasleftChildren={
              <div>
                <p className={classes.total}>Итого: {total}</p>{" "}
                <p className={classes.total}>
                  В депозите: {balanceData?.balance}
                </p>
              </div>
            }
          />
          <div className={classes.info__content}>
            <div className={classes.info__content__date}>
              <div className={classes.info__content__date__checkboxes}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedValues.cash}
                      onChange={handleCheckboxChange}
                      name="cash"
                    />
                  }
                  label="Оплата наличными"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedValues.card}
                      onChange={handleCheckboxChange}
                      name="card"
                    />
                  }
                  label="Оплата по карте"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedValues.check}
                      onChange={handleCheckboxChange}
                      name="check"
                    />
                  }
                  label="Оплата чеками"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedValues.account}
                      onChange={handleCheckboxChange}
                      name="account"
                    />
                  }
                  label="С расчетного счета"
                />
              </div>
            </div>
            <div className={classes.info__content__pay}>
              {checkedValues.cash && (
                <StepInput
                  labelName={"Сумма наличными"}
                  placeholder={"0"}
                  plusMinusBtns={true}
                  afterChild={"₸"}
                  onChange={(value) => {
                    setValue("payments.0.amount", value);
                  }}
                />
              )}
              {checkedValues.card && (
                <StepInput
                  labelName={"Сумма картой"}
                  placeholder={"0"}
                  plusMinusBtns={true}
                  afterChild={"₸"}
                  onChange={(value) => {
                    setValue("payments.1.amount", value);
                  }}
                />
              )}
              {checkedValues.check && (
                <StepInput
                  labelName={"Сумма чеками"}
                  placeholder={"0"}
                  plusMinusBtns={true}
                  afterChild={"₸"}
                  onChange={(value) => {
                    setValue("payments.2.amount", value);
                  }}
                />
              )}
              {checkedValues.account && (
                <StepInput
                  labelName={"Сумма со счета"}
                  placeholder={"0"}
                  plusMinusBtns={true}
                  afterChild={"₸"}
                  onChange={(value) => {
                    setValue("payments.3.amount", value);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={classes.info}>
          <HeaderTemplate children={"Прочее"} />
          <div className={classes.info__content}>
            <div className={classes.info__content}>
              <div className={classes.info__content__date}>
                <StepInput
                  labelName={"Скидка"}
                  placeholder={"0"}
                  plusMinusBtns={true}
                  afterChild={"%"}
                  onChange={(value) => {
                    setValue("discount_custom", value);
                  }}
                />
              </div>
              <div className={classes.info__content__status}>
                <Controller
                  name="on_deposit"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{ width: "240px" }}
                      {...field}
                      selectValue="label"
                      placeholder="Да"
                      size="small"
                      label="На депозит"
                      options={[
                        { value: true, label: "Да" },
                        { value: false, label: "Нет" },
                      ]}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        [
                          { value: true, label: "Да" },
                          { value: false, label: "Нет" },
                        ].find((option) => option.value === field.value) || null
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.info}>
          <HeaderTemplate children={"Комментарии"} />
          <textarea
            placeholder="Введите текст комментария"
            className={classes.info__textarea}
            {...register("comment")}
          />
        </div>
        <div className={classes["buttons"]}>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            startIcon={<Clear />}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<Done />}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

export default NiceModal.create(ConfirmPaymentModal);
