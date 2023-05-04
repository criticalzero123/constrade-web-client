import React from "react";
import { useWallet } from "../../hooks/wallet/useWallet";
import { Link } from "react-router-dom";
import RecentTransactionItem from "../../components/wallet/RecentTransactionItem";
const WalletPage = () => {
  const { wallet, transactionsAll } = useWallet();

  if (wallet === undefined || transactionsAll === undefined)
    return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-6 px-4 container">
      <div className="col-span-4  ">
        <h1>Available Amount</h1>₱ {wallet.balance.toFixed(2)}
        <br />
        <Link to="/wallet/send" state={wallet} className="bg-gray-200">
          Send Money
        </Link>
        <br />
        <Link to="/wallet/topup" state={wallet}>
          Top up
        </Link>
      </div>

      <div className="col-span-2">
        <h3 className="font-semibold text-lg">Transaction</h3>
        {transactionsAll.map((transaction, index) => (
          <div key={index}>
            <RecentTransactionItem
              data={transaction}
              currentUserWalletId={wallet.walletId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;
