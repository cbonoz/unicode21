import React, { useMemo } from "react";
import { Column, Line } from "@ant-design/charts";

export default function PoolChart({ data }) {
  const chartData = useMemo(() => {
    const pools = data.pools.map((x, i) => {
      return {
        // ...x,
        id: x.id,
        volumeUSD: parseFloat(parseFloat(x.volumeUSD).toFixed(2)),
        txCount: parseInt(x.txCount),
        pair: `${x.token0.name}/${x.token1.name}`,
      };
    });
    pools.sort((a, b) => (a.txCount < b.txCount ? 1 : -1));
    console.log("data", pools);
    return pools; // .slice(0, 10);
  }, [data]);
  if (!chartData) {
    return null;
  }
  const config = {
    data: chartData,
    xField: "pair",
    yField: "txCount",
    maxBarWidth: 100,
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
        autoEllipsis: false,
      },
      tickCount: chartData.length,
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
        });
      }}
    />
  );
}
