import { Autocomplete, Divider, TextField } from "@mui/material";
import classes from "./styles.module.scss";

const LabelInfo = ({
  name,
  info,
  isClick,
  isAutocomplete,
  options,
  placeholder,
}: {
  name: string;
  info: string;
  isClick?: boolean;
  isAutocomplete?: boolean;
  options?: [];
  placeholder?: string;
}) => {
  return (
    <div className={classes.labelinfo}>
      <div className={classes.labelinfo__name}>
        <p>{name}</p>
      </div>
      <div className={classes.labelinfo__info}>
        {isAutocomplete ? (
          <Autocomplete
            sx={{
              width: "100%",
              marginRight: "1rem",
              padding: 0,
              "& .MuiInputBase-root": {
                height: "4rem",
              },
            }}
            options={options ? options : []}
            renderInput={(params) => (
              <TextField
                {...params}
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
              />
            )}
          />
        ) : (
          <div>
            <p className={isClick ? classes.link : ""}>{info}</p>
            <Divider />
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelInfo;
