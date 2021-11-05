import React, { useMemo } from "react";
import { Column, Line } from "@ant-design/charts";
import { getPoolUrl } from "../util";

export default function PoolChart({ data }) {
  if (!data) {
    return <p>No data available</p>;
  }
  const config = {
    data,
    xField: "pair",
    yField: "txCount",
    maxBarWidth: 10,
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
        autoEllipsis: false,
      },
      tickCount: data.length,
    },
    yAxis: {
      visible: true,
      min: 0,
      // label: {
      //   formatter: v => `$${v}.00`,
      // },
    },
    padding: "auto",
    // label: {
    //   position: "middle",
    //   autoRotate: true,
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 0.6,
    //   },
    // },
    // legend: {
    //   layout: "horizontal",
    //   position: "right",
    // },
    meta: {
      // pair: { alias: "Category" },
      // volumeUSD: { alias: "Volume (USD)" },
      txCount: { alias: "Transactions" },
    },
  };

  const openPool = poolId => {
    // Remove focus to skip auto tab to new window.
    window.open(getPoolUrl(poolId), "_blank").focus();
  };

  //   https://charts.ant.design/guide/case
  // console.log("data", chartData);

  return (
    <Column
      {...config}
      onReady={plot => {
        plot.on("plot:click", evt => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
          const poolId = tooltipData[0].data.id;
          if (poolId) {
            openPool(poolId);
          }
        });
      }}
    />
  );
}
