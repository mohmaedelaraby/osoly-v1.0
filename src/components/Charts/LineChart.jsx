import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function LineChart({data}) {
  return (
    <>
     <ResponsiveContainer width="100%" height={292}>
          <AreaChart
            width='auto'
            height='auto'
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="linear" dataKey="value" stroke="#82ca9d" fill="none" />
          </AreaChart>
        </ResponsiveContainer></>
  )
}

export default LineChart


