import { useEffect } from "react";
import Transaction from "./Transaction";
import TransactionsHistory from "./TransactionsHistory";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchTransactions } from "../state/transaction/transactionSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

const HomePage = () => {
  const smallScreen = useMediaQuery("(min-width:800px)");
  // This component is Responcive and under 800px shoe the components horizontally
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector((state: RootState) =>
    state.transaction.transactions.map((item) => ({
      accountId: item.accountId,
      amount: item.amount,
      date: item.date,
    }))
  );
  const stateError = useSelector((state: RootState) => state.transaction.error);
  // at Transaction component can sent add a Transaction
  // at TransactionsHistory give you a list Of Transactions
  // both are async with api
  return (
    <div
      style={{
        display: "flex",
        flexDirection: smallScreen ? "row" : "column",
        justifyContent: "space-around",
        maxWidth: "1200px",
        paddingTop: "30px",
        margin: "0 auto",
      }}
    >
      <div style={{ padding: "10px", flex: "2" }}>
        <Transaction
          accountIds={transactions.map((transaction) => transaction.accountId)}
        />
      </div>
      <div style={{ padding: "10px", flex: "3" }}>
        {!stateError ? (
          <TransactionsHistory transactions={transactions} />
        ) : (
          <>
            <div>Something went wrong with API link</div>
            <div>Try Later, Dont forget Refresh the page</div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
