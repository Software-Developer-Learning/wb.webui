import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "types/transaction.type";
import http from "untils/http";

interface TransactionState {
    transactionList: Transaction[]
}

const initialState: TransactionState = {
    transactionList: []
}

export const getTransactionListAsync = createAsyncThunk(
    'transaction/getTransactionListSuccess',
    async (_,thunkAPI) => {
        const respone = await http.get<Transaction[]>('bill')
        return respone.data
    }
)

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(getTransactionListAsync.fulfilled, (state, action) => {
            state.transactionList = action.payload;
          })
      },
})

const transactionReducer = transactionSlice.reducer

// const transactionReducer = createReducer(initialState, (builder) => {

// })

export default transactionReducer;