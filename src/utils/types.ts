export interface HistoryOfTransactionsType {
  transaction_id: string;
  account_id: string;
  amount: number;
  created_at: string;
}

export interface TransactionDataState {
  amount: number;
  accountId: string;
  date: string;
  balance?: number;
}

export interface TransactionState {
  transactions: TransactionDataState[];
  loading: boolean;
  error: string | null | boolean;
}
