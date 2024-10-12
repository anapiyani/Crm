import React from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";

interface NormativeServiceProps {
  title: string;
  items: { name: string; amount: string }[];
}

const NormativeService: React.FC<NormativeServiceProps> = ({
  title,
  items,
}) => {
  return (
    <Paper
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        width: "100%",
      }}
    >
      <div style={{ padding: "1.6rem" }}>
        <Typography
          sx={{
            fontSize: "2.4rem",
          }}
        >
          {title}
        </Typography>
      </div>
      <Divider />

      <div style={{ padding: "1.6rem" }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: index < items.length - 1 ? "0.4rem" : 0,
              gap: "1.6rem",
            }}
          >
            <Typography sx={{ fontSize: "1.4rem", color: "var(--link-500)" }}>
              {item.name}
            </Typography>
            <Typography
              sx={{ fontSize: "1.4rem", color: "var(--neutral-700)" }}
            >
              {item.amount}
            </Typography>
          </Box>
        ))}
      </div>
    </Paper>
  );
};

export default NormativeService;
