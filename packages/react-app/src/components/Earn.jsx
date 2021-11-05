import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect, useMemo } from "react";
import { getPoolsQuery, getTokenQuery } from "../queries";
import PoolChart from "./PoolChart";
import TokenSelect from "./TokenSelect";
import { Layout } from "antd";
import { List, Typography, Divider } from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
  const [getPools, { loading: poolsLoading, data: apiPools }] = useLazyQuery(getPoolsQuery(poolIds), {
    skip: poolIds.length == 0,
    // variables: { poolIds },
  });

  useEffect(() => {
    console.log("refetch", pools);
    if (pools) {
      getPools();
    }
  }, [pools]);

  const poolData = useMemo(() => {
    const res = (apiPools?.pools || [])
      .map((x, i) => {
        return {
          // ...x,
          id: x.id,
          volumeUSD: parseFloat(parseFloat(x.volumeUSD).toFixed(2)),
          txCount: parseInt(x.txCount),
          pair: `${x.token0.name}/${x.token1.name}`,
        };
      })
      .filter(x => x.txCount > 0);
    res.sort((a, b) => (a.txCount < b.txCount ? 1 : -1));
    console.log("data", res);
    return res; // .slice(0, 10);
  }, [apiPools]);
  if (loading || poolsLoading) {
    return <LoadingOutlined />;
  }

  // console.log("d", poolIds, poolData, token, data);

  return (
    <div>
      <h3>Provide liquidity for tokens, earn fees when anyone uses a pool related to your contribution!</h3>
      <span className="trade-heading">I have: </span>
      <TokenSelect onChange={setToken} />
      {/* <PoolBubbleChart data={poolData || {}} /> */}
      {token && data && (
        <div>
          <Layout>
            <Header>
              <p className="header-text">{token?.name || ""} Pool Whitelist:</p>
              <p>Transactions</p>
              <hr />
              <br />
            </Header>
            <Layout>
              {/* <Sider> */}
              {/* {poolData.length} pools found. */}
              {/* <List
                  size="small"
                  bordered
                  dataSource={poolData.map(x => x.id)}
                  renderItem={item => <List.Item>{item}</List.Item>}
                /> */}
              {/* </Sider> */}
              <Content>
                <PoolChart data={poolData} />
              </Content>
            </Layout>
          </Layout>
          {/* {pools.map((p, i) => {
            return <div key={i}>{JSON.stringify(p)}</div>;
          })}
          <p>{JSON.stringify(poolData)}</p> */}
        </div>
      )}
    </div>
  );
}

export default Earn;
