import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Line, Scatter } from "@ant-design/charts";
import TokenSelect from "./TokenSelect";
import { Input } from "antd";
import { impermanentLoss, range } from "../util";

const POINTS = 50;
const MAX = 5;

function VisorFinance(props) {
  const [data, setData] = useState();
  const [change, setChange] = useState(0);
  const [token, setToken] = useState();

  useEffect(() => {
    const d = range(1, POINTS + 1).map(i => {
      const k = i / (POINTS / MAX);
      return {
        k,
        loss: parseFloat(impermanentLoss(k)),
      };
    });
    setData(d);
    console.log("d", d);
  }, [change]);
  const config = {
    data,
    height: 400,
    xField: "k",
    yField: "loss",
    axis: {
      xAxis: {
        title: {
          text: "K",
        },
      },
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    meta: {
      k: {
        min: 0.1,
        max: MAX + 0.01,
      },
      loss: {
        max: 0.01,
      },
    },
  };

  if (!data) {
    return <LoadingOutlined />;
  }

  const kValue = change ? 1 / (1 + change / 100) : undefined;
  const changeLoss = impermanentLoss(kValue);

  return (
    <div className="risk-page">
      <h1>Understanding Risk</h1>
      <p>
        <b>Impermanent Loss</b>
      </p>
      <p>
        As a liquidity provider, your position may fall in value with respect to either asset (before fees) and
        impermanent loss can be measured as the percentage loss a liquidity provider would experience for a given price
        movement.
      </p>
      <p>
        For this calculation, we you should select a stable coin as the base asset for determining what sort of risk
        you're assuming.
      </p>
      <p>
        Select token relative to <b>DAI</b>
      </p>
      <TokenSelect onChange={setToken} />
      <br />
      {token && (
        <div>
          <br />
          <p>
            Enter the projected change for <b>{token?.name || "the token"}</b>. Enter this value as a percent:
          </p>
          <Input suffix="%" value={change} onChange={e => setChange(e.target.value)} type="number" />
          <br />
          <h3>Values:</h3>
          {kValue && <Input prefix="k" disabled value={kValue} />}
          <br />
          {changeLoss && <Input prefix="loss" disabled value={changeLoss} />}
          <Scatter {...config} />;
        </div>
      )}
      {/* TODO: add interactive graph (visor finance) */}
      {/* https://charts.ant.design/demos/line */}
    </div>
  );
}

export default VisorFinance;
