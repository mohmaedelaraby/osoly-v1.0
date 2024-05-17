import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";
import { Spinner } from "@chakra-ui/react";

function PieChartComponent({ numbers }) {
  const { t } = useTranslation();
  const { primary } = useDynamicColors();

  let data = [
    {
      label: t("tickets.ACTIVE"),
      value: numbers?.ACTIVE || 0,
    },
    {
      label: t("tickets.CLOSED"),
      value: numbers?.CLOSED || 0,
    },
    {
      label: t("tickets.PROCESSING"),
      value: numbers?.PROCESSING || 0,
    },
  ];
  let emptydata = [
    {
      label: t("tickets.ACTIVE"),
      value: 100,
    },
    {
      label: t("tickets.CLOSED"),
      value: 0,
    },
    {
      label: t("tickets.PROCESSING"),
      value: 0,
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
  const emptyTOTAL = emptydata
    .map((item) => item.value)
    .reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    //${(percent * 100).toFixed(0)}%
    return ` ${(percent * 100).toFixed(0) > 0  ? `${params.label} ${(percent * 100).toFixed(0)}%`:`` }`;
  };
  const getArcLabelEmpty = (params) => {
    const percent = params.value / emptyTOTAL;
    //${(percent * 100).toFixed(0)}%
    return ` ${(percent * 100).toFixed(0) > 0  ? `${params.label} ${(percent * 100).toFixed(0)}%`:`` }`;
  };

  return (
    <>
      {numbers ? (
        <>
          {Object.keys(numbers)?.length > 0 ? (
            <>
              <ThemeProvider theme={MuiTheme}>
                <PieChart
                  colors={[primary, primary + "50", primary + "90"]}
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
                      fontSize: (numbers?.CLOSED / TOTAL) * 100 < 15 ? 8 : 14,
                      fontWeight: 700,
                      border: "none",
                    },
                  }}
                  {...sizing}
                />
              </ThemeProvider>
            </>
          ) : (
            <>
              <ThemeProvider theme={MuiTheme}>
                <div className="empty_state">{t('general.empty_tickets')}</div>
                <PieChart
                  colors={[primary, primary + "50", primary + "90"]}
                  series={[
                    {
                      outerRadius: 145,
                      data: [
                        { value: 0, color: primary },
                        { value: 100, color: primary },
                        { value: 0, color: primary }, // Use color property
                        // ...
                      ],
                    },
                  ]}
                  {...sizing}
                />
              </ThemeProvider>
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="flex-center "
            style={{ width: "364px", height: "294px" }}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        </>
      )}
    </>
  );
}
export default PieChartComponent;
