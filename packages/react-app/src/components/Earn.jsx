import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { getPoolsQuery, getTokenQuery } from "../queries";
import PoolChart from "./PoolChart";
import TokenSelect from "./TokenSelect";

function Earn(props) {
  const [token, setToken] = useState();
  const [pools, setPools] = useState([]);

  const onCompleted = res => {
    const ps = res?.tokens[0].whitelistPools || [];
    setPools(ps);
    console.log("pools", ps);
  };

  const { loading, data, refetch } = useQuery(getTokenQuery(token?.symbol), { skip: !token, onCompleted });

  useEffect(() => {
    if (!token) {
      // setPools([]);
      return;
    }

    refetch();

    // Fetch white label pools for provided token
  }, [token]);

  const poolIds = (pools || []).map(x => x.id);
  const [getPools, { loading: poolsLoading, data: poolData }] = useLazyQuery(getPoolsQuery(poolIds), {
    skip: poolIds.length == 0,
    // variables: { poolIds },
  });

  useEffect(() => {
    console.log("refetch", pools);
    if (pools) {
      getPools();
    }
  }, [pools]);

  if (loading || poolsLoading) {
    return <LoadingOutlined />;
  }

  // console.log("d", poolIds, poolData, token, data);

  return (
    <div>
      <h3>Provide liquidity for tokens, earn fees when anyone uses a pool related to your contribution!</h3>
      <span className="trade-heading">I have: </span>
      <TokenSelect onChange={setToken} />
      {token && data && (
        <div>
          <p className="header-text">Pool Whitelist</p>
          {/* {pools.map((p, i) => {
            return <div key={i}>{JSON.stringify(p)}</div>;
          })}
          <p>{JSON.stringify(poolData)}</p> */}
          <PoolChart data={poolData} />
        </div>
      )}
    </div>
  );
}

export default Earn;
