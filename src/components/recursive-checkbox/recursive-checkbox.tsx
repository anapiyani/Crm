import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./styles.module.scss";
import { IServiceCategory } from "@/ts/types";

interface ITreeItemProps {
  category: IServiceCategory;
  parentChecked: boolean | null;
  onChildChange: (state: boolean | null) => void;
  onServiceChange: (
    id: number,
    isChecked: boolean,
    type: "service" | "category"
  ) => void;
  preCheckedItems: { id: number; type: "service" | "category" }[];
}

const RecursiveCheckbox: React.FC<ITreeItemProps> = ({
  category,
  parentChecked,
  onChildChange,
  onServiceChange,
  preCheckedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<boolean | null>(null);

  useEffect(() => {
    if (parentChecked !== null) {
      setChecked(parentChecked);
    }
  }, [parentChecked]);

  useEffect(() => {
    const isCategoryChecked = preCheckedItems.some(
      (preChecked) =>
        preChecked.id === category.id && preChecked.type === "category"
    );
    const isAnyServiceChecked = category.services.some((service) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === service.id && preChecked.type === "service"
      )
    );

    if (isCategoryChecked) {
      setChecked(true);
    } else if (isAnyServiceChecked) {
      setChecked(null); // Indeterminate state when some services are checked
    } else if (parentChecked !== null) {
      setChecked(parentChecked);
    } else {
      setChecked(false);
    }
  }, [preCheckedItems, category.services, category.id, parentChecked]);

  const handleCheckboxChange = () => {
    const newChecked = checked === null ? true : !checked;
    setChecked(newChecked);
    propagateCheckState(category, newChecked);
    onChildChange(newChecked ? true : false);
  };

  const propagateCheckState = (
    category: IServiceCategory,
    isChecked: boolean | null
  ) => {
    onServiceChange(category.id, isChecked === true, "category");
    category.services.forEach((service) => {
      onServiceChange(service.id, isChecked === true, "service");
    });
    category.children.forEach((child) => {
      propagateCheckState(child, isChecked);
    });
  };

  const handleServiceCheckboxChange = (serviceId: number) => {
    const newChecked = !preCheckedItems.some(
      (preChecked) =>
        preChecked.id === serviceId && preChecked.type === "service"
    );
    onServiceChange(serviceId, newChecked, "service");
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={classes["tree"]}>
      <div className={classes["tree__branch"]}>
        <input
          type="checkbox"
          checked={checked === true}
          onChange={handleCheckboxChange}
          ref={(el) => {
            if (el) el.indeterminate = checked === null;
          }}
        />
        <span onClick={toggle} className={classes["tree__label"]}>
          {category.name}
          {(category.children.length > 0 || category.services.length > 0) && (
            <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
          )}
        </span>
      </div>
      {isOpen && (
        <div className={classes["tree__open"]}>
          {category.children.map((child) => (
            <RecursiveCheckbox
              key={`category-${child.id}`}
              category={child}
              parentChecked={checked}
              onChildChange={(state) => {
                if (state === null) {
                  setChecked(null);
                } else if (state) {
                  setChecked(true);
                } else {
                  setChecked(false);
                }
              }}
              onServiceChange={onServiceChange}
              preCheckedItems={preCheckedItems}
            />
          ))}
          {category.services.length > 0 && (
            <ul className={classes["tree__service-list"]}>
              {category.services.map((service) => (
                <li
                  key={`service-${service.id}`}
                  className={classes["tree__service"]}
                >
                  <input
                    type="checkbox"
                    checked={preCheckedItems.some(
                      (preChecked) =>
                        preChecked.id === service.id &&
                        preChecked.type === "service"
                    )}
                    onChange={() => handleServiceCheckboxChange(service.id)}
                  />
                  <span className={classes["tree__label"]}>{service.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecursiveCheckbox;
