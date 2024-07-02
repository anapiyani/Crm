import flagIcon from "@/assets/icons/Flags.svg";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CustomTextField from "@/components/textField/textField.component";
import Textarea from "@mui/joy/Textarea";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";
import InputCard from "./components/input-card/input-card";
import classes from "./styles.module.scss";
import { IEmployeeAddForm } from "@/ts/types";
import { useAddEmployee } from "@/service/employee/employee.hook";

const EmployeeAdd = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [form, setForm] = useState<IEmployeeAddForm>({
    user: {
      email: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      phone_number_whatsapp: "",
    },
    position: "",
    start_date: new Date().toISOString().split("T")[0],
    city: "",
    city_index: "",
    street: "",
    house: "",
    apartment: "",
    comment: "",
  });

  const mutation = useAddEmployee();

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form.user) {
      setForm((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    const dateString = date ? date.toISOString().split("T")[0] : "";
    setForm((prevForm) => ({
      ...prevForm,
      user: {
        ...prevForm.user,
        date_of_birth: dateString,
      },
    }));
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeMask = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, "");
  };

  const saveEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formToSend = {
      ...form,
      user: {
        ...form.user,
        phone_number: removeMask(form.user.phone_number),
        phone_number_whatsapp: removeMask(form.user.phone_number_whatsapp),
      },
    };
    mutation.mutate(formToSend);
  };

  return (
    <div className={classes["main"]}>
      <div className={classes["main__upper"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["main__upper__title"]}>
          Создание карты сотрудника
        </h1>
        <p className={classes["main__upper__subtitle"]}>
          Вы можете добавить дополнительную информацию здесь либо внести ее
          позже, зайдя в карту сотрудника.
        </p>
      </div>
      <form
        onSubmit={(e) => saveEmployee(e)}
        className={classes["main__lower"]}
      >
        <div className={classes["main__lower__container"]}>
          <InputCard
            title={"Главное"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <CustomTextField
                  label={"Имя"}
                  name="first_name"
                  required
                  onChange={onFormChange}
                />

                <CustomTextField
                  label={"Фамилия"}
                  name="last_name"
                  required
                  onChange={onFormChange}
                />
                <CustomTextField
                  label={"Email"}
                  name="email"
                  type="email"
                  onChange={onFormChange}
                />
                <CustomTextField
                  label={"Должность"}
                  name="position"
                  required
                  onChange={onFormChange}
                />
              </div>
            }
          ></InputCard>
          <InputCard
            title={"Адрес проживания"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <CustomTextField
                  label={"Город"}
                  name="city"
                  required
                  onChange={onFormChange}
                />

                <CustomTextField
                  label={"Индекс"}
                  name="city_index"
                  onChange={onFormChange}
                />

                <CustomTextField
                  label={"Улица"}
                  name="street"
                  onChange={onFormChange}
                  sx={{ marginBottom: "0rem" }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                  }}
                >
                  <CustomTextField
                    label={"Дом"}
                    name="house"
                    required
                    onChange={onFormChange}
                  />

                  <CustomTextField
                    label={"Квартира"}
                    name="apartment"
                    required
                    onChange={onFormChange}
                  />
                </div>
              </div>
            }
          ></InputCard>
          <InputCard
            title={"Главное"}
            children={
              <div>
                <div className={classes["main__lower__container__card"]}>
                  <InputMask
                    mask="+7 (999) 999 9999"
                    value={form.user.phone_number_whatsapp}
                    onChange={onFormChange}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <CustomTextField
                        label={"WhatsApp"}
                        name="phone_number_whatsapp"
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
                        onChange={onFormChange}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="+7 (999) 999 9999"
                    value={form.user.phone_number}
                    onChange={onFormChange}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <CustomTextField
                        label={"Телефон"}
                        name="phone_number"
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
                        onChange={onFormChange}
                      />
                    )}
                  </InputMask>
                  <Autocomplete
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                      { label: "Option 4", value: "4" },
                      { label: "Option 5", value: "5" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <CustomTextField {...params} label={"Выберите опцию"} />
                    )}
                    onChange={(event, newValue) => {
                      setForm((prev) => ({
                        ...prev,
                        option: newValue ? newValue.value : "",
                      }));
                    }}
                  />

                  <DatePicker
                    className={classes["date-chooser"]}
                    selected={dateOfBirth}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Выберите дату рождение"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                  />
                </div>
                <div className={classes["main__lower__container__gender"]}>
                  <p style={{ fontSize: "1.6rem" }}>Пол: </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={form.user.gender}
                      name="gender"
                      row
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          user: {
                            ...prev.user,
                            gender: e.target.value,
                          },
                        }))
                      }
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio size="medium" />}
                        label="Жен."
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Муж."
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            }
          ></InputCard>
          <InputCard
            title={"Комментарий"}
            children={
              <div>
                <Textarea
                  placeholder={"Введите комментарий"}
                  variant={"outlined"}
                  name="comment"
                  onChange={onTextareaChange}
                  sx={{
                    width: "100%",
                    height: "12rem",
                    backgroundColor: "white",
                    boxShadow: "none",
                    fontSize: "1.6rem",
                  }}
                />
              </div>
            }
          ></InputCard>
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
          >
            Сохранить и перейти к карте
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;
