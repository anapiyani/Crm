import React, { useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { useQuery } from "@tanstack/react-query";
import { getOperations } from "@/service/kassa/kassa.service";
import { IKassaOperations, IWithdrawal } from "@/ts/kassa.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { Clear, Done } from "@mui/icons-material";
import { useWithdrawl } from "@/service/kassa/kassa.hook";
import toast from "react-hot-toast";

interface WithdrawModalProps {
  refetchCashRegister: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  refetchCashRegister,
}) => {
  const { register, handleSubmit, control } = useForm<IWithdrawal>();
  const { data: operationsData } = useQuery({
    queryKey: ["kassaService"],
    queryFn: () => getOperations(),
  });

  const mutation = useWithdrawl(refetchCashRegister);
  const [summ, setSumm] = useState<number>(0);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(
    null
  );
  const [selectedMoneyType, setSelectedMoneyType] = useState<string | null>(
    null
  );

  const onSubmit: SubmitHandler<IWithdrawal> = async (data: IWithdrawal) => {
    const formData = {
      ...data,
      operation_type: Number(selectedOperationId),
      money_type: selectedMoneyType!,
    };
    if ((selectedOperationId && selectedMoneyType) || summ === 0) {
      await mutation.mutate(formData);
      modal.hide();
    } else {
      toast.error("Заполните все поля");
    }
  };

  const processOperationsData = (
    operations: IKassaOperations[]
  ): { label: string; value: string; isParent: boolean; id: number }[] => {
    const result: {
      label: string;
      value: string;
      isParent: boolean;
      id: number;
    }[] = [];
    const traverse = (
      nodes: IKassaOperations[],
      parent: IKassaOperations | null
    ) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          result.push({
            label: node.name,
            value: node.id.toString(),
            isParent: true,
            id: node.id,
          });
          traverse(node.children, node);
        } else {
          result.push({
            label: node.name,
            value: node.id.toString(),
            isParent: false,
            id: node.id,
          });
        }
      });
    };
    traverse(operations, null);
    return result;
  };

  const options = operationsData ? processOperationsData(operationsData) : [];

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
              sx={{ width: 330, marginLeft: 1 }}
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
                width: "290px",
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
                onChange: (e) => setSumm(Number(e.target.value)),
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
            <span>руб.</span>
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Назначение платежа</p>
            <Autocomplete
              sx={{ width: 330, marginLeft: 1 }}
              onChange={(event, value) => {
                setSelectedMoneyType(value ? value.value : null);
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
