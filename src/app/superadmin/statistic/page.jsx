// pages/statistics.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Statistics() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    async function fetchStatistics() {
      const response = await fetch("/api/statistics");
      const data = await response.json();
      setStatistics(data);
    }

    fetchStatistics();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Tourism Statistics & Analytics
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={statistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
