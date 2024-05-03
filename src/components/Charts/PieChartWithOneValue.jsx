import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts";
import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";

function PieChartComponentWithOneValue({number = 0}) {
  let reminder = (100-number) /3
  let data = [
    { value: number, label: "A" },
    { value: reminder, label: "b" },
    { value: reminder, label: "c" },
    { value: reminder, label: "d" },
  ];
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const {primary,secondry}=useDynamicColors()
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
    <div style={{backgroundColor : secondry ,color :primary}} className={language == "ar" ? 'circl_ar':'circl_en'}>{number}%</div>
     <ThemeProvider theme={MuiTheme}>
      <PieChart
      
        colors={[primary, secondry, secondry, secondry]}
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
