import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({data , dataKeyValue , name}) => {
  return (
    <>
      <BarChart
        width={400}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={name} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKeyValue} fill="#82ca9d" />
      </BarChart>
    </>
  );
};

export default BarChartComponent;
