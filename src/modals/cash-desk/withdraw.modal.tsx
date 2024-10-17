import React, { useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getOperations } from "@/service/kassa/kassa.service";
import { TKassaTransaction } from "@/ts/kassa.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { Clear, Done } from "@mui/icons-material";
import toast from "react-hot-toast";
import useProcessedOperationsData from "@/pages/cash-desk/hooks/useProcessedOperationsData.ts";
import { useKassaTransaction } from "@/service/kassa/kassa.hook";
import useSumm from "./hooks/useOnChangeSumm";

const WithdrawModal = () => {
  const { register, handleSubmit, reset } = useForm<TKassaTransaction>();
  const [selectedMoneyType, setSelectedMoneyType] = useState<
    "cash" | "card" | "check" | "checking_account" | null
  >(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(
    null
  );
  const { summ, setSumm, onChangeSumm } = useSumm();

  const mutation = useKassaTransaction();

  const { data: operationsData } = useQuery({
    queryKey: ["kassaServiceWithdraw"],
    queryFn: () => getOperations("Withdraw", true),
  });

  const onSubmit: SubmitHandler<TKassaTransaction> = async (
    data: TKassaTransaction
  ) => {
    const formData: TKassaTransaction = {
      ...data,
      money_type: selectedMoneyType!,
      operation_category: "withdraw",
    };
    if ((selectedOperationId && selectedMoneyType) || summ === 0) {
      mutation.mutate(formData);
      await modal.hide();
      reset();
    } else {
      toast.error("Заполните все поля");
    }
  };

  const options = useProcessedOperationsData(operationsData);

  const handleCloseModal = () => {
    modal.hide();
  };

  const modal = useModal();
  return (
    <ModalWindow
      title={"Снять деньги из кассы"}
      open={modal.visible}
      handleClose={handleCloseModal}
      className={classes["u-p-0"]}
      titleStyles={{ fontSize: "2.4rem", color: "#C41C1C" }}
      withButtons={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.modalContent}>
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p>Назначение платежа</p>
            <Autocomplete
              sx={{ width: "60%", marginLeft: 1, justifySelf: "right" }}
              options={options}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => {
                setSelectedOperationId(value ? value.value : null);
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.value}
                  style={{ pointerEvents: option.isParent ? "none" : "auto" }}
                >
                  <p
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: option.isParent ? "bold" : "normal",
                      marginLeft: option.isParent ? "0" : "1rem",
                    }}
                  >
                    {option.label}
                  </p>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Выберите операцию"}
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Комментарий</p>
            <TextField
              {...register("comment")}
              variant="outlined"
              sx={{
                width: "60%",
                fontSize: "1.4rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.4rem",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.4rem",
                },
              }}
              label="Введите комментарий"
              size="small"
            />
          </div>
        </div>
        <Divider />
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p>Сумма</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.4rem",
                width: "60%",
              }}
            >
              <TextField
                variant="outlined"
                label="Введите сумму"
                size="small"
                value={summ}
                sx={{
                  fontSize: "1.4rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.4rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.4rem",
                  },
                }}
                {...register("amount", {
                  onChange: onChangeSumm,
                })}
              />
              <Button
                sx={{
                  minWidth: "40px",
                  width: "40px",
                  marginLeft: "10px",
                }}
                variant="outlined"
                onClick={() => setSumm(summ + 1)}
              >
                +
              </Button>
              <Button
                sx={{
                  minWidth: "40px",
                  width: "40px",
                }}
                variant="outlined"
                color="error"
                onClick={() => setSumm(summ - 1)}
              >
                -
              </Button>
              <span>₸</span>
            </div>
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Назначение платежа</p>
            <Autocomplete
              sx={{ width: "60%", marginLeft: 1 }}
              onChange={(event, value) => {
                setSelectedMoneyType(
                  value
                    ? (value.value as
                        | "cash"
                        | "card"
                        | "check"
                        | "checking_account")
                    : null
                );
              }}
              options={[
                { label: "Оплата наличными", value: "cash" },
                { label: "Оплата по карте", value: "card" },
                { label: "Оплата чеками", value: "check" },
                { label: "С расчетного счета", value: "checking_account" },
              ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выберите операцию"
                  variant="outlined"
                />
              )}
            />
          </div>
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
            Снять деньги
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

export default NiceModal.create(WithdrawModal);
