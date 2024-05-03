import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineChart({ data }) {
  const [strokeColor , setStrokeColor]  = useState()
  useEffect(()=>{
    let dashboardSettings = sessionStorage.getItem("dashboardSettings");
    dashboardSettings = JSON.parse(dashboardSettings)
    setStrokeColor(dashboardSettings?.dashboardColor)
  },[])
  return (
    <>
      <ResponsiveContainer width="100%" height={292}>
        <AreaChart
          width="auto"
          height="auto"
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="0 3" stroke />
          <XAxis dataKey="name" padding={{ left: 50, right: 10 }} allowDataOverflow />
          <YAxis padding={{ top: 10, bottom: 10 }} offset={10} stroke="0" allowDataOverflow/>
          <Tooltip />
          <Area
            type="linear"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth="3"
            fill="none"
            dot={{ stroke:strokeColor, strokeWidth: 5, r: 4, fill: "white" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default LineChart;
