import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
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
import flagIcon from "@/assets/icons/Flags.svg";
import { Clear, Done } from "@mui/icons-material";

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

const AddClients: React.FC = () => {
  const modal = useModal();

  const handleCloseModal = () => {
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
      <div className={classes.client}>
        <div className={classes.client__main}>
          <div className={classes.client__main__header}>
            <h1>Главное</h1>
            <Divider />
          </div>
          <div className={classes.client__main__content}>
            <VerticalTextField
              type="text"
              label={"Фамилия"}
              placeholder={"Фамилия"}
              required
            />
            <VerticalTextField
              type="text"
              label={"Имя"}
              placeholder={"Имя"}
              required
            />
            <VerticalTextField
              type="text"
              label={"Отчество"}
              placeholder={"Отчество"}
              required
            />
            <CustomAutoComplete
              name="category"
              sx={autoCompleteSx}
              selectValue="label"
              size="small"
              label="Категория"
              options={[]}
              onChange={(value) => {
                console.log(value);
              }}
              className="main__lower__autocomplete"
              placeholder="Выберите категорию"
              value={{ label: "Без категории", value: "no" }}
            />
            <CustomAutoComplete
              name="subcategory"
              sx={autoCompleteSx}
              selectValue="label"
              size="small"
              label="Доп. категория"
              options={[]}
              onChange={(value) => {
                console.log(value);
              }}
              className="main__lower__autocomplete"
              placeholder="Выберите категорию"
              value={{ label: "Без категории", value: "no" }}
            />
            <CustomAutoComplete
              name="city"
              sx={autoCompleteSx}
              selectValue="label"
              size="small"
              label="Город"
              options={[]}
              onChange={(value) => {
                console.log(value);
              }}
              className="main__lower__autocomplete"
              placeholder="Выберите город"
              value={{ label: "Не обноружено", value: "no" }}
            />
            <VerticalTextField
              type="text"
              label={"Комментарий"}
              placeholder={"Комментарий"}
            />
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  row
                  defaultValue="женский"
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
            </div>
          </div>
        </div>
        <div className={classes.client__addContact}>
          <div className={classes.client__addContact__content}>
            <div className={classes.client__addContact__content__header}>
              <h1>Контакты</h1>
              <Divider />
            </div>
            <div className={classes.client__addContact__content__main}>
              <InputMask mask="+7(999)999 9999">
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
                    placeholder="+7(999)999 9999"
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
                  />
                )}
              </InputMask>
              <InputMask mask="+7(999)999 9999">
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
                    placeholder="+7(999)999 9999"
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
              <CustomTextField size="small" sx={contactSx} label={"Email"} />
              <CustomTextField
                size="small"
                sx={contactSx}
                label={"Instagram"}
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
                <CustomAutoComplete
                  name="occupation"
                  sx={autoCompleteSx}
                  selectValue="label"
                  size="small"
                  label="Род занятий"
                  options={[]}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  className="main__lower__autocomplete"
                  placeholder="Выберите род занятий"
                  value={{ label: "Без ", value: "no" }}
                />
              </div>
            </div>
          </div>
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
          Добавить клиента
        </Button>
      </div>
    </ModalWindow>
  );
};

const AddClientsModal = NiceModal.create(AddClients);

export default AddClientsModal;
