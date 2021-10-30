import React, { useState, useEffect } from "react";
import TokenSelect from "./TokenSelect";

function Trade(props) {
  const [token, setToken] = useState();
  const [destToken, setDestToken] = useState();

  return (
    <div>
      <span className="trade-heading">I have:</span>
      <TokenSelect onChange={setToken} />
      {token && (
        <div>
          <span className="trade-heading">I want:</span>
          <TokenSelect onChange={setDestToken} />
        </div>
      )}
    </div>
  );
}

export default Trade;
