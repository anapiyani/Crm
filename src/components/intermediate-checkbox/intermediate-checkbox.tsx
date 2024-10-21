import React, { useEffect, useRef, useState } from "react";
import classes from "./styles.module.scss";

interface TriStateCheckboxProps {
  label: string;
  children?: React.ReactNode;
  onChange?: () => void;
  onToggle?: () => void;
}

const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({
  label,
  children,
  onChange,
  onToggle,
}) => {
  const [checked, setChecked] = useState<boolean | null>(false);
  const [isOpen, setIsOpen] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setChecked((prev) => (prev === null ? true : prev ? false : null));
    onChange && onChange();
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    onToggle && onToggle();
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = checked === null;
    }
  }, [checked]);

  return (
    <div className={classes["row"]}>
      <div className={classes["row__header"]}>
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={checked === true}
          onChange={handleCheckboxChange}
        />
        <label className={classes["row__label"]}>{label}</label>
        <span className={classes["row__toggle"]} onClick={handleToggle}>
          {isOpen ? "▼" : "▶"}
        </span>
      </div>
      {isOpen && children && (
        <div className={classes["row__child"]}>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                  parentChecked: checked,
                  onChildChange: setChecked,
                })
              : null
          )}
        </div>
      )}
    </div>
  );
};

interface ChildCheckboxProps {
  label: string;
  parentChecked: boolean | null;
  onChildChange: (state: boolean | null) => void;
  onInputChange: (state: boolean) => void;
}

const ChildCheckbox: React.FC<ChildCheckboxProps> = ({
  label,
  parentChecked,
  onChildChange,
  onInputChange,
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
    onInputChange(newChecked);
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
