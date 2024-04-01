import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts";
import { styled } from '@mui/material/styles';

function PieChartComponentWithOneValue({data}) {
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
    height: 230,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    //${(percent * 100).toFixed(0)}%
    return ``;
  };


  return (
    <>
    <div className="circl">25%</div>
     <ThemeProvider theme={MuiTheme}>
      <PieChart
      
        colors={["#34B53A", "#E2FBD7", "#E2FBD7", "#E2FBD7"]}
        series={[
          {
            outerRadius: 90,
            data,
            arcLabel: getArcLabel,
            innerRadius: 105 ,
            cornerRadius:8
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
      >
      </PieChart>
    </ThemeProvider>
    </>
   
  );
}
export default PieChartComponentWithOneValue;
