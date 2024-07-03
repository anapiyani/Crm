import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
Chart.register(...registerables);
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = "normal";
Chart.defaults.color = "#000";

const MyChart: React.FC = () => {
  const [showRevenue, setShowRevenue] = useState(true);
  const [showClients, setShowClients] = useState(true);

  const data = {
    labels: ["", "Июнь", "Июль", "Август", "Сентябрь"],
    datasets: [
      {
        label: "Выручка",
        data: [7, 13, 30, 52, 73],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        yAxisID: "y1",
        fill: true,
        hidden: !showRevenue,
      },
      {
        label: "Клиенты",
        data: [7, 15, 38, 50, 60],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        yAxisID: "y2",
        fill: "-1",
        hidden: !showClients,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y1: {
        type: "linear" as const,
        position: "left" as const,
        beginAtZero: true,
        max: 75,
        ticks: {
          stepSize: 25,
          callback: function (tickValue: number | string) {
            return `${tickValue} тыс.`;
          },
        },
        grid: {
          color: "000",
        },
      },
      y2: {
        type: "linear" as const,
        position: "right" as const,
        beginAtZero: true,
        max: 60,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        ticks: {},
        grid: {
          drawOnChartArea: false,
          color: "000",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "right" as const,
      },
    },
  };
  const handleRevenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowRevenue(event.target.checked);
  };

  const handleClientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowClients(event.target.checked);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "40rem", height: "15rem" }}>
        <Line data={data} options={options} />
      </div>
      <FormGroup sx={{ ml: "2rem" }}>
        <FormControlLabel
          control={
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4CAF50",
                },
              }}
              checked={showRevenue}
              onChange={handleRevenueChange}
            />
          }
          label="Выручка"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 16, // Change the font size
              fontWeight: "400", // Change the font weight
            },
          }}
        />
        <FormControlLabel
          control={
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#2196F3",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#2196F3",
                },
              }}
              checked={showClients}
              onChange={handleClientsChange}
            />
          }
          label="Клиенты"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 16, // Change the font size
              fontWeight: "400", // Change the font weight
            },
          }}
        />
      </FormGroup>
    </div>
  );
};

export default MyChart;
