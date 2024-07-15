import React from "react";
import { Box, Paper, Typography, IconButton, Pagination } from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import VisitRow from "./visit-history-row/visit-history-row"; // Assuming VisitRow is in the same directory

interface Visit {
  description: string;
  cost: string;
  dateTime: string;
  link: string;
}

interface VisitHistoryProps {
  visits: Visit[];
  title: string;
  showEyeIcon: boolean;
  page: number;
  pageCount: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const VisitHistory: React.FC<VisitHistoryProps> = ({
  visits,
  title,
  onPageChange,
  page,
  pageCount,
}) => {
  return (
    <Paper
      sx={{
        border: "1px solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0px 1px 2px 0px rgba(21, 21, 21, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "0.1rem solid #CDD7E1",
        }}
      >
        <Box
          sx={{
            fontSize: "2.4rem",
            display: "flex",
            alignItems: "center",
            padding: "1.6rem",
            pr: "2.4rem",
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            padding: "0.8rem",
            pr: "2.4rem",
          }}
        >
          <RemoveRedEyeOutlined
            sx={{
              verticalAlign: "middle",
              fontSize: "2.4rem",
              color: "#2196F3",
            }}
          />
        </Box>
      </Box>
      <Box>
        {visits.map((visit, index) => (
          <VisitRow
            key={index}
            description={visit.description}
            cost={visit.cost}
            dateTime={visit.dateTime}
            link={visit.link}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1.6rem 0 1.6rem 0",
          gap: "1rem",
        }}
      >
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={3}
          page={page}
          onChange={onPageChange}
        />
      </Box>
    </Paper>
  );
};

export default VisitHistory;
