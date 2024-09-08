import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
        <p>{`Скидки: ${payload[0]?.value || 0} шт.`}</p>
        <p>{`Посещения по скидкам: ${payload[1]?.value || 0} шт.`}</p>
        <p>{`Активные скидки: ${payload[2]?.value || 0} шт.`}</p>
      </div>
    );
  }
  return null;
};

const DiscountsChart = ({
  data,
  yAxisLabel = "шт.",
  yAxisTickFormatter = (value: number) => `${value} шт.`,
  colors = {
    discounts: "#b71c1c",
    visits: "#7e57c2",
    activeDiscounts: "#ff7043",
  },
}: {
  data: any[];
  yAxisLabel?: string;
  yAxisTickFormatter?: (value: number) => string;
  colors?: { discounts: string; visits: string; activeDiscounts: string };
}) => {
  const [showDiscounts, setShowDiscounts] = useState(true);
  const [showVisits, setShowVisits] = useState(true);
  const [showActiveDiscounts, setShowActiveDiscounts] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <ResponsiveContainer width={350} height={200}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorDiscounts" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.discounts}
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor={colors.discounts} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.visits} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.visits} stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="colorActiveDiscounts"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={colors.activeDiscounts}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.activeDiscounts}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={yAxisTickFormatter} />
          <Tooltip content={<CustomTooltip />} />
          {showDiscounts && (
            <Area
              type="monotone"
              dataKey="discounts"
              stroke={colors.discounts}
              fillOpacity={1}
              fill="url(#colorDiscounts)"
              dot={{
                fill: colors.discounts,
                stroke: colors.discounts,
                strokeWidth: 1,
                r: 2,
              }}
            />
          )}
          {showVisits && (
            <Area
              type="monotone"
              dataKey="visits"
              stroke={colors.visits}
              fillOpacity={1}
              fill="url(#colorVisits)"
              dot={{
                fill: colors.visits,
                stroke: colors.visits,
                strokeWidth: 1,
                r: 2,
              }}
            />
          )}
          {showActiveDiscounts && (
            <Area
              type="monotone"
              dataKey="activeDiscounts"
              stroke={colors.activeDiscounts}
              fillOpacity={1}
              fill="url(#colorActiveDiscounts)"
              dot={{
                fill: colors.activeDiscounts,
                stroke: colors.activeDiscounts,
                strokeWidth: 1,
                r: 2,
              }}
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
                  color: colors.discounts,
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.discounts,
                },
              }}
              checked={showDiscounts}
              onChange={() => {
                setShowDiscounts(!showDiscounts);
              }}
            />
          }
          label="Скидки"
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
                  color: colors.visits,
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.visits,
                },
              }}
              checked={showVisits}
              onChange={() => {
                setShowVisits(!showVisits);
              }}
            />
          }
          label="Посещения по скидкам"
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
                  color: colors.activeDiscounts,
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.activeDiscounts,
                },
              }}
              checked={showActiveDiscounts}
              onChange={() => {
                setShowActiveDiscounts(!showActiveDiscounts);
              }}
            />
          }
          label="Активные скидки"
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

export default DiscountsChart;
