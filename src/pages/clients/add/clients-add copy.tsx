import React from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import InputCard from "@/components/input-card/input-card";
import CustomTextField from "@/components/textField/textField.component";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import InputMask from "react-input-mask";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Textarea, Checkbox } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./styles.module.scss";
import flagIcon from "@/assets/icons/Flags.svg";

const schema = z.object({
  surname: z.string().min(1, "Заполните обязательное поле"),
  name: z.string().min(1, "Заполните обязательное поле"),
  middlename: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  city: z.string().optional(),
  whatsapp: z.string().min(1, "Заполните обязательное поле"),
  mobile: z.string().min(1, "Заполните обязательное поле"),
  email: z.string().email("Неверный формат"),
  instagram: z.string().optional(),
  employee: z.string().optional(),
  source: z.string().optional(),
  sms_subscription: z.string().optional(),
  occupation: z.string().optional(),
  salon_location: z.string().optional(),
  employee_client: z.string().optional(),
  gender: z.enum(["female", "male"]),
  survey: z.enum(["Есть", "Нет"]),
  comment: z.string().optional(),
  main_characteristic: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const ClientsAdd = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Error message",
      });
      console.log(error);
    }
  };

  return (
    <div className={classes["main"]}>
      <div className={classes["main__upper"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["main__upper__title"]}>
          Создание карты клиента
        </h1>
        <p className={classes["main__upper__subtitle"]}>
          Вы можете добавить дополнительную информацию здесь либо внести ее
          позже, зайдя в карту клиента.
        </p>
      </div>
      <form
        className={classes["main__lower"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes["main__lower__container"]}>
          <InputCard
            title={"Главное"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <VerticalTextField
                  type="text"
                  label={"Фамилия"}
                  placeholder={""}
                  {...register("surname")}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
                <VerticalTextField
                  label={"Имя"}
                  placeholder={""}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <VerticalTextField
                  label={"Отчество"}
                  placeholder={""}
                  {...register("middlename")}
                  error={!!errors.middlename}
                  helperText={errors.middlename?.message}
                />
                <Autocomplete
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30rem",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Категория
                      </p>
                      <TextField
                        {...params}
                        {...register("category")}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                      />
                    </div>
                  )}
                />

                <Autocomplete
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30rem",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Доп. категория
                      </p>
                      <TextField
                        {...params}
                        {...register("subcategory")}
                        error={!!errors.subcategory}
                        helperText={errors.subcategory?.message}
                      />
                    </div>
                  )}
                />
                <Autocomplete
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30rem",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Город
                      </p>
                      <TextField
                        {...params}
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    </div>
                  )}
                />
              </div>
            }
          />
          <div className={classes["main__lower__double"]}>
            <InputCard
              title={"Контакты"}
              children={
                <div className={classes["main__lower__container__cardgrid"]}>
                  <InputMask mask="+7 (999) 999 9999" {...register("whatsapp")}>
                    {(inputProps: any) => (
                      <CustomTextField
                        size="small"
                        {...(inputProps as any)}
                        label={"WhatsApp"}
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
                        error={!!errors.whatsapp}
                        helperText={errors.whatsapp?.message}
                      />
                    )}
                  </InputMask>
                  <InputMask mask="+7 (999) 999 9999" {...register("mobile")}>
                    {(inputProps: any) => (
                      <CustomTextField
                        size="small"
                        {...inputProps}
                        label={"Моб. телефон"}
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
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                      />
                    )}
                  </InputMask>
                  <CustomTextField
                    size="small"
                    label={"Email"}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <CustomTextField
                    size="small"
                    label={"Instagram"}
                    {...register("instagram")}
                    error={!!errors.instagram}
                    helperText={errors.instagram?.message}
                  />
                </div>
              }
            />
            <InputCard
              title={"Привелечение клиента"}
              children={
                <div className={classes["main__lower__container__card"]}>
                  <Autocomplete
                    size="small"
                    sx={{
                      "& .MuiAutocomplete-inputRoot": {
                        padding: "3px 0px 3px 0px",
                        fontSize: "1.4rem",
                        width: "30rem",
                      },
                    }}
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                      { label: "Option 4", value: "4" },
                      { label: "Option 5", value: "5" },
                    ]}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <div className={classes["main__lower__auto"]}>
                        <p className={classes["main__lower__auto__label"]}>
                          Сотрудник
                        </p>
                        <TextField
                          {...params}
                          {...register("employee")}
                          error={!!errors.employee}
                          helperText={errors.employee?.message}
                        />
                      </div>
                    )}
                  />
                  <Autocomplete
                    size="small"
                    sx={{
                      "& .MuiAutocomplete-inputRoot": {
                        padding: "3px 0px 3px 0px",
                        fontSize: "1.4rem",
                        width: "30рем",
                      },
                    }}
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                      { label: "Option 4", value: "4" },
                      { label: "Option 5", value: "5" },
                    ]}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <div className={classes["main__lower__auto"]}>
                        <p className={classes["main__lower__auto__label"]}>
                          Источник
                        </p>
                        <TextField
                          {...params}
                          {...register("source")}
                          error={!!errors.source}
                          helperText={errors.source?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              }
            />
          </div>
          <InputCard
            title={"Дополнительная информация"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30рем",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Рассылка SMS
                      </p>
                      <TextField
                        {...params}
                        {...register("sms_subscription")}
                        error={!!errors.sms_subscription}
                        helperText={errors.sms_subscription?.message}
                      />
                    </div>
                  )}
                />
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30рем",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Род занятий
                      </p>
                      <TextField
                        {...params}
                        {...register("occupation")}
                        error={!!errors.occupation}
                        helperText={errors.occupation?.message}
                      />
                    </div>
                  )}
                />
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30рем",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Расп. салона
                      </p>
                      <TextField
                        {...params}
                        {...register("salon_location")}
                        error={!!errors.salon_location}
                        helperText={errors.salon_location?.message}
                      />
                    </div>
                  )}
                />
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "3px 0px 3px 0px",
                      fontSize: "1.4rem",
                      width: "30рем",
                    },
                  }}
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                    { label: "Option 4", value: "4" },
                    { label: "Option 5", value: "5" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Кл-т сотрудника
                      </p>
                      <TextField
                        {...params}
                        {...register("employee_client")}
                        error={!!errors.employee_client}
                        helperText={errors.employee_client?.message}
                      />
                    </div>
                  )}
                />
                <div className={classes["main__lower__container__gender"]}>
                  <p
                    style={{
                      fontSize: "1.6рем",
                      width: "6рем",
                      textAlign: "end",
                    }}
                  >
                    Пол:{" "}
                  </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Жен."
                        {...register("gender")}
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
                        value="male"
                        control={<Radio />}
                        label="Муж."
                        {...register("gender")}
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
                </div>
                <div className={classes["main__lower__container__survey"]}>
                  <p
                    style={{
                      fontSize: "1.6рем",
                      width: "6рем",
                      textAlign: "end",
                    }}
                  >
                    Анкета:{" "}
                  </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                    >
                      <FormControlLabel
                        value="Есть"
                        control={<Radio />}
                        label="Есть"
                        {...register("survey")}
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
                        value="Нет"
                        control={<Radio />}
                        label="Нет"
                        {...register("survey")}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1.6рем",
                          },
                          "& .MuiSvgIcon-root": {
                            height: "2рем",
                            width: "2рем",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            }
          />
          <InputCard
            title={"Комментарий"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <Textarea
                  defaultValue={""} // Use defaultValue instead of children
                  placeholder={"Введите комментарий"}
                  variant={"outlined"}
                  size="lg"
                  {...register("comment")}
                  sx={{
                    width: "100%",
                    height: "30rem",
                    backgroundColor: "white",
                    boxShadow: "none",
                    fontSize: "1.6rem",
                  }}
                />
                <Checkbox
                  size="lg"
                  label="Основная характеристика"
                  {...register("main_characteristic")}
                  variant="outlined"
                  sx={{
                    fontSize: "1.6rem",
                  }}
                />
              </div>
            }
          />
        </div>
        <div className={classes["main__lower__row"]}>
          <Button
            variant="outlined"
            className={classes["main__lower__row__cancel"]}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            type="submit"
            disableElevation
            className={classes["main__lower__row__save"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Сохранить и перейти к карте"}
          </Button>
          {errors.root && <p>{errors.root.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ClientsAdd;
