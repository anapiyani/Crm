import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./styles.module.scss";
import { IMaterial } from "@/ts/storage.interface"; // Update the import to use the new interfaces
import {
  getHierarchyById,
  getHierarchyStorageById,
} from "@/service/hierarchy/hierarchy.service";
import { IStorageCategory } from "@/ts/hierarchy.inteface";

interface ITreeItemProps {
  category: IStorageCategory; // Update to use IStorageCategory
  onServiceChange: (
    id: number,
    isChecked: number,
    type: "material" | "category", // Update types to "material" and "category"
    name: string,
    parent: number | null,
    parent_name: string | null
  ) => void;
  preCheckedItems: {
    id: number;
    type: "material" | "category"; // Update types to "material" and "category"
    isChecked: number;
  }[];
  onParentChange?: (parentId: number | null, childCheckedState: number) => void;
}

const RecursiveCheckboxMaterials: React.FC<ITreeItemProps> = ({
  category,
  onServiceChange,
  preCheckedItems,
  onParentChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<number>(2); // 1: Checked, 2: Unchecked, 3: Indeterminate

  useEffect(() => {
    updateCheckedState();
  }, [preCheckedItems, category.materials, category.children]); // Update to use materials instead of services

  const updateCheckedState = () => {
    if (category.children.length === 0 && category.materials.length === 0) {
      setChecked(2);
      return;
    }

    const allMaterialsChecked = category.materials.every((material) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === material.id &&
          preChecked.type === "material" &&
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

    const anyMaterialsChecked = category.materials.some((material) =>
      preCheckedItems.some(
        (preChecked) =>
          preChecked.id === material.id &&
          preChecked.type === "material" &&
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

    // Set state to 1 if all materials and children are fully checked
    if (allMaterialsChecked && allChildrenChecked) {
      state = 1; // All checked
    } else if (anyMaterialsChecked || anyChildrenChecked) {
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

  const handleMaterialCheckboxChange = (material: IMaterial) => {
    // Update function name and parameters
    const newChecked = preCheckedItems.some(
      (preChecked) =>
        preChecked.id === material.id &&
        preChecked.type === "material" &&
        preChecked.isChecked === 1
    )
      ? 2
      : 1;

    onServiceChange(
      material.id,
      newChecked,
      "material", // Update to "material"
      material.name,
      material.parent_id!,
      material.parent_name
    );

    if (material.parent_id !== null) {
      propagateParentChange(material.parent_id, newChecked);
    }
  };

  const handleCategoryChange = (
    category: IStorageCategory, // Update to IStorageCategory
    isChecked: number // 1 = Checked, 2 = Unchecked
  ) => {
    const updateItems = (cat: IStorageCategory, checked: number) => {
      // Update to IStorageCategory
      onServiceChange(
        cat.id,
        checked,
        "category",
        cat.name,
        cat.parent!,
        cat.parent_name
      );

      cat.materials.forEach(
        (
          material // Update to materials
        ) =>
          onServiceChange(
            material.id,
            checked,
            "material", // Update to "material"
            material.name,
            material.parent_id!,
            material.parent_name
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

    const parentCategory = await getHierarchyStorageById(parentCategoryId); // Update to getHierarchyStorageById

    const childStates = parentCategory.children.map((child) => {
      const isChecked = preCheckedItems.some(
        (item) => item.id === child.id && item.type === "category"
      );

      const allMaterialsChecked = child.materials.every(
        (
          material // Update to materials
        ) =>
          preCheckedItems.some(
            (item) =>
              item.id === material.id &&
              item.type === "material" &&
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

      const anyMaterialsChecked = child.materials.some(
        (
          material // Update to materials
        ) =>
          preCheckedItems.some(
            (item) =>
              item.id === material.id &&
              item.type === "material" &&
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

      if (allMaterialsChecked && allChildrenChecked) {
        return 1; // Fully checked
      } else if (anyMaterialsChecked || anyChildrenChecked) {
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
          {(category.children.length > 0 || category.materials.length > 0) && ( // Update to materials
            <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
          )}
        </span>
      </div>
      {isOpen && (
        <div className={classes["tree__open"]}>
          {category.children.map((child) => (
            <RecursiveCheckboxMaterials
              key={`category-${child.id}`}
              category={child}
              onServiceChange={onServiceChange}
              preCheckedItems={preCheckedItems}
              onParentChange={onParentChange}
            />
          ))}
          {category.materials.length > 0 && ( // Update to materials
            <ul className={classes["tree__service-list"]}>
              {category.materials.map(
                (
                  material // Update to materials
                ) => (
                  <li
                    key={`material-${material.id}`} // Update to materials
                    className={classes["tree__service"]}
                  >
                    <input
                      type="checkbox"
                      checked={preCheckedItems.some(
                        (preChecked) =>
                          preChecked.id === material.id &&
                          preChecked.type === "material" &&
                          preChecked.isChecked === 1
                      )}
                      onChange={() => handleMaterialCheckboxChange(material)} // Update to materials
                    />
                    <span className={classes["tree__label"]}>
                      {material.name}
                    </span>{" "}
                    // Update to materials
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecursiveCheckboxMaterials;
