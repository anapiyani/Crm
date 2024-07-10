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

const ClientsAdd = () => {
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
      <form className={classes["main__lower"]}>
        <div className={classes["main__lower__container"]}>
          <InputCard
            title={"Главное"}
            children={
              <div className={classes["main__lower__container__card"]}>
                <VerticalTextField label={"Фамилия"} placeholder={""} />

                <VerticalTextField label={"Имя"} placeholder={""} />

                <VerticalTextField label={"Отчество"} placeholder={""} />

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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Категория
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Доп.категория
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Город
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
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
                  <InputMask
                    mask="+7 (999) 999 9999"
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <CustomTextField
                        size="small"
                        sx={{
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1.6rem",
                            height: "40px",
                          },
                        }}
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
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="+7 (999) 999 9999"
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <CustomTextField
                        size="small"
                        sx={{
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1.6rem",
                            height: "40px",
                          },
                        }}
                        label={"Моб. телефон"}
                        name="phone_number_mobile"
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
                  <CustomTextField
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
              title={"Главное"}
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
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <div className={classes["main__lower__auto"]}>
                        <p className={classes["main__lower__auto__label"]}>
                          Сотрудник
                        </p>
                        <TextField
                          sx={{ height: "40px" }}
                          {...params}
                          className={"main__lower__auto__input"}
                        ></TextField>
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
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <div className={classes["main__lower__auto"]}>
                        <p className={classes["main__lower__auto__label"]}>
                          Источник
                        </p>
                        <TextField
                          {...params}
                          className={"main__lower__auto__input"}
                        ></TextField>
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Рассылка SMS
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
                    </div>
                  )}
                />
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Род занятий
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
                    </div>
                  )}
                />
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Расп. салона
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
                    </div>
                  )}
                />
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <p className={classes["main__lower__auto__label"]}>
                        Кл-т сотрудника
                      </p>
                      <TextField
                        sx={{ height: "40px" }}
                        {...params}
                        className={"main__lower__auto__input"}
                      ></TextField>
                    </div>
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
                    >
                      <FormControlLabel
                        value="female"
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
                        value="male"
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
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Есть"
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
                        control={<Radio />}
                        label="Нет"
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
                  placeholder={"Введите комментарий"}
                  variant={"outlined"}
                  size="lg"
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
          >
            Сохранить и перейти к карте
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientsAdd;
