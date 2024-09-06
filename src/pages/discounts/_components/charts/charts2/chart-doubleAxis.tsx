import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dualYAxisData = [
  { month: "Июнь", discountSum: 10000, discountCount: 25 },
  { month: "Июль", discountSum: 20000, discountCount: 35 },
  { month: "Август", discountSum: 40000, discountCount: 45 },
  { month: "Сентябрь", discountSum: 75000, discountCount: 50 },
];

type TooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`Месяц: ${label}`}</p>
        <p>{`Сумма скидок: ${payload[0]?.value || 0} тыс.`}</p>
        <p>{`Количество скидок: ${payload[1]?.value || 0} шт.`}</p>
      </div>
    );
  }
  return null;
};

const DualYAxisChart = () => {
  const [showDiscountSum, setShowDiscountSum] = useState(true);
  const [showDiscountCount, setShowDiscountCount] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <ResponsiveContainer width={400} height={200}>
        <AreaChart
          data={dualYAxisData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorDiscountSum" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#42a5f5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDiscountCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${value / 1000} тыс.`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value} шт.`}
          />
          <Tooltip content={<CustomTooltip />} />
          {showDiscountSum && (
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="discountSum"
              stroke="#42a5f5"
              fillOpacity={1}
              fill="url(#colorDiscountSum)"
              dot={{ fill: "#42a5f5", stroke: "#42a5f5", strokeWidth: 1, r: 2 }}
            />
          )}
          {showDiscountCount && (
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="discountCount"
              stroke="#d32f2f"
              fillOpacity={1}
              fill="url(#colorDiscountCount)"
              dot={{ fill: "#d32f2f", stroke: "#d32f2f", strokeWidth: 1, r: 2 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      <FormGroup
        sx={{
          ml: { xs: 0, md: "1.6rem" },
          mt: { xs: "1.6rem", md: 0 },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          flexWrap: "wrap",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#42a5f5",
                  "&:hover": {
                    backgroundColor: "rgba(66, 165, 245, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#42a5f5",
                },
              }}
              checked={showDiscountSum}
              onChange={() => {
                setShowDiscountSum(!showDiscountSum);
              }}
            />
          }
          label="Сумма скидок"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 16,
              fontWeight: "400",
            },
          }}
        />
        <FormControlLabel
          control={
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#d32f2f",
                  "&:hover": {
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#d32f2f",
                },
              }}
              checked={showDiscountCount}
              onChange={() => {
                setShowDiscountCount(!showDiscountCount);
              }}
            />
          }
          label="Количество скидок"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 16,
              fontWeight: "400",
            },
          }}
        />
      </FormGroup>
    </div>
  );
};

export default DualYAxisChart;
