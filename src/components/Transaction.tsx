import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { postTransactions } from "../state/transaction/transactionSlice";
import { AppDispatch } from "../state/store";
import toast, { Toaster } from "react-hot-toast";

interface TransactionProps {
  accountIds: string[];
}
const Transaction = ({ accountIds }: TransactionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const amountRef = useRef<HTMLDivElement | any>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  // Submit Form Fnction call the postTransactions function from Transaction Reducer
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numb = amountRef.current?.value;
    const existingId = accountIds.includes(selectedAccountId);
    const notifyNoExisting = () =>
      toast.error("Account-ID doesn't exist", {
        duration: 2000,
      });
    const notifySubmitted = () =>
      toast.success("Successfully submitted", {
        duration: 2000,
      });

    if (!existingId) {
      notifyNoExisting();
    } else {
      dispatch(
        postTransactions({ account_id: selectedAccountId, amount: numb })
      ).finally(() => {
        notifySubmitted();
      });
      setSelectedAccountId("");
      amountRef.current.value = null;
    }
  };
  return (
    <Box sx={{ minWidth: 120 }} component='form' onSubmit={handleSubmit}>
      <Toaster />
      <FormControl fullWidth>
        <TextField
          value={selectedAccountId}
          id='account-id'
          label='Account ID'
          variant='outlined'
          onChange={(e) => setSelectedAccountId(e.target.value)}
          data-type='account-id'
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "30px",
          }}
        >
          <input
            id='amount-input'
            type='number'
            data-type='amount'
            ref={amountRef}
          />

          <Button
            type='submit'
            variant='outlined'
            sx={{
              textTransform: "none",
            }}
            data-type='transaction-submit'
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
export default Transaction;
