import { Clear } from "@mui/icons-material";
import { Autocomplete, TextField, Chip } from "@mui/material";
import classes from "./styles.module.scss";
import { useEffect, useState } from "react";

const SaveAutoComplete = ({
  savedMaterialsFunc,
}: {
  savedMaterialsFunc: (materials: { label: string; value: string }[]) => void;
}) => {
  const [savedMaterials, setSavedMaterials] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    savedMaterialsFunc(savedMaterials);
  }, [savedMaterials]);

  const options = [
    { label: "Материал 1", value: "1" },
    { label: "Материал 2", value: "2" },
    { label: "Материал 3", value: "3" },
    { label: "Материал 4", value: "4" },
    { label: "Материал 5", value: "5" },
    { label: "Материал 6", value: "6" },
    { label: "Материал 7", value: "7" },
  ];

  return (
    <Autocomplete
      multiple
      size="small"
      options={options}
      getOptionDisabled={(option) =>
        savedMaterials.some((material) => material.value === option.value)
      }
      onChange={(event, newValue) => {
        if (newValue) {
          setSavedMaterials(newValue);
        }
      }}
      value={savedMaterials}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.label}
            {...getTagProps({ index })}
            className={classes.saveAutoComplete__saved}
            sx={{
              backgroundColor: "#e3effb",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.4rem",
              color: "#0b6bcb",
              borderRadius: "4px",
              fontWeight: 400,

              "& .MuiChip-deleteIcon": {
                fontSize: "1.2rem",
                color: "#0b6bcb",
                "&:hover": {
                  color: "#0b6bcb",
                },
              },
            }}
            onDelete={() => {
              setSavedMaterials(
                savedMaterials.filter(
                  (material) => material.value !== option.value,
                ),
              );
            }}
            deleteIcon={<Clear color="error" />}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiFormLabel-root": {
              fontSize: "1.4rem",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "1.4rem",
            },
          }}
          {...params}
          placeholder="Выберите материалы"
          variant="outlined"
          className={classes.saveAutoComplete__inputDiv__input}
        />
      )}
      className={classes.saveAutoComplete}
    />
  );
};

export default SaveAutoComplete;
