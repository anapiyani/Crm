import { useEffect, useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Control, Controller, set } from "react-hook-form";
import { ITemplate } from "@/ts/employee.interface";
import NiceModal from "@ebay/nice-modal-react";
import salaryMaterialsModal from "@/modals/employees/salary-materials-modal";

interface CertificateItem {
  id: string;
  element: React.ReactNode;
}

interface IStorageTextProps {
  id: number;
  isChecked: number;
  type: "material" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string | null;
}

interface GoodsPartProps {
  control: Control<ITemplate>;
}

const SellingGoods: React.FC<GoodsPartProps> = ({ control }) => {
  const [choosenOption, setChoosenOption] = useState<string>(
    control._defaultValues.item_sales?.certificate_sales?.calculation_type ||
      "",
  );
  const [choosenSubOption, setChoosenSubOption] = useState<string>(
    control._defaultValues.item_sales?.subscription_sales?.calculation_type ||
      "",
  );
  const [choosenGoodOption, setChoosenGoodOption] = useState<string>(
    control._defaultValues.item_sales?.product_sales?.calculation_type || "",
  );

  const [certificateContent, setCertificateContent] = useState<
    CertificateItem[]
  >([]);
  const [abonementsWithOtherPercent, setAbonementsWithOtherPercent] = useState<
    CertificateItem[]
  >([]);
  const [goodsWithOtherPercent, setGoodsWithOtherPercent] = useState<
    CertificateItem[]
  >([]);
  const [goodsNames, setGoodsNames] = useState<string[] | undefined>([]);
  const [goodIds, setGoodIds] = useState<number[] | undefined>([]);

  const handleGetIds = () => {
    control._defaultValues.products_with_different_percentage?.map((item) => {
      item?.material?.map((el) => {
        setGoodIds((prev) => [...prev!, el!]);
      });
    });
    control._defaultValues.products_with_different_percentage?.map((item) => {
      item?.root?.map((el) => {
        setGoodsNames((prev) => [...prev!, el!]);
      });
    });
  };

  useEffect(() => {
    handleGetIds();
  }, []);

  const treeTraverse = (data: IStorageTextProps[], item: IStorageTextProps) => {
    let result: string[] = [];
    if (item.parent === null) {
      result.push(item.serviceName);
      return result!;
    }

    const parent = data.find((el) => el.id === item.parent);
    result = [...treeTraverse(data, parent!), ...result];
    if (parent?.isChecked !== 1) {
      result.push(item.serviceName);
    }
    return result;
  };

  const handleListCreate = (data: IStorageTextProps[]) => {
    const services = data.filter((item) => item.type === "material");
    let textResult: string[][] = [];
    services.map((item) => textResult.push(treeTraverse(data, item)));
    const uniqueResult = [...new Set(textResult.map((item) => item.join(">")))];

    return uniqueResult;
  };

  const getServicesFromList = (data: IStorageTextProps[]) => {
    const services = data.filter((item) => item.type === "material");
    return services.map((item) => item.id);
  };

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
                  <p style={{ fontSize: "1.4rem" }}>₸</p>
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
                  <p style={{ fontSize: "1.4rem" }}>₸</p>
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

  const handleOpenGoodsWithOtherPercent = (
    selected: string[] = [],
    percent: number = 0,
    option: { label: string; value: string } = {
      label: "Фикс. сумма",
      value: "fixed_percent",
    },
  ) => {
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
                    defaultValue={percent}
                    style={{
                      width: "12rem",
                      marginRight: "1rem",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p style={{ fontSize: "1.4rem" }}>%</p>
                </div>
                <Autocomplete
                  size="small"
                  defaultValue={option}
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
            <a
              onClick={() =>
                NiceModal.show(salaryMaterialsModal, {
                  materialsIds: goodIds,
                }).then((res) => {
                  getServicesFromList(res as IStorageTextProps[]);
                  const newServiceText: IStorageTextProps[] =
                    res as IStorageTextProps[];
                  handleOpenGoodsWithOtherPercent(
                    handleListCreate(newServiceText),
                    percent,
                    option,
                  );
                  handleDeleteGoods(newId);
                })
              }
              className={classes.linkBtn}
              style={{ fontSize: "1.4rem" }}
            >
              Выбрать товары
            </a>
            {selected.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  fontSize: "1.4rem",
                }}
              >
                {selected.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
            {goodsNames!.length > 0 && (
              <div>
                {goodsNames?.map((item) => (
                  <p key={item} style={{ fontSize: "1.4rem" }}>
                    {item}
                  </p>
                ))}
              </div>
            )}
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
          <Controller
            name="item_sales.revenue_type"
            control={control}
            render={({ field }) => {
              const options = [
                {
                  label: "По чеку (после всех скидок)",
                  value: "by_check_after_discount",
                },
                {
                  label: "По прайсу (без учета скидок)",
                  value: "by_price_before_discount",
                },
              ];

              return (
                <StepInput
                  labelName="Сумма к начислению"
                  isAutoComplete={true}
                  placeholder="По прайсу (без учета скидок)"
                  options={options}
                  selectedOption={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption.value)
                  }
                />
              );
            }}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа сертификатов"} />
        <div className={classes.selling__item__content}>
          <Controller
            name="item_sales.certificate_sales.calculation_type"
            control={control}
            render={({ field }) => {
              const options = [
                { label: "Постоянный процент", value: "constant_percentage" },
                {
                  label: "В зависимости от суммы личных продаж за месяц",
                  value: "amount_dependent_self_month",
                },
                {
                  label: "В зависимости от суммы личных продаж за день",
                  value: "amount_dependent_self_day",
                },
                {
                  label: "В зависимости от суммы общих продаж за месяц",
                  value: "amount_dependent_overall_month",
                },
              ];
              return (
                <StepInput
                  labelName={"Система начисления"}
                  placeholder={"Выберите систему начисления"}
                  isAutoComplete={true}
                  options={options}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value);
                    setChoosenOption(selectedOption.value);
                  }}
                  selectedOption={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                />
              );
            }}
          />
          {choosenOption === "amount_dependent_self_month" ||
          choosenOption === "amount_dependent_self_day" ||
          choosenOption === "amount_dependent_overall_month" ? (
            <>
              <Controller
                name="item_sales.certificate_sales.from_value"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма от"}
                    placeholder={"0"}
                    onChange={(value) => field.onChange(value)}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
              <Controller
                name="item_sales.certificate_sales.to_value"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма до"}
                    placeholder={"0"}
                    onChange={(value) => field.onChange(value)}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
            </>
          ) : (
            <Controller
              name="item_sales.certificate_sales.constant_percentage"
              control={control}
              render={({ field }) => (
                <StepInput
                  isNumber={true}
                  labelName="С сертификатов:"
                  plusMinusBtns={true}
                  placeholder="0"
                  onChange={field.onChange}
                  dataValue={field.value}
                  afterChild={<p>%</p>}
                />
              )}
            />
          )}
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
          <Controller
            name="item_sales.subscription_sales.calculation_type"
            control={control}
            render={({ field }) => {
              const options = [
                {
                  label: "Постоянный процент",
                  value: "constant_percentage",
                },
                {
                  label: "В зависимости от суммы личных продаж за месяц",
                  value: "amount_dependent_self_month",
                },
                {
                  label: "В зависимости от суммы личных продаж за день",
                  value: "amount_dependent_self_day",
                },
                {
                  label: "В зависимости от суммы общих продаж за месяц",
                  value: "amount_dependent_overall_month",
                },
              ];
              return (
                <StepInput
                  labelName="Система начислений"
                  isAutoComplete={true}
                  placeholder="Постоянный процент"
                  options={options}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value);
                    setChoosenSubOption(selectedOption.value);
                  }}
                  selectedOption={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                />
              );
            }}
          />
          {choosenSubOption === "amount_dependent_self_month" ||
          choosenSubOption === "amount_dependent_self_day" ||
          choosenSubOption === "amount_dependent_overall_month" ? (
            <>
              <Controller
                name="item_sales.subscription_sales.from_percentage"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма от"}
                    placeholder={"0"}
                    onChange={field.onChange}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
              <Controller
                name="item_sales.subscription_sales.to_percentage"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма до"}
                    placeholder={"0"}
                    onChange={(value) => field.onChange(value)}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
            </>
          ) : (
            <Controller
              name="item_sales.subscription_sales.constant_percentage"
              control={control}
              render={({ field }) => (
                <StepInput
                  isNumber={true}
                  labelName="С абонементов:"
                  plusMinusBtns={true}
                  placeholder="0"
                  onChange={field.onChange}
                  dataValue={field.value}
                  afterChild={<p>%</p>}
                />
              )}
            />
          )}
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
          <Controller
            name="item_sales.product_sales.calculation_type"
            control={control}
            render={({ field }) => {
              const options = [
                { label: "Постоянный процент", value: "constant_percentage" },
                {
                  label: "В зависимости от суммы личных продаж за месяц",
                  value: "amount_dependent_self_month",
                },
                {
                  label: "В зависимости от суммы личных продаж за день",
                  value: "amount_dependent_self_day",
                },
              ];
              return (
                <StepInput
                  labelName="Система начислений"
                  isAutoComplete={true}
                  options={options}
                  placeholder="По прайсу (без учета скидок)"
                  selectedOption={
                    options.find((options) => options.value === field.value) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value),
                      setChoosenGoodOption(selectedOption.value);
                  }}
                />
              );
            }}
          />
          {choosenGoodOption === "amount_dependent_self_month" ||
          choosenGoodOption === "amount_dependent_self_day" ? (
            <>
              <Controller
                name="item_sales.product_sales.from_percentage"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма от"}
                    placeholder={"0"}
                    onChange={field.onChange}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
              <Controller
                name="item_sales.product_sales.to_percentage"
                control={control}
                render={({ field }) => (
                  <StepInput
                    isNumber={true}
                    labelName={"Сумма до"}
                    placeholder={"0"}
                    onChange={(value) => field.onChange(value)}
                    plusMinusBtns={true}
                    dataValue={field.value || ""}
                  />
                )}
              />
            </>
          ) : (
            <Controller
              name="item_sales.product_sales.percentage"
              control={control}
              render={({ field }) => (
                <StepInput
                  isNumber={true}
                  labelName="С товаров:"
                  plusMinusBtns={true}
                  placeholder="0"
                  onChange={field.onChange}
                  dataValue={field.value}
                  afterChild={<p>%</p>}
                />
              )}
            />
          )}
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
