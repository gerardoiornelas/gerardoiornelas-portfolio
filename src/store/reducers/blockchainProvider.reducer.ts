import { createSlice } from "@reduxjs/toolkit"

export const blockchainProvider = createSlice({
  name: "blockchainProvider",
  initialState: {
    connection: null,
    chainId: null,
    account: null,
  },
  reducers: {},
})

export default blockchainProvider.reducer
