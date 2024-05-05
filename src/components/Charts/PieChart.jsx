import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";

function PieChartComponent({ numbers }) {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();


  let data = [
    {
      label: t("tickets.ACTIVE"),
      value: numbers?.ACTIVE,
    },
    {
      label: t("tickets.CLOSED"),
      value: numbers?.CLOSED,
    },
    {
      label: t("tickets.PROCESSING"),
      value: numbers?.PROCESSING,
    },
  ];
  const MuiTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });

  const sizing = {
    margin: { right: 5 },
    stroke: 0,
    width: 292,
    height: 292,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    //${(percent * 100).toFixed(0)}%
    return `${params.label} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <PieChart
        colors={[primary, primary+'50', primary+'90']}
        series={[
          {
            outerRadius: 145,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
            fontWeight: 700,
            border: "none",
          },
        }}
        {...sizing}
      />
    </ThemeProvider>
  );
}
export default PieChartComponent;
