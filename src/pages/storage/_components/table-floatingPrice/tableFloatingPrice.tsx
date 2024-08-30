import React from "react";
import { Paper, Box, TextField, IconButton, Divider } from "@mui/material";
import { Add, Clear, SaveOutlined } from "@mui/icons-material";

const FloatingPriceTable = () => {
  return (
    <Box
      component={Paper}
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        fontSize: "1.6rem",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.6,
        }}
      >
        <p style={{ fontSize: "2.4rem" }}>Плавающая цена</p>
        <IconButton sx={{ color: "#0B6BCB" }}>
          <SaveOutlined
            sx={{ fontSize: "2.4rem", color: "var(--brand-500)" }}
          />
        </IconButton>
      </Box>
      <Divider />

      {/* Row 1 */}
      <div style={{ padding: "1.6rem 0rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <IconButton></IconButton>
          <div
            style={{ display: "flex", gap: "2.4rem", padding: "0rem 2.4rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>До</span>
              <TextField
                size="small"
                sx={{ width: "5rem", mx: 0.5 }}
                value={10}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>мл</span>
            </Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                sx={{ width: "7rem", mr: 0.5 }}
                value={100}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>₸</span>
            </div>
          </div>
        </Box>

        {/* Row 2 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <IconButton color="primary">
            <Clear sx={{ fontSize: "2.4rem" }} />
          </IconButton>
          <div
            style={{ display: "flex", gap: "2.4rem", padding: "0rem 2.4rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>От</span>
              <TextField
                size="small"
                sx={{ width: "5rem", ml: 0.5, mr: 0.5 }}
                value={10}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>мл</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>До</span>
              <TextField
                size="small"
                sx={{ width: "5rem", ml: 0.5, mr: 0.5 }}
                value={20}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>мл</span>
            </Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                sx={{ width: "7rem", mr: 0.5 }}
                value={0}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>₸</span>
            </div>
          </div>
        </Box>

        {/* Row 3 (example for adding more rows) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton color="primary">
            <Add sx={{ fontSize: "2.4rem" }} />
          </IconButton>
          <div
            style={{ display: "flex", gap: "2.4rem", padding: "0rem 2.4rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>От</span>
              <TextField
                size="small"
                sx={{ width: "5rem", ml: 0.5, mr: 0.5 }}
                value={10}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>мл</span>
            </Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                sx={{ width: "7rem", mr: 0.5 }}
                value={0}
                InputProps={{
                  sx: { fontSize: "1.4rem" },
                }}
              />
              <span>₸</span>
            </div>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default FloatingPriceTable;
