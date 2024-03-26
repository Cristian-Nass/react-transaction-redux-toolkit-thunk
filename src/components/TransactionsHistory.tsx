import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import WithdrawalAndDeposit from "./WithdrawalAndDeposit";
import { v4 as uuidv4 } from "uuid";
import { balanceMaker } from "../utils/helper";
import { TransactionDataState } from "../utils/types";
import CircularProgress from "@mui/material/CircularProgress";

interface TransactionsHistoryProps {
  transactions: {
    accountId: string;
    amount: number;
    date: string;
  }[];
}
// this Function add the Balance field to the latest transaction for any Account-ID
// then sort it by Date and ready for List
export default function TransactionsHistory(porps: TransactionsHistoryProps) {
  const stateLoading = useSelector(
    (state: RootState) => state.transaction.loading
  );

  const transactionsWithBalance: TransactionDataState[] = balanceMaker(
    porps.transactions
  );

  if (stateLoading) return <CircularProgress />;
  return (
    <Box sx={{ paddingRight: "40px" }}>
      {transactionsWithBalance.map((transaction) => (
        <Box
          key={uuidv4()}
          sx={{
            width: "100%",
            padding: "18px 20px",
            backgroundColor: "#f5f5f5",
            margin: "6px",
            borderRadius: "4px",
            textAlign: "left",
            color: "#5c5c5c",
          }}
          style={{}}
        >
          <WithdrawalAndDeposit
            accountId={transaction.accountId}
            amount={transaction.amount}
            date={transaction.date}
            balance={transaction.balance}
          />
        </Box>
      ))}
    </Box>
  );
}
