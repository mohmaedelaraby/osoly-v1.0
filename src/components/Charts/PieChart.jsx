import { Text } from '@chakra-ui/react';
import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const PieChartComponent =({data}) =>{
  const COLORS = ["#194C81", "#3D6A98", "#85A5C7", "#85A5C7"];
  
  const RADIAN = Math.PI / 200;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].value>0 ? `${data[index].name}`:``}`}
      </text>
    );
  };
  return (
    <>
     <PieChart width={306} height={292}>
      <Pie
        data={data}
        cx={153}
        cy={145}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={140}
        fill="#8884d8"
        dataKey="value"
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </>
  )
}

export default PieChartComponent