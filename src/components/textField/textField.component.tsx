import TextField from "@mui/material/TextField";

type TProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classes: { [key: string]: string };
};

const CustomTextField = ({ id, label, value, onChange, classes }: TProps) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      sx={{
        fontSize: "1.6rem",
        marginBottom: "1.4rem",
        "& .MuiFormLabel-root": {
          fontSize: "1.6rem",
        },
        "& .MuiOutlinedInput-root": {
          fontSize: "1.6rem",
        },
      }}
      className={classes["email__content__form__send__input"]}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextField;
