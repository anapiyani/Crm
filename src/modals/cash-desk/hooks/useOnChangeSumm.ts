import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const useSumm = () => {
  const [summ, setSumm] = useState<number>(0);
  const onChangeSumm = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSumm(isNaN(value) ? 0 : value);
  };
  return { onChangeSumm, summ, setSumm };
};

export default useSumm;
