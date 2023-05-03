import React from "react";
import { useWallet } from "../../hooks/wallet/useWallet";

const WalletPage = () => {
  const { wallet, transactionsAll } = useWallet();

  if (wallet === undefined || transactionsAll === undefined)
    return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-6 px-4 container">
      <div className="col-span-4">
        <h1>Available Amount</h1>₱ {wallet.balance.toFixed(2)}
      </div>
      <div className="col-span-2">
        <h3 className="font-semibold text-lg">Transaction</h3>
        {transactionsAll.map((transaction, index) => (
          <div key={index}>
            <p>amount: {transaction.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;
