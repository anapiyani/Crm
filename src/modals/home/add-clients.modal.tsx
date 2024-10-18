import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useForm, Controller } from "react-hook-form";
import ModalWindow from "@/components/modal-window/modal-window";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  SxProps,
} from "@mui/material";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import CustomTextField from "@/components/textField/textField.component";
import InputMask from "react-input-mask";
import { Clear, Done } from "@mui/icons-material";
import flagIcon from "@/assets/icons/Flags.svg";
import classes from "./styles.module.scss";
import { useAddClient } from "@/service/client/client.hook";
import { IClientAddForm, ICreateClientReturn } from "@/ts/client.interface";

type FormValues = {
  surname: string;
  name: string;
  middlename?: string;
  category?: string;
  subcategory?: string;
  city?: string;
  comment?: string;
  gender: "женский" | "мужской";
  whatsapp: string;
  mobile: string;
  email: string;
  instagram?: string;
  occupation?: string;
};

const autoCompleteSx: SxProps = {
  "& .MuiAutocomplete-inputRoot": {
    display: "flex",
    padding: "3px 0px 3px 0px",
    fontSize: "1.4rem",
    maxWidth: "40rem",
    width: "40rem",
    justifyContent: "end",
    "& .MuiAutocomplete-input": {
      fontSize: "1.6rem",
    },
  },
};

const contactSx: SxProps = {
  height: "40px",
  "& .MuiOutlinedInput-root": {
    fontSize: "1.6rem",
    height: "40px",
  },
};

type TProps = {
  showClient: (client: ICreateClientReturn) => void;
};

const AddClients = ({ showClient }: TProps) => {
  const modal = useModal();
  const { mutate: addClient } = useAddClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      gender: "женский",
      category: "Без категории",
      subcategory: "Без категории",
      city: "Не обнаружено",
      occupation: "Не указано",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData: IClientAddForm = {
      user: {
        email: data.email,
        first_name: data.name,
        last_name: data.surname,
        gender: data.gender,
        phone_number: data.mobile,
        phone_number_whatsapp: data.whatsapp,
        date_of_birth: "2002-11-25", // hardcoded date
      },
      category: data.category || "Без категории",
      occupation: data.occupation || "Не указано",
      invite_source: "Не указано", // hardcoded value
      card_number: "Не указано", // hardcoded value
      sms_notification: false, // hardcoded value
      description: data.comment || "",
      description_as_main_characteristic: false, // hardcoded value
      employee: null, // tf is this??? hardcoded value... ig
    };

    addClient(formData, {
      onSuccess: (clientsData) => {
        showClient(clientsData);
        modal.hide();
      },
    });

    modal.hide();
  };

  return (
    <ModalWindow
      title="Быстрое добавление клиента"
      open={modal.visible}
      handleClose={() => modal.hide()}
      afterClose={modal.remove}
      withButtons={false}
      titleStyles={{ fontSize: "2.4rem", color: "#2E7D32" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.client}>
        <div className={classes.client__main}>
          <div className={classes.client__main__header}>
            <h1>Главное</h1>
            <Divider />
          </div>
          <div className={classes.client__main__content}>
            <Controller
              name="surname"
              control={control}
              rules={{ required: "Заполните обязательное поле" }}
              render={({ field }) => (
                <VerticalTextField
                  {...field}
                  type="text"
                  label="Фамилия"
                  placeholder="Фамилия"
                  required
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Заполните обязательное поле" }}
              render={({ field }) => (
                <VerticalTextField
                  {...field}
                  type="text"
                  label="Имя"
                  placeholder="Имя"
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="middlename"
              control={control}
              render={({ field }) => (
                <VerticalTextField
                  {...field}
                  type="text"
                  label="Отчество"
                  placeholder="Отчество"
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  sx={autoCompleteSx}
                  name="category"
                  selectValue="label"
                  size="small"
                  label="Категория"
                  options={[
                    { label: "Без категории", value: "Без категории" },
                    { label: "VIP-клиент", value: "VIP-клиент" },
                    { label: "Постоянный клиент", value: "Постоянный клиент" },
                    { label: "Сотрудник", value: "Сотрудник" },
                  ]}
                  className="main__lower__autocomplete"
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                  placeholder="Выберите категорию"
                />
              )}
            />
            <Controller
              name="subcategory"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  sx={autoCompleteSx}
                  selectValue="label"
                  size="small"
                  label="Доп. категория"
                  options={[{ label: "Не указано", value: "Не указано" }]}
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                  name="subcategory"
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                  className="main__lower__autocomplete"
                  placeholder="Выберите категорию"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  name="city"
                  sx={autoCompleteSx}
                  selectValue="label"
                  size="small"
                  label="Город"
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                  options={[{ label: "Не обнаружено", value: "Не обнаружено" }]}
                  className="main__lower__autocomplete"
                  placeholder="Выберите город"
                />
              )}
            />
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <VerticalTextField
                  {...field}
                  type="text"
                  label="Комментарий"
                  placeholder="Комментарий"
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                  >
                    <FormControlLabel
                      value="женский"
                      control={<Radio />}
                      label="Жен."
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "1.6rem",
                        },
                        "& .MuiSvgIcon-root": {
                          height: "2rem",
                          width: "2rem",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="мужской"
                      control={<Radio />}
                      label="Муж."
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "1.6rem",
                        },
                        "& .MuiSvgIcon-root": {
                          height: "2rem",
                          width: "2rem",
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className={classes.client__addContact}>
          <div className={classes.client__addContact__content}>
            <div className={classes.client__addContact__content__header}>
              <h1>Контакты</h1>
              <Divider />
            </div>
            <div className={classes.client__addContact__content__main}>
              <Controller
                name="whatsapp"
                control={control}
                rules={{ required: "Заполните обязательное поле" }}
                render={({ field }) => (
                  <InputMask
                    mask="+7(999)999 9999"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => (
                      <CustomTextField
                        {...inputProps}
                        size="small"
                        sx={contactSx}
                        placeholder="+7(999)999 9999"
                        label="WhatsApp"
                        error={!!errors.whatsapp}
                        helperText={errors.whatsapp?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={flagIcon}
                                alt="Flag"
                                style={{ width: 24, height: 24 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </InputMask>
                )}
              />
              <Controller
                name="mobile"
                control={control}
                rules={{ required: "Заполните обязательное поле" }}
                render={({ field }) => (
                  <InputMask
                    mask="+7(999)999 9999"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => (
                      <CustomTextField
                        {...inputProps}
                        size="small"
                        sx={contactSx}
                        label="Моб. телефон"
                        placeholder="+7(999)999 9999"
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={flagIcon}
                                alt="Flag"
                                style={{ width: 24, height: 24 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </InputMask>
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Неверный формат email",
                  },
                  required: "Заполните обязательное поле",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    size="small"
                    sx={contactSx}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    size="small"
                    sx={contactSx}
                    label="Instagram"
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.client__addContact}>
            <div className={classes.client__addContact__info}>
              <div className={classes.client__addContact__info__header}>
                <h1>Доп. информация</h1>
                <Divider />
              </div>
              <div className={classes.client__addContact__info__content_info}>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      {...field}
                      sx={autoCompleteSx}
                      selectValue="label"
                      size="small"
                      label="Род занятий"
                      options={[
                        { label: "Не указано", value: "Не указано" },
                        {
                          label: "Безработный/домохозяйка",
                          value: "Безработный/домохозяйка",
                        },
                        { label: "Бизнесмен", value: "Бизнесмен" },
                        { label: "Госслужащий", value: "Госслужащий" },
                        { label: "Инженер", value: "Инженер" },
                        {
                          label: "Офисный сотрудник",
                          value: "Офисный сотрудник",
                        },
                        { label: "Пенсионер", value: "Пенсионер" },
                        { label: "Рабочий", value: "Рабочий" },
                        { label: "Студент", value: "Студент" },
                      ]}
                      className="main__lower__autocomplete"
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        field.value
                          ? { label: field.value, value: field.value }
                          : null
                      }
                      placeholder="Выберите род занятий"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={classes["buttons"]}>
        <Button
          variant="outlined"
          onClick={() => modal.hide()}
          startIcon={<Clear />}
        >
          Отменить
        </Button>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Done />}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Добавить клиента
        </Button>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(AddClients);
