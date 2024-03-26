export const GET_ALL_TRANSACTIONS_URL =
  "https://infra.devskills.app/api/accounting/transactions";

interface Transaction {
  accountId: string;
  amount: number;
  date: string;
  balance?: number;
}

const getBalanceTransactions = (transactions: Transaction[]) => {
  let totals: { [key: string]: number } = {};
  // Iterate through each object to calculate the total amount for each accountId
  transactions.forEach((transaction: Transaction) => {
    if (totals[transaction.accountId] === undefined) {
      totals[transaction.accountId] = transaction.amount;
    } else {
      totals[transaction.accountId] += transaction.amount;
    }
  });
  return totals;
};
const getLatestDateTransactions = (transactions: Transaction[]) => {
  // Iterate through the data again to update the balance for the latest date of each accountId
  let latestDates: { [key: string]: string } = {};
  transactions.forEach((transaction: Transaction) => {
    if (
      latestDates[transaction.accountId] === undefined ||
      new Date(transaction.date) > new Date(latestDates[transaction.accountId])
    ) {
      latestDates[transaction.accountId] = transaction.date;
    }
  });
  return latestDates;
};
export const balanceMaker = (transactions: Transaction[]) => {
  const totals = getBalanceTransactions(transactions);
  const latestDates = getLatestDateTransactions(transactions);
  transactions.forEach((transaction: Transaction) => {
    if (transaction.date === latestDates[transaction.accountId]) {
      transaction.balance = totals[transaction.accountId];
    }
  });
  return transactions;
};
