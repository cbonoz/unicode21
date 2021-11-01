import React, { useMemo } from "react";
import { Column } from "@ant-design/charts";

export default function PoolChart({ data }) {
  const chartData = useMemo(() =>
    data.pools.map(
      x => {
        return {
          ...x,
          volumeUSD: parseFloat(x.volumeUSD).toFixed(2),
          pair: `${x.token0.name}/${x.token1.name}`,
        };
      },
      [data],
    ),
  );
  if (!chartData) {
    return null;
  }
  const config = {
    data: chartData,
    xField: "pair",
    yField: "volumeUSD",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      pair: { alias: "Category" },
      volumeUSD: { alias: "Volume (USD)" },
    },
  };

  //   https://charts.ant.design/guide/case

  return (
    <Column
      {...config}
      onReady={plot => {
        plot.on("plot:click", evt => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });
      }}
    />
  );
}
