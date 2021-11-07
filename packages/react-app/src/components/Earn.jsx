import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect, useMemo } from "react";
import { getHypervisorForPool, getPoolsQuery, getTokenQuery } from "../queries";
import PoolChart from "./PoolChart";
import TokenSelect from "./TokenSelect";
import { Button, Layout } from "antd";
import { Modal, List, Typography, Divider } from "antd";
import { getPoolUrl } from "../util";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

const { Header, Footer, Sider, Content } = Layout;

const visorClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/visorfinance/visor",
  cache: new InMemoryCache(),
});

const EX_HYPER_POOL = "0x06b1655b9d560de112759b4f0bf57d6f005e72fe";

function Earn(props) {
  const [token, setToken] = useState();
  const [pools, setPools] = useState([]);
  const [visorData, setVisorData] = useState();
  const [visorLoading, setVisorLoading] = useState(false);

  const onCompleted = res => {
    const ps = res?.tokens[0].whitelistPools || [];
    setPools(ps);
    console.log("pools", ps);
  };

  const queryVisor = async poolId => {
    setVisorLoading(true);
    const query = getHypervisorForPool(poolId);
    try {
      const res = await visorClient.query({ query });
      setVisorData({ poolId, ...res.data });
    } catch (e) {
      console.error(e);
      alert(e);
    } finally {
      setVisorLoading(false);
    }
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

  const openPool = (e, poolId) => {
    e.preventDefault();
    // Remove focus to skip auto tab to new window.
    window.open(getPoolUrl(poolId), "_blank"); //.focus();
  };

  return (
    <div>
      <h1>Discover Pools</h1>
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
              <Content>
                <PoolChart data={poolData} />
                <h3>Full list</h3>
                <List
                  size="small"
                  bordered
                  dataSource={poolData}
                  renderItem={item => (
                    <List.Item>
                      <span>
                        {item.pair} (
                        <a href="#" onClick={e => openPool(e, item.id)}>
                          {item.id} - Transactions: {item.txCount}
                        </a>
                        )&nbsp;
                        <Button
                          type="primary"
                          onClick={() => queryVisor(item.id)}
                          disabled={visorLoading}
                          loading={visorLoading}
                        >
                          Search hypervisors
                        </Button>
                      </span>
                    </List.Item>
                  )}
                />
              </Content>
            </Layout>
          </Layout>
          <Modal
            width={800}
            type="secondary"
            title="Found Hypervisors"
            visible={!!visorData}
            onOk={() => setVisorData(undefined)}
          >
            <pre>{JSON.stringify(visorData || {}, null, "\t")}</pre>
          </Modal>
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
