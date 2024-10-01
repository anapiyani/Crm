import React, { useState } from 'react';
import classes from "./styles.module.scss";

interface QuantitySelectorProps {
  unit?: string; 
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ unit = "шт." }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className={classes.quantity__input}>
      <div className={classes.quantity__input__container}>
        <input type="number" value={quantity} readOnly className={classes.quantity__input__container__input}/>
        <div className={classes.quantity__input__container__input__buttons}>
          <button className={classes.button} onClick={handleIncrease}>▲</button>
          <button className={classes.button} onClick={handleDecrease}>▼</button>
        </div>
      </div>
      <span className={classes.quantity__unit}>{unit}</span>
    </div>
  );
};

export default QuantitySelector;
