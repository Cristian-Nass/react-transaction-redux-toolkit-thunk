interface WithdrawalAndDepositProps {
  accountId: string;
  amount: number;
  date: string;
  balance?: number;
}
const WithdrawalAndDeposit = ({
  accountId,
  amount,
  date,
  balance,
}: WithdrawalAndDepositProps) => {
  // any single of transaction depend on aboumt are Deposit or Withdrawal
  return (
    <div data-type='transaction'>
      <div
        style={{
          fontStyle: "italic",
          color: amount < 0 ? "#cc6c68" : "#3d914a",
          fontWeight: "bold",
        }}
      >
        {amount > 0 ? (
          <>Deposit at : {new Date(date).toLocaleString()}</>
        ) : (
          <>Withdrawal at : {new Date(date).toLocaleString()}</>
        )}
      </div>
      <div>
        Transferred
        <span
          data-amount={amount}
          style={{
            color: amount < 0 ? "#cc6c68" : "#3d914a",
            fontWeight: "bold",
            padding: "4px",
            fontSize: "18px",
          }}
        >
          {amount}
        </span>
        $ from account:
        <span
          data-account-id={accountId}
          style={{
            color: amount < 0 ? "#cc6c68" : "#3d914a",
            fontWeight: "bold",
            padding: "4px",
            fontSize: "18px",
          }}
        >
          {accountId}
        </span>
      </div>
      {balance && (
        <div data-balance={balance} style={{ fontStyle: "italic" }}>
          Balance: {balance}
        </div>
      )}
    </div>
  );
};

export default WithdrawalAndDeposit;
