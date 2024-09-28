// import React, { useState } from 'react';
// import classes from "./styles.module.scss";

// const QuantityInput = ({ unit }) => {
//   const [quantity, setQuantity] = useState(0);

//   const increment = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrement = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   return (
//     <div className={classes.quantity__input}>
//       <p>+</p>
//       <div className={classes.quantity__input__container}>
//         <input type="number" value={quantity} readOnly className={classes.quantity__input__container__input}/>
//         <div className={classes.quantity__input__container__input__buttons}>
//           <button className={classes.button} onClick={increment}>▲</button>
//           <button className={classes.button} onClick={decrement}>▼</button>
//         </div>
//       </div>
//       <span className={classes.quantity__unit}>{unit}</span>
//     </div>
//   );
// };

// const QuantitySelector = () => {
//   return (
//     <div className={classes.quantity}>
//       <QuantityInput unit="шт." />
//       <QuantityInput unit="мл." />
//     </div>
//   );
// };

// export default QuantitySelector;

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
      {/* <p>+</p> */}
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
