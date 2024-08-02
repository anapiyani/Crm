import React, { useState } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import InputCard from "@/components/input-card/input-card";
import CustomTextField from "@/components/textField/textField.component";
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
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import flagIcon from "@/assets/icons/Flags.svg";
import { Textarea, Checkbox } from "@mui/joy";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddClient } from "@/service/client/client.hook";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { IRolesbyDepartment } from "@/ts/hierarchy.inteface";

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
  employee: z.number().optional(),
  source: z.string().optional(),
  sms_subscription: z.string().optional(),
  occupation: z.string().optional(),
  salon_location: z.string().optional(),
  employee_client: z.number().optional(),
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
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  //tanstack react query tutorial

  const { mutate: addClient } = useAddClient();

  const employeeOptions = [
    { label: "Получено согласие", value: "true" },
    { label: "Запрет на рассылку", value: "false" },
  ];

  const occupationOptions = [
    { label: "Не указано", value: "Не указано" },
    {
      label: "Безработный/домохозяйка",
      value: "Безработный/домохозяйка",
    },
    { label: "Бизнесмен", value: "Бизнесмен" },
    { label: "Госслужащий", value: "Госслужащий" },
    { label: "Инженер", value: "Инженер" },
    { label: "Офисный сотрудник", value: "Офисный сотрудник" },
    { label: "Пенсионер", value: "Пенсионер" },
    { label: "Рабочий", value: "Рабочий" },
    { label: "Студент", value: "Студент" },
  ];

  const salonLocationOptions = [
    { label: "Не указано", value: "Не указано" },
    { label: "Дом салона", value: "Дом салона" },
    { label: "Соседний дом", value: "Соседний дом" },
    { label: "Район", value: "Район" },
    { label: "Далеко", value: "Далеко" },
    { label: "Другой город", value: "Другой город" },
  ];

  const sourceOptions = [
    { label: "Не указано", value: "Не указано" },
    {
      label: "Интернет поисковики",
      value: "Интернет поисковики",
    },
    { label: "Купоны", value: "Купоны" },
    { label: "Листовки", value: "Листовки" },
    {
      label: "По рекомендации клиента",
      value: "По рекомендации клиента",
    },
    {
      label: "По рекомендации конкретного клиента",
      value: "По рекомендации конкретного клиента",
    },
    { label: "Проходил мимо", value: "Проходил мимо" },
    { label: "Реклама в СМИ", value: "Реклама в СМИ" },
    { label: "Реклама наружная", value: "Реклама наружная" },
    { label: "Рекламная печать", value: "Рекламная печать" },
    {
      label: "Родственник сотрудника",
      value: "Родственник сотрудника",
    },
    { label: "Рядом живет", value: "Рядом живет" },
    { label: "Рядом работает", value: "Рядом работает" },
    { label: "Свой клиент", value: "Свой клиент" },
    { label: "Сотрудник", value: "Сотрудник" },
    { label: "Соцсети", value: "Соцсети" },
    {
      label: "Онлайн-запись: сайт",
      value: "Онлайн-запись: сайт",
    },
    {
      label: "Онлайн-запись: vkontakte",
      value: "Онлайн-запись: vkontakte",
    },
    {
      label: "Онлайн-запись: facebook",
      value: "Онлайн-запись: facebook",
    },
    { label: "Яндекс карты", value: "Яндекс карты" },
    {
      label: "Онлайн-запись: мобильное приложение",
      value: "Онлайн-запись: мобильное приложение",
    },
  ];
  const categoryOptions = [
    { label: "Без категории", value: "Без категории" },
    { label: "VIP-клиент", value: "VIP-клиент" },
    { label: "Постоянный клиент", value: "Постоянный клиент" },
    { label: "Сотрудник", value: "Сотрудник" },
  ];
  const subcategoryOptions = [{ label: "Не указано", value: "Не указано" }];
  const cityOptions = [{ label: "Не обнаружено", value: "Не обнаружено" }];

  const hierarchicalData = [
    {
      nodeType: "department",
      nodeName: "Ресепшн",
    },
    {
      nodeType: "role",
      nodeName: "Марина Вишневская, Администратор",
      nodeId: 1,
    },
    {
      nodeType: "role",
      nodeName: "Карина Карина, Администратор",
      nodeId: 2,
    },
    {
      nodeType: "role",
      nodeName: "Джамиля Ортаева, Администратор",
      nodeId: 3,
    },
    {
      nodeType: "role",
      nodeName: "Динара Тюрина, Администратор",
      nodeId: 4,
    },
    {
      nodeType: "department",
      nodeName: "Парикмахерский зал",
    },
    {
      nodeType: "role",
      nodeName: "Миразиз Абидов, Мастер",
      nodeId: 5,
    },
    {
      nodeType: "role",
      nodeName: "Анарa Досмуханова, Мастер-стилист",
      nodeId: 6,
    },
    {
      nodeType: "role",
      nodeName: "Ирина Загитова, Мастер-стилист",
      nodeId: 7,
    },
  ];

  const { data: employeeDepartmentHierarchyData } = useQuery({
    queryKey: ["employeeDepartmentHierarchyData"],
    queryFn: () => getHierarchyEmployeesByDepartment(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(employeeDepartmentHierarchyData);


  const proccessRoleOptions = (roles: IRolesbyDepartment[]) => {
    const results: {
      nodeType: string;
      nodeName: string;
      nodeId?: number;
    }[] = [];
    roles.forEach((role) => {
      results.push({
        nodeType: "department",
        nodeName: role.department,
      });
      role.roles.forEach((r) => {
        results.push({
          nodeType: "role",
          nodeName: r.name,
          nodeId: r.id,
        });
      });
    });
    return results;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const clientData = {
      user: {
        first_name: data.name,
        last_name: data.surname,
        gender: data.gender,
        date_of_birth: "2021-10-10",
        phone_number: data.mobile,
        phone_number_whatsapp: data.whatsapp,
        email: data.email,
      },
      category: data.category || "",
      occupation: data.occupation || "",
      invite_source: data.source || "",
      card_number: "4400430275029991",
      sms_notification: data.sms_subscription === "true" ? true : false,
      description: data.comment || "",
      description_as_main_characteristic: data.main_characteristic || false,
      employee: data.employee || 0,
    };

    addClient(clientData, {
      onSuccess: () => {
        console.log("Client added successfully", clientData);
        reset();
      },
      onError: (error) => {
        console.error("Error adding client", error);
      },
    });
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

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Категория"
                      options={categoryOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        categoryOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />

                <Controller
                  name="subcategory"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Доп. категория"
                      options={subcategoryOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        subcategoryOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Город"
                      options={cityOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        cityOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
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
                  <InputMask mask="+7 999 999 9999" {...register("whatsapp")}>
                    {(inputProps: any) => (
                      <CustomTextField
                        {...(inputProps as any)}
                        size="small"
                        sx={{
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1.6rem",
                            height: "40px",
                          },
                        }}
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
                  <InputMask mask="+7 999 999 9999" {...register("mobile")}>
                    {(inputProps: any) => (
                      <CustomTextField
                        {...inputProps}
                        size="small"
                        sx={{
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1.6rem",
                            height: "40px",
                          },
                        }}
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
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    sx={{
                      height: "40px",
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.6rem",
                        height: "40px",
                      },
                    }}
                    label={"Email"}
                  />
                  <CustomTextField
                    {...register("instagram")}
                    error={!!errors.instagram}
                    helperText={errors.instagram?.message}
                    size="small"
                    sx={{
                      height: "40px",
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.6rem",
                        height: "40px",
                      },
                    }}
                    label={"Instagram"}
                  />
                </div>
              }
            ></InputCard>
            <InputCard
              title={"Привлечение клиента"}
              children={
                <div className={classes["main__lower__container__card"]}>
                  <Controller
                    name="employee"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        size="small"
                        sx={{
                          "& .MuiAutocomplete-inputRoot": {
                            padding: "3px 0px 3px 0px",
                            fontSize: "1.4rem",
                            width: "30rem",
                          },
                        }}
                        options={hierarchicalData}
                        getOptionLabel={(option) => option.nodeName}
                        isOptionEqualToValue={(option, value) =>
                          option.nodeId === value.nodeId
                        }
                        onChange={(event, value) =>
                          field.onChange(value ? value.nodeId : undefined)
                        }
                        renderOption={(props, option) => (
                          <li
                            {...props}
                            key={option.nodeId}
                            style={{
                              pointerEvents:
                                option.nodeType === "department"
                                  ? "none"
                                  : "auto",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "1.6rem",
                                fontWeight:
                                  option.nodeType === "department"
                                    ? "bold"
                                    : "normal",
                                marginLeft:
                                  option.nodeType === "department"
                                    ? "0"
                                    : "1rem",
                              }}
                            >
                              {option.nodeName}
                            </p>
                          </li>
                        )}
                        renderInput={(params) => (
                          <div className={classes["main__lower__auto"]}>
                            <p className={classes["main__lower__auto__label"]}>
                              Сотрудник
                            </p>
                            <TextField
                              sx={{ height: "40px" }}
                              {...params}
                              className={"main__lower__auto__input"}
                              error={!!errors.employee}
                              helperText={errors.employee?.message}
                            />
                          </div>
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="source"
                    control={control}
                    render={({ field }) => (
                      <CustomAutoComplete
                        sx={{
                          "& .MuiAutocomplete-inputRoot": {
                            padding: "3px 0px 3px 0px",
                            fontSize: "1.4rem",
                            maxWidth: "30rem",
                            width: "30rem",
                            justifyContent: "flex-end",
                          },
                        }}
                        {...field}
                        selectValue="label"
                        size="small"
                        label="Источник"
                        options={sourceOptions || []}
                        onChange={(value) => {
                          field.onChange(value?.value);
                        }}
                        value={
                          sourceOptions?.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                      />
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
                <Controller
                  name="sms_subscription"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Рассылка SMS"
                      options={employeeOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        employeeOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />

                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Род занятий"
                      options={occupationOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        occupationOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />

                <Controller
                  name="salon_location"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          maxWidth: "30rem",
                          width: "30rem",
                          justifyContent: "flex-end",
                        },
                      }}
                      {...field}
                      selectValue="label"
                      size="small"
                      label="Расп. салона"
                      options={salonLocationOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        salonLocationOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />

                <Controller
                  name="employee_client"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      size="small"
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 0px",
                          fontSize: "1.4rem",
                          width: "30rem",
                        },
                      }}
                      options={hierarchicalData}
                      getOptionLabel={(option) => option.nodeName}
                      isOptionEqualToValue={(option, value) =>
                        option.nodeId === value.nodeId
                      }
                      onChange={(event, value) =>
                        field.onChange(value ? value.nodeId : undefined)
                      }
                      renderOption={(props, option) => (
                        <li
                          {...props}
                          key={option.nodeId}
                          style={{
                            pointerEvents:
                              option.nodeType === "department"
                                ? "none"
                                : "auto",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "1.6rem",
                              fontWeight:
                                option.nodeType === "department"
                                  ? "bold"
                                  : "normal",
                              marginLeft:
                                option.nodeType === "department" ? "0" : "1rem",
                            }}
                          >
                            {option.nodeName}
                          </p>
                        </li>
                      )}
                      renderInput={(params) => (
                        <div className={classes["main__lower__auto"]}>
                          <p className={classes["main__lower__auto__label"]}>
                            Клиент сотрудника
                          </p>
                          <TextField
                            sx={{ height: "40px" }}
                            {...params}
                            className={"main__lower__auto__input"}
                            error={!!errors.employee_client}
                            helperText={errors.employee_client?.message}
                          />
                        </div>
                      )}
                    />
                  )}
                />

                <div className={classes["main__lower__container__gender"]}>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      width: "6rem",
                      textAlign: "end",
                    }}
                  >
                    Пол:{" "}
                  </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="gender"
                      row
                      defaultValue="female"
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
                <div className={classes["main__lower__container__gender"]}>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      width: "6rem",
                      textAlign: "end",
                    }}
                  >
                    Анкета:{" "}
                  </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="gender"
                      row
                      defaultValue="Нет"
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
              </div>
            }
          />
          <InputCard
            title={"Комментарий"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <Textarea
                  defaultValue={""}
                  placeholder={"Введите комментарий"}
                  variant={"outlined"}
                  size="lg"
                  {...register("comment")}
                  name="comment"
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
                  variant="outlined"
                  {...register("main_characteristic")}
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
