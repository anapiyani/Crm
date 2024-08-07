import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./styles.module.scss";
import { IService, IServiceCategory } from "@/ts/service.interface";
import { getHierarchyById } from "@/service/hierarchy/hierarchy.service";

interface ITreeItemProps {
  category: IServiceCategory;
  onChildChange: (state: number) => void; // 1 = Checked, 2 = Unchecked, 3 = Indeterminate
  onServiceChange: (
    id: number,
    isChecked: number, // 1 = Checked, 2 = Unchecked, 3 = Indeterminate
    type: "service" | "category",
    name: string,
    parent: number,
    parent_name: string
  ) => void;
  preCheckedItems: { id: number; type: "service" | "category" }[];
}

const RecursiveCheckbox: React.FC<ITreeItemProps> = ({
  category,
  onChildChange,
  onServiceChange,
  preCheckedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<number>(2); // Use 1, 2, 3 for checked, unchecked, and intermediate

  useEffect(() => {
    updateCheckedState();
  }, [preCheckedItems, category.services, category.children]);

  const updateCheckedState = () => {
    const isCategoryChecked = preCheckedItems.some(
      (preChecked) =>
        preChecked.id === category.id && preChecked.type === "category"
    );

    if (isCategoryChecked) {
      setChecked(1);
      onChildChange(1);
      return;
    }

    if (category.services.length === 0 && category.children.length === 0) {
      setChecked(2);
      onChildChange(2);
      return;
    }

    const allServicesChecked = category.services.every((service) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === service.id && preChecked.type === "service"
      )
    );

    const allChildrenChecked = category.children.every((child) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === child.id && preChecked.type === "category"
      )
    );

    const anyServicesChecked = category.services.some((service) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === service.id && preChecked.type === "service"
      )
    );

    const anyChildrenChecked = category.children.some((child) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === child.id && preChecked.type === "category"
      )
    );

    let state = 2; // Default to unchecked

    if (allServicesChecked && allChildrenChecked) {
      state = 1; // All checked
    } else if (anyServicesChecked || anyChildrenChecked) {
      state = 3; // Intermediate
    }

    setChecked(state);
    onChildChange(state);
  };

  const handleCheckboxChange = () => {
    const newChecked = checked === 2 ? 1 : 2; // Toggle between unchecked and checked
    setChecked(newChecked);
    handleCategoryChange(category, newChecked);
    onChildChange(newChecked);
    propagateParentChange(category.parent, newChecked);
  };

  const handleServiceCheckboxChange = async (service: IService) => {
    const newChecked = preCheckedItems.some(
      (preChecked) =>
        preChecked.id === service.id && preChecked.type === "service"
    )
      ? 2
      : 1;
    onServiceChange(
      service.id,
      newChecked,
      "service",
      service.name,
      service.parent!,
      service.parent_name
    );
    propagateParentChange(service.parent, newChecked);
    updateCheckedState();
  };

  const handleCategoryChange = (
    category: IServiceCategory,
    isChecked: number // 1 = Checked, 2 = Unchecked, 3 = Intermediate
  ) => {
    const updateItems = (cat: IServiceCategory, checked: number) => {
      onServiceChange(
        cat.id,
        checked,
        "category",
        cat.name,
        cat.parent!,
        cat.parent_name
      );

      cat.services.forEach((service) =>
        onServiceChange(
          service.id,
          checked,
          "service",
          service.name,
          service.parent!,
          service.parent_name
        )
      );

      cat.children.forEach((child) => updateItems(child, checked));
    };

    updateItems(category, isChecked);
    updateCheckedState();
  };

  const propagateParentChange = async (
    parentCategoryId: number | null,
    childCheckedState: number
  ) => {
    if (parentCategoryId === null) return;

    const parentCategory = await getHierarchyById(parentCategoryId);

    const siblingStates = await Promise.all(
      parentCategory.children.map(async (child) => {
        const childCategory = await getHierarchyById(child.id);

        const isChecked = preCheckedItems.some(
          (preChecked) =>
            preChecked.id === childCategory.id && preChecked.type === "category"
        );

        const allServicesChecked = childCategory.services.every((service) =>
          preCheckedItems.some(
            (preChecked) =>
              preChecked.id === service.id && preChecked.type === "service"
          )
        );

        const allChildrenChecked = childCategory.children.every((subChild) =>
          preCheckedItems.some(
            (preChecked) =>
              preChecked.id === subChild.id && preChecked.type === "category"
          )
        );

        const anyServicesChecked = childCategory.services.some((service) =>
          preCheckedItems.some(
            (preChecked) =>
              preChecked.id === service.id && preChecked.type === "service"
          )
        );

        const anyChildrenChecked = childCategory.children.some((subChild) =>
          preCheckedItems.some(
            (preChecked) =>
              preChecked.id === subChild.id && preChecked.type === "category"
          )
        );

        const isIndeterminate =
          (anyServicesChecked || anyChildrenChecked) &&
          !(allServicesChecked && allChildrenChecked);

        let state = 2; // Default to unchecked (2)

        if (isChecked && allServicesChecked && allChildrenChecked) {
          state = 1; // Checked (1)
        } else if (isIndeterminate) {
          state = 3; // Indeterminate (3)
        }

        return state;
      })
    );

    const allSiblingsChecked = siblingStates.every((state) => state === 1);
    const anySiblingsIndeterminate = siblingStates.some((state) => state === 3);
    const anySiblingsChecked = siblingStates.some((state) => state === 1);

    let parentState = 2; // Default to unchecked (2)

    if (allSiblingsChecked && childCheckedState === 1) {
      parentState = 1; // All checked
    } else if (anySiblingsIndeterminate || childCheckedState === 3) {
      parentState = 3; // Any indeterminate -> parent becomes indeterminate
    } else if (anySiblingsChecked || childCheckedState === 1) {
      parentState = 3; // Mixed state -> parent becomes indeterminate
    }

    console.log("Parent state: ", parentState, parentCategory.name);
    onServiceChange(
      parentCategory.id,
      parentState,
      "category",
      parentCategory.name,
      parentCategory.parent!,
      parentCategory.parent_name
    );

    propagateParentChange(parentCategory.parent, parentState);
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={classes["tree"]}>
      <div className={classes["tree__branch"]}>
        <input
          type="checkbox"
          checked={checked === 1}
          onChange={handleCheckboxChange}
          ref={(el) => {
            if (el) el.indeterminate = checked === 3;
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
              onChildChange={updateCheckedState}
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
                    onChange={() => handleServiceCheckboxChange(service)}
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
