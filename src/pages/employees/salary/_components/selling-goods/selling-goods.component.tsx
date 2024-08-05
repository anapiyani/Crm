import { useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface CertificateItem {
  id: string;
  element: React.ReactNode;
}

const SellingGoods = () => {
  const [certificateContent, setCertificateContent] = useState<
    CertificateItem[]
  >([]);
  const [abonementsWithOtherPercent, setAbonementsWithOtherPercent] = useState<
    CertificateItem[]
  >([]);
  const [goodsWithOtherPercent, setGoodsWithOtherPercent] = useState<
    CertificateItem[]
  >([]);

  const handleOpenCertificateContent = () => {
    const newId = `devService-${Date.now()}`;
    const newService: CertificateItem = {
      id: newId,
      element: (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                  marginRight: "12rem",
                }}
              >
                <p style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  % сотрудника
                </p>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <TextField
                    size="small"
                    type="text"
                    placeholder="0"
                    style={{
                      width: "10rem",
                      marginRight: "1rem",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p style={{ fontSize: "1.4rem" }}>руб.</p>
                </div>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Фикс. сумма", value: "fixed_percent" },
                    { label: "% от чека", value: "service_percent" },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1.4rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      fontSize: "1rem",
                      padding: "0.5rem",
                    },
                  }}
                />
              </div>
            </div>
            <StepInput
              labelName={"Сертификаты"}
              placeholder={"Выберите сертификаты"}
              isAutoComplete={true}
              options={[]}
              onChange={() => console.log("certificates")}
            />
            <Button
              className={classes.deleteBtn}
              onClick={() => handleDeleteCertificate(newId)}
            >
              <Delete />
            </Button>
          </div>
          <Divider />
        </div>
      ),
    };
    setCertificateContent((prevDevServices) => [
      ...prevDevServices,
      newService,
    ]);
  };

  const handleOpenAbonementsWithOtherPercent = () => {
    const newId = `devAbonement-${Date.now()}`;
    const newAbonement: CertificateItem = {
      id: newId,
      element: (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                  marginRight: "12rem",
                }}
              >
                <p style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  % сотрудника
                </p>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <TextField
                    size="small"
                    type="text"
                    placeholder="0"
                    style={{
                      width: "10rem",
                      marginRight: "1rem",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p style={{ fontSize: "1.4rem" }}>руб.</p>
                </div>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Фикс. сумма", value: "fixed_percent" },
                    { label: "% от чека", value: "service_percent" },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1.4rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      fontSize: "1rem",
                      padding: "0.5rem",
                    },
                  }}
                />
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Продажа", value: "prosazha" },
                    { label: "Продление", value: "service_percent" },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1.4rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      fontSize: "1rem",
                      padding: "0.5rem",
                    },
                  }}
                />
              </div>
            </div>
            <StepInput
              labelName={"Абонементы"}
              placeholder={"Выберите абонементы"}
              isAutoComplete={true}
              options={[]}
              onChange={() => console.log("certificates")}
            />
            <Button
              className={classes.deleteBtn}
              onClick={() => handleDeleteAbonement(newId)}
            >
              <Delete />
            </Button>
          </div>
          <Divider />
        </div>
      ),
    };
    setAbonementsWithOtherPercent((prevDevServices) => [
      ...prevDevServices,
      newAbonement,
    ]);
  };

  const handleOpenGoodsWithOtherPercent = () => {
    const newId = `devGoods-${Date.now()}`;
    const newGoods: CertificateItem = {
      id: newId,
      element: (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  % сотрудника
                </p>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <TextField
                    size="small"
                    type="text"
                    placeholder="0"
                    style={{
                      width: "12rem",
                      marginRight: "1rem",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p style={{ fontSize: "1.4rem" }}>руб.</p>
                </div>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Фикс. сумма", value: "fixed_percent" },
                    { label: "% от чека", value: "service_percent" },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1.4rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      fontSize: "1rem",
                      padding: "0.5rem",
                    },
                  }}
                />
              </div>
            </div>
            <a className={classes.linkBtn} style={{ fontSize: "1.4rem" }}>
              Выбрать товары
            </a>
            <Button
              className={classes.deleteBtn}
              onClick={() => handleDeleteGoods(newId)}
            >
              <Delete />
            </Button>
          </div>
          <Divider />
        </div>
      ),
    };
    setGoodsWithOtherPercent((prevDevServices) => [
      ...prevDevServices,
      newGoods,
    ]);
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificateContent((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id),
    );
  };

  const handleDeleteAbonement = (id: string) => {
    setAbonementsWithOtherPercent((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id),
    );
  };

  const handleDeleteGoods = (id: string) => {
    setGoodsWithOtherPercent((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id),
    );
  };

  return (
    <div className={classes.selling}>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажи"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Сумма к начислению"
            isAutoComplete={true}
            placeholder="По прайсу (без учета скидок)"
            options={[]}
            onChange={(value) => console.log(value)}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа сертификатов"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С сертификатов:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate
          hasPlus={true}
          children={"Сертификаты с другим процентом"}
          onPlusClick={handleOpenCertificateContent}
        />
        <div className={classes.selling__item__content}>
          {certificateContent.length > 0 ? (
            certificateContent.map((cert) => (
              <div key={cert.id}>{cert.element}</div>
            ))
          ) : (
            <p className={classes.lonlyP}>
              Все сертификаты, продаваемые сотрудником, используют общие
              настройки.
            </p>
          )}
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа абонементов"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С абонементов:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate
          hasPlus={true}
          children={"Абонементы с другим процентом"}
          onPlusClick={handleOpenAbonementsWithOtherPercent}
        />
        <div className={classes.selling__item__content}>
          {abonementsWithOtherPercent.length > 0 ? (
            abonementsWithOtherPercent.map((abonement) => (
              <div key={abonement.id}>{abonement.element}</div>
            ))
          ) : (
            <p className={classes.lonlyP}>
              Все абонементы, продаваемые сотрудником, используют общие
              настройки.
            </p>
          )}
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа товаров"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С товаров:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate
          hasPlus={true}
          onPlusClick={handleOpenGoodsWithOtherPercent}
          children={"Товары с другим процентом"}
        />
        <div className={classes.selling__item__content}>
          {goodsWithOtherPercent.length > 0 ? (
            goodsWithOtherPercent.map((goods) => (
              <div key={goods.id}>{goods.element}</div>
            ))
          ) : (
            <p className={classes.lonlyP}>
              Все товары, продаваемые сотрудником, используют общие настройки.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellingGoods;
