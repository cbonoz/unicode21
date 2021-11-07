import React, { useState, useEffect, useMemo } from "react";
import { getTradeUrl } from "../util";
import TokenSelect from "./TokenSelect";

function Trade({}) {
  const [token, setToken] = useState();
  const [destToken, setDestToken] = useState();

  const tradeUrl = useMemo(() => getTradeUrl(token?.id, destToken?.id), [token, destToken]);

  return (
    <div>
      <h1>Swap</h1>
      <div className="first-token">
        <span className="trade-heading">I have: </span>
        <TokenSelect onChange={setToken} />
      </div>
      {token && (
        <div>
          <span className="trade-heading">I want: </span>
          <TokenSelect onChange={setDestToken} />
        </div>
      )}

      {tradeUrl && (
        <p>
          <br />
          <a href={tradeUrl} target="_blank">
            Trade {token?.symbol} for {destToken?.symbol}
          </a>
        </p>
      )}
    </div>
  );
}

export default Trade;
