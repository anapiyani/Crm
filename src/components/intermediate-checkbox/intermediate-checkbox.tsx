import React, { useState, useRef, useEffect } from "react";
import classes from "./styles.module.scss";

interface TriStateCheckboxProps {
  label: string;
  children?: React.ReactNode;
}

const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({
  label,
  children,
}) => {
  const [checked, setChecked] = useState<boolean | null>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    setChecked((prev) => (prev === null ? true : prev ? false : null));
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = checked === null;
    }
  }, [checked]);

  return (
    <div className={classes["row"]}>
      <input
        type="checkbox"
        ref={checkboxRef}
        checked={checked === true}
        onChange={handleCheckboxChange}
      />
      <label className={classes["row__label"]}>{label}</label>
      <div className={classes["row__child"]}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, {
            parentChecked: checked,
            onChildChange: setChecked,
          })
        )}
      </div>
    </div>
  );
};

interface ChildCheckboxProps {
  label: string;
  parentChecked: boolean | null;
  onChildChange: (state: boolean | null) => void;
}

const ChildCheckbox: React.FC<ChildCheckboxProps> = ({
  label,
  parentChecked,
  onChildChange,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (parentChecked !== null) {
      setChecked(parentChecked);
    }
  }, [parentChecked]);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChildChange(newChecked ? null : parentChecked);
  };

  return (
    <div className={classes["row"]}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label className={classes["row__label"]}>{label}</label>
    </div>
  );
};

export { TriStateCheckbox, ChildCheckbox };
