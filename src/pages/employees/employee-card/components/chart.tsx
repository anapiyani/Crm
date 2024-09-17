import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FormGroup, FormControlLabel, Switch, Box } from "@mui/material";
Chart.register(...registerables);
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = "normal";
Chart.defaults.color = "#000";

interface ChartDataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  yAxisID: string;
  fill: boolean | string;
  hidden?: boolean;
}

interface CustomChartProps {
  labels: string[];
  datasets: ChartDataSet[];
  maxY1: number;
  maxY2: number;
  legendLabels: { label: string; color: string }[];
  showThousandSuffix?: boolean;
}

const RevenueChart: React.FC<CustomChartProps> = ({
  labels,
  datasets,
  maxY1,
  maxY2,
  legendLabels,
  showThousandSuffix = true,
}) => {
  const [showData, setShowData] = useState(
    legendLabels.map(() => true)
  );

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      hidden: !showData[index],
    })),
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y1: {
        type: "linear" as const,
        position: "left" as const,
        beginAtZero: true,
        max: maxY1,
        ticks: {
          stepSize: maxY1 / 3,
          callback: function (tickValue: number | string) {
            return showThousandSuffix
              ? `${tickValue} тыс.`
              : `${tickValue}`;
          },
        },
      },
      y2: {
        type: "linear" as const,
        position: "right" as const,
        beginAtZero: true,
        max: maxY2,
        ticks: {
          stepSize: maxY2 / 3,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleToggle = (index: number) => {
    setShowData((prevShowData) =>
      prevShowData.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ width: "33rem", height: "15rem" }}>
        <Line data={data} options={options} />
      </Box>
      <FormGroup
        sx={{
          ml: { xs: 0, md: "1.6rem" },
          mt: { xs: "1.6rem", md: 0 },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          flexWrap: "wrap",
        }}
      >
        {legendLabels.map((legend, index) => (
          <FormControlLabel
            key={legend.label}
            control={
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: legend.color,
                    "&:hover": {
                      backgroundColor: `${legend.color}1A`,
                    },
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: legend.color,
                  },
                }}
                checked={showData[index]}
                onChange={() => handleToggle(index)}
              />
            }
            label={legend.label}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: 16,
                fontWeight: "400",
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default RevenueChart;
