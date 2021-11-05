import React, { useMemo } from "react";
import { Column, Line } from "@ant-design/charts";
import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing";

export default function PoolBubbleChart({ data }) {
  const chartData = {
    name: "root",
    children: (data || []).map(x => ({
      name: x.id,
      value: x.txCount,
    })),
  };
  console.log("c", chartData);
  return (
    <ResponsiveCirclePackingCanvas
      data={chartData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      colors={{ scheme: "spectral" }}
      colorBy="id"
      childColor={{ from: "color", modifiers: [["brighter", 0.4]] }}
      padding={1}
      leavesOnly={true}
      enableLabels={true}
      label="value"
      labelTextColor={{ from: "color", modifiers: [["darker", 2.4]] }}
      borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
      animate={false}
    />
  );
}
