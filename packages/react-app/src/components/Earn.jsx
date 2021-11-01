import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import TokenSelect from "./TokenSelect";

function Earn(props) {
  const [token, setToken] = useState();
  const [pools, setPools] = useState([]);

  useEffect(() => {
    if (!token) {
      setPools([]);
      return;
    }

    // Fetch white label pools for provided token
  }, [token]);

  // const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  return (
    <div>
      <h3>Provide liquidity for tokens, earn fees when anyone uses a pool related to your contribution!</h3>
      <span className="trade-heading">I have: </span>
      <TokenSelect onChange={setToken} />
      {token && (
        <div>
          <p className="header-text">Recommended pools</p>
          {pools.map((p, i) => {
            return <div key={i}>{JSON.stringify(p)}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default Earn;
