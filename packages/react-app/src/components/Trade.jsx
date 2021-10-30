import React, { useState, useEffect } from "react";
import TokenSelect from "./TokenSelect";

function Trade(props) {
  const [token, setToken] = useState();

  return (
    <div>
      <TokenSelect onChange={setToken} />
      {JSON.stringify(token)}
    </div>
  );
}

export default Trade;
