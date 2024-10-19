import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./styles.module.scss";
import { IService, IServiceCategory } from "@/ts/service.interface";
import { getHierarchyById } from "@/service/hierarchy/hierarchy.service";

interface ITreeItemProps {
  category: IServiceCategory;
  onServiceChange: (
    id: number,
    isChecked: number,
    type: "service" | "category",
    name: string,
    parent: number | null,
    parent_name: string | null
  ) => void;
  preCheckedItems: {
    id: number;
    type: "service" | "category";
    isChecked: number;
  }[];
  onParentChange?: (parentId: number | null, childCheckedState: number) => void;
}

const RecursiveCheckbox: React.FC<ITreeItemProps> = ({
  category,
  onServiceChange,
  preCheckedItems,
  onParentChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<number>(2); // 1: Checked, 2: Unchecked, 3: Indeterminate

  useEffect(() => {
    updateCheckedState();
  }, [preCheckedItems, category.services, category.children]);

  const updateCheckedState = () => {
    if (category.children.length === 0 && category.services.length === 0) {
      setChecked(2);
      return;
    }

    const allServicesChecked = category.services.every((service) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === service.id &&
          preChecked.type === "service" &&
          preChecked.isChecked === 1
      )
    );

    const allChildrenChecked = category.children.every((child) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === child.id &&
          preChecked.type === "category" &&
          preChecked.isChecked === 1
      )
    );

    const anyServicesChecked = category.services.some((service) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === service.id &&
          preChecked.type === "service" &&
          preChecked.isChecked === 1
      )
    );

    const anyChildrenChecked = category.children.some((child) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === child.id &&
          preChecked.type === "category" &&
          preChecked.isChecked === 1
      )
    );

    let state = 2; // Default to unchecked

    // Set state to 1 if all services and children are fully checked
    if (allServicesChecked && allChildrenChecked) {
      state = 1; // All checked
    } else if (anyServicesChecked || anyChildrenChecked) {
      state = 3; // Indeterminate
    }
    setChecked(state);
  };

  const handleCheckboxChange = () => {
    const newChecked = checked === 2 ? 1 : 2; // Toggle between unchecked and checked
    setChecked(newChecked);
    handleCategoryChange(category, newChecked);

    if (category.parent !== null) {
      propagateParentChange(category.parent, newChecked);
    }
  };

  const handleServiceCheckboxChange = (service: IService) => {
    const newChecked = preCheckedItems.some(
      (preChecked) =>
        preChecked.id === service.id &&
        preChecked.type === "service" &&
        preChecked.isChecked === 1
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

    if (service.parent !== null) {
      propagateParentChange(service.parent, newChecked);
    }
  };

  const handleCategoryChange = (
    category: IServiceCategory,
    isChecked: number // 1 = Checked, 2 = Unchecked
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
    propagateParentChange(category.parent, isChecked);
  };

  const propagateParentChange = async (
    parentCategoryId: number | null,
    childCheckedState: number
  ) => {
    if (!parentCategoryId) return;

    const parentCategory = await getHierarchyById(parentCategoryId);

    const childStates = parentCategory.children.map((child) => {
      const isChecked = preCheckedItems.some(
        (item) => item.id === child.id && item.type === "category"
      );

      const allServicesChecked = child.services.every((service) =>
        preCheckedItems.some(
          (item) =>
            item.id === service.id &&
            item.type === "service" &&
            item.isChecked === 1
        )
      );

      const allChildrenChecked = child.children.every((subChild) =>
        preCheckedItems.some(
          (item) =>
            item.id === subChild.id &&
            item.type === "category" &&
            item.isChecked === 1
        )
      );

      const anyServicesChecked = child.services.some((service) =>
        preCheckedItems.some(
          (item) =>
            item.id === service.id &&
            item.type === "service" &&
            item.isChecked === 1
        )
      );

      const anyChildrenChecked = child.children.some((subChild) =>
        preCheckedItems.some(
          (item) =>
            item.id === subChild.id &&
            item.type === "category" &&
            item.isChecked === 1
        )
      );

      if (allServicesChecked && allChildrenChecked) {
        return 1; // Fully checked
      } else if (anyServicesChecked || anyChildrenChecked) {
        return 3; // Indeterminate
      } else {
        return 2; // Unchecked
      }
    });

    const allChecked = childStates.every((state) => state === 1);
    const anyIndeterminate = childStates.some((state) => state === 3);

    let parentState = 2; // Default to unchecked

    if (allChecked) {
      parentState = 1; // All checked
    } else if (anyIndeterminate || childCheckedState === 3) {
      parentState = 3; // Indeterminate
    }

    onServiceChange(
      parentCategory.id,
      parentState,
      "category",
      parentCategory.name,
      parentCategory.parent!,
      parentCategory.parent_name
    );

    propagateParentChange(parentCategory.parent, parentState); // Continue propagation
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
              onServiceChange={onServiceChange}
              preCheckedItems={preCheckedItems}
              onParentChange={onParentChange}
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
                        preChecked.type === "service" &&
                        preChecked.isChecked === 1
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
