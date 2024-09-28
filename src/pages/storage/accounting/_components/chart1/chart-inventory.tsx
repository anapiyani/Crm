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
        <p>{`Закупки: ${payload[0]?.value || 0} шт.`}</p>
        <p>{`Инвентарь: ${payload[1]?.value || 0} шт.`}</p>
        <p>{`Материалы: ${payload[2]?.value || 0} шт.`}</p>
      </div>
    );
  }
  return null;
};

const InventoryChart = ({
  data,
  yAxisLabel = "шт.",
  yAxisTickFormatter = (value: number) => `${value} шт.`,
  colors = {
    inventory: "#b71c1c",
    materials: "#7e57c2",
    purchase: "#ff7043",
  },
}: {
  data: any[];
  yAxisLabel?: string;
  yAxisTickFormatter?: (value: number) => string;
  colors?: { inventory: string; materials: string; purchase: string };
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
                stopColor={colors.inventory}
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor={colors.inventory} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.materials} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.materials} stopOpacity={0} />
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
                stopColor={colors.purchase}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.purchase}
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
              dataKey="inventory"
              stroke={colors.inventory}
              fillOpacity={1}
              fill="url(#colorDiscounts)"
              dot={{
                fill: colors.inventory,
                stroke: colors.inventory,
                strokeWidth: 1,
                r: 2,
              }}
            />
          )}
          {showVisits && (
            <Area
              type="monotone"
              dataKey="materials"
              stroke={colors.materials}
              fillOpacity={1}
              fill="url(#colorVisits)"
              dot={{
                fill: colors.materials,
                stroke: colors.materials,
                strokeWidth: 1,
                r: 2,
              }}
            />
          )}
          {showActiveDiscounts && (
            <Area
              type="monotone"
              dataKey="purchase"
              stroke={colors.purchase}
              fillOpacity={1}
              fill="url(#colorActiveDiscounts)"
              dot={{
                fill: colors.purchase,
                stroke: colors.purchase,
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
                  color: colors.inventory,
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.inventory,
                },
              }}
              checked={showDiscounts}
              onChange={() => {
                setShowDiscounts(!showDiscounts);
              }}
            />
          }
          label="Закупки"
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
                  color: colors.materials,
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.materials,
                },
              }}
              checked={showVisits}
              onChange={() => {
                setShowVisits(!showVisits);
              }}
            />
          }
          label="Инвентарь"
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
                  color: colors.purchase,
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: colors.purchase,
                },
              }}
              checked={showActiveDiscounts}
              onChange={() => {
                setShowActiveDiscounts(!showActiveDiscounts);
              }}
            />
          }
          label="Материалы"
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

export default InventoryChart;
