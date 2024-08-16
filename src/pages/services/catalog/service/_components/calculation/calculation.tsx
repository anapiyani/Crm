import React from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Man3, Man3Outlined } from "@mui/icons-material";

interface CalculationProps {
  material: string;
  employeePercentage: string;
  position: string;
  employeeName: string;
}

const Calculation: React.FC<CalculationProps> = ({
  material,
  employeePercentage,
  position,
  employeeName,
}) => {
  return (
    <Box
      sx={{
        boxShadow:
          "0 0 12px rgba(21, 21, 21, 0.08), 0 2px 8px rgba(21, 21, 21, 0.08)",
        borderRadius: "16px",
        border: "0.1rem solid rgba(99,107,116, 0.3)",
        padding: "1.6rem",
      }}
    >
      <Typography
        sx={{ fontSize: "2.4rem", fontWeight: 600, marginBottom: "1rem" }}
      >
        Калькуляция
      </Typography>
      <Divider sx={{ marginBottom: "1.6rem" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "0.8rem",
          }}
        >
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 400 }}>
            Материалы
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
     
              textTransform: "none",
              fontSize: "1.4rem",
              padding: "0.8rem",
              justifyContent: "flex-start",
              backgroundColor: "rgba(11,107,203, 0.8)",
              fontWeight: 400,
            }}
          >
            {material}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "0.8rem",
          }}
        >
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 400 }}>
            Процент сотрудника
          </Typography>
          <Button
            variant="contained"
            sx={{
      
              width: "100%",
              textTransform: "none",
              fontSize: "1.4rem",
              padding: "0.8rem",
              justifyContent: "flex-start",
              backgroundColor: "rgba(11,107,203, 0.8)",
              fontWeight: 400,
            }}
          >
            {employeePercentage}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "0.8rem",
          }}
        >
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 400 }}>
            Должность
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
           
              textTransform: "none",
              fontSize: "1.4rem",
              padding: "0.8rem",
              justifyContent: "flex-start",
              backgroundColor: "rgba(11,107,203, 0.8)",
              fontWeight: 400,
            }}
          >
            {position}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "0.8rem",
          }}
        >
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 400 }}>
            Сотрудники
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ padding: 0, marginRight: "0.8rem" }}>
              <Man3Outlined
                sx={{ fontSize: "2.4rem", color: "var(--primary-500)" }}
              />
            </IconButton>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--primary-500)",
              }}
            >
              {employeeName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calculation;
