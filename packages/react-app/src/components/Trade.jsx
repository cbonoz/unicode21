import React, { useState, useEffect, useMemo } from "react";
import { getTradeUrl } from "../util";
import TokenSelect from "./TokenSelect";

function Trade({}) {
  const [token, setToken] = useState();
  const [destToken, setDestToken] = useState();

  const tradeUrl = useMemo(() => getTradeUrl(token?.id, destToken?.id), [token, destToken]);

  return (
    <div>
      <span className="trade-heading">I have: </span>
      <TokenSelect onChange={setToken} />
      {token && (
        <div>
          <span className="trade-heading">I want: </span>
          <TokenSelect onChange={setDestToken} />
        </div>
      )}

      {tradeUrl && (
        <p>
          <a href={tradeUrl} target="_blank">
            Trade
          </a>
        </p>
      )}
    </div>
  );
}

export default Trade;
