export const GET_POOLS = ```{
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
}```;
