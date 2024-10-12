import { Edit, Add } from "@mui/icons-material";
import { Box, Paper, IconButton, Divider, Button } from "@mui/material";
import React from "react";

const TablePhotography = () => {
  return (
    <Box
      component={Paper}
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
      }}
    >
      <div
        style={{
          padding: "1.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "2.4rem",
          }}
        >
          Фотография
        </p>
        <div
          style={{
            paddingRight: "0.8rem",
          }}
        >
          <IconButton>
            <Edit
              sx={{
                verticalAlign: "middle",
                fontSize: "2.4rem",
                color: "#2196F3",
              }}
            />
          </IconButton>
        </div>
      </div>
      <Divider />
      <div
        style={{
          padding: "0.8rem 1.6rem 1.6rem 0.8rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ fontSize: "1.6rem", fontWeight: "400" }}
        >
          <Add sx={{ fontSize: "2.4rem" }} /> Добавить файлы
        </Button>
      </div>
    </Box>
  );
};

export default TablePhotography;
