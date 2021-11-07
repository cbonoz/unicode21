import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";

function VisorFinance(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const d = [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ];
    setData(d);
  }, []);
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  if (!data) {
    return <LoadingOutlined />;
  }

  return (
    <div>
      <h1>Understanding Risk</h1>
      <p>
        <b>Impermanent Loss</b>
      </p>
      <p>
        As a liquidity provider, your position may fall in value with respect to either asset (before fees) and
        impermanent loss is often defined as the percentage loss an LP would experience for a given price movement.
      </p>
      <p>
        For this calculation, we you should select a stable coin as the base asset for determining what sort of risk
        you're assumming.
      </p>
      {/* TODO: add interactive graph (visor finance) */}
      {/* https://charts.ant.design/demos/line */}
      <Line {...config} />;
    </div>
  );
}

export default VisorFinance;
