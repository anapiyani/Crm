import { Button, TextField } from "@mui/material";
import classes from "./styles.module.scss";

const StepInput = ({
  labelName,
  placeholder,
  afterChild,
  onChange,
  plusMinusBtns,
}: {
  labelName: string;
  placeholder: string;
  afterChild?: React.ReactNode;
  onChange: () => void;
  plusMinusBtns?: boolean;
  isAutoComplete?: boolean;
}) => {
  return (
    <div className={classes.stepInput}>
      <p>{labelName}</p>
      <TextField
        sx={{
          width: "100%",
          marginRight: "1rem",
          fontSize: "1.4rem",
          "& .MuiFormLabel-root": {
            fontSize: "1.4rem",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "1.4rem",
          },
        }}
        placeholder={placeholder}
        onChange={onChange}
        type="text"
      />
      {plusMinusBtns && (
        <div className={classes.stepInput__btns}>
          <Button
            sx={{
              minWidth: "40px",
              width: "40px",
              marginLeft: "10px",
            }}
            variant="outlined"
          >
            +
          </Button>
          <Button
            sx={{
              minWidth: "40px",
              width: "40px",
            }}
            variant="outlined"
            color="error"
          >
            -
          </Button>
        </div>
      )}
      {afterChild}
    </div>
  );
};

export default StepInput;
