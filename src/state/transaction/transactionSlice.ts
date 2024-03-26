import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GET_ALL_TRANSACTIONS_URL } from "../../utils/helper";
import { HistoryOfTransactionsType, TransactionState } from "../../utils/types";
import axios from "axios";
const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: false,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addAmount: (
      state,
      action: PayloadAction<{ amount: number; accountId: string; date: string }>
    ) => {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(postTransactions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postTransactions.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

// Function with thunk middleware for Asyncrnesly get data
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    try {
      const response = await axios.get(GET_ALL_TRANSACTIONS_URL);
      const fetchedData = await response.data;
      const reMapData = fetchedData.map((item: HistoryOfTransactionsType) => ({
        amount: item.amount,
        accountId: item.account_id,
        date: item.created_at,
      }));
      return reMapData;
    } catch (error) {
      console.log(error);
    }
  }
);

interface PaymentPayload {
  account_id: string;
  amount: number;
}

// Function with thunk middleware for Post new transaction
export const postTransactions = createAsyncThunk(
  "transaction/postTransactions",
  async (payload: PaymentPayload, { dispatch }) => {
    try {
      const response = await axios.post(GET_ALL_TRANSACTIONS_URL, payload);
      dispatch(fetchTransactions());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const stateLoading = (state: TransactionState) => state.loading;
export const { addAmount } = transactionSlice.actions;

export default transactionSlice.reducer;
