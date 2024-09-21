// import React, { useState } from "react";
// import classes from "./styles.module.scss";
// import { Divider } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";
// import classNames from "classnames";

// interface ISearchFilterCardProps {
//   title: string;
//   children: React.ReactNode;
//   classNameUnique?: string;
//   open?: boolean;
//   openEnabled?: boolean;
// }

// const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
//   title,
//   children,
//   classNameUnique,
//   open,
//   openEnabled,
//   ...props
// }) => {
//   const [isOpen, setIsOpen] = useState(open);
//   const [isEnable] = useState(openEnabled);

//   const handleFilterOpening = () => {
//     setIsOpen((prev) => !prev);
//   };
//   return (
//     <div
//       {...props}
//       className={classNames(classes["container"], classNameUnique)}
//     >
//       <div onClick={handleFilterOpening} className={classes["container__top"]}>
//         <h2 className={classes["container__title"]}>{title}</h2>

//         {isEnable ? (
//           <button
//             disabled={isEnable}
//             type="button"
//             className={classes["container__btn"]}
//           >
//             {!isOpen ? <ExpandMore /> : <ExpandLess />}
//           </button>
//         ) : (
//           <></>
//         )}
//       </div>

//       <Divider />
//       {isEnable ? (
//         <div>{isOpen && <div className="p-3">{children}</div>}</div>
//       ) : (
//         <div className="p-3">{children}</div>
//       )}
//     </div>
//   );
// };

// export default SearchFilterCard;

// import React, { useState, useEffect } from 'react';
// import classNames from 'classnames';
// import { Divider } from "@mui/material";


// interface ISearchFilterCardProps {
//   title: string;
//   children: React.ReactNode;
//   classNameUnique?: string;
//   open?: boolean; // External control of open state (optional)
//   openEnabled?: boolean; // Allows disabling toggle functionality (optional)
// }

// const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
//   title,
//   children,
//   classNameUnique,
//   open = false, // Defaults to closed if not specified
//   openEnabled = true, // Defaults to being toggleable
// }) => {
//   const [isOpen, setIsOpen] = useState(open);

//   useEffect(() => {
//     setIsOpen(open); // Syncs with external `open` prop, if provided
//   }, [open]);

//   const handleFilterOpening = () => {
//     if (openEnabled) {
//       setIsOpen(!isOpen);
//     }
//   };

//   return (
//     <div className={classNames("container", classNameUnique, { open: isOpen })}>
//       <div className="container__top" onClick={handleFilterOpening}>
//         <h2 className="container__title">{title}</h2>
//       </div>
//       <Divider />
//       {isOpen && (
//         <div className="p-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilterCard;

import React, { useState, useEffect } from 'react';
import classes from './styles.module.scss';
import { Divider } from '@mui/material';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ISearchFilterCardProps {
  title: string;
  children: React.ReactNode;
  classNameUnique?: string;
  open?: boolean;
  openEnabled?: boolean;
}

const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
  title,
  children,
  classNameUnique,
  open = false, // defaults to closed if not specified
  openEnabled = true, // defaults to being toggleable if not specified
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open); // Ensures the component reacts to external changes in 'open' prop
  }, [open]);

  const handleFilterOpening = () => {
    if (openEnabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={classNames(classes.container, classNameUnique)}
    >
      <div onClick={handleFilterOpening} className={classes.container__top}>
        <h2 className={classes.container__title}>{title}{isOpen ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}</h2>
      </div>
      <Divider />
      {isOpen && (
        <div className={classes['content']}>
          {children}
        </div>
      )}
    </div>
  );
};

export default SearchFilterCard;