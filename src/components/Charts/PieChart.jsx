import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";

function PieChartComponent({data}) {
  const MuiTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
           
          },
        },
      },
    },
  });

 

  const sizing = {
    margin: { right: 5 },
    stroke:0,
    width: 292,
    height: 292,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    //${(percent * 100).toFixed(0)}%
    return `${params.label}  `;
  };



  return (
    <ThemeProvider theme={MuiTheme}>
      <PieChart
      
        colors={["#194C81", "#85A5C7", "#3D6A98", "#A9C3DE"]}
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
            fontWeight:700,
            border:'none'
          },
        }}
        {...sizing}
      />
    </ThemeProvider>
  );
}
export default PieChartComponent;
