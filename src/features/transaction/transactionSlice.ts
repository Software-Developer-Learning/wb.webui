import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialTransactionList } from "constants/transaction";
import { Transaction } from "types/transaction.type";

interface TransactionState {
    transactionList: Transaction[]
}

const initialState: TransactionState = {
    transactionList: []
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        getTransactionListSuccess: (state, action: PayloadAction<Transaction[]>) => {
            state.transactionList = action.payload
        }
    }
})

const transactionReducer = transactionSlice.reducer

// const transactionReducer = createReducer(initialState, (builder) => {

// })

export default transactionReducer;