import gql from "graphql-tag";

export const GET_POOLS = `{
  pools(first: 10, skip: 4000) {
    id
    token0 {
      id
      name
    }
    token1 {
      id
      name
    }
  }
}`;

export const getHypervisors = () => {
  return gql(`{uniswapV3Pools(first: 10){
    id, hypervisors, fee, token0{name}, token1{name}
  }
  
  }`);
};

export const getHypervisorForPool = poolId => {
  return gql(`{uniswapV3Pools(where: {id:"${poolId}"}){
    id, hypervisors, fee, token0{name}, token1{name}
  }
  }`);
};

export const getPoolsQuery = poolIds => {
  const q = `
  {
    pools(where: { id_in:${JSON.stringify(poolIds)}}) {
        id, token0{name}, token1{name}, txCount, feesUSD, tick, volumeUSD
    }
  }`;
  if (poolIds) {
    console.log(q);
  }
  return gql(q);
};

export const getTokenQuery = symbol => {
  return gql(`
  {
    tokens(
      where: { symbol: "${symbol}" }
      first: 10
      orderBy: txCount
      orderDirection: desc
    ) {
      id
      symbol
      txCount
      poolCount
      whitelistPools {
        id
      }
    }
  }`);
};
