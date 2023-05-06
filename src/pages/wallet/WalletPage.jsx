import React, { useState } from "react";
import { useWallet } from "../../hooks/wallet/useWallet";
import { Link } from "react-router-dom";
import RecentTransactionItem from "../../components/wallet/RecentTransactionItem";
import ShowWalletModal from "../../components/user/ShowWalletModal";
const WalletPage = () => {
  const { wallet, transactionsAll } = useWallet();
  const [showWallet, setShowWallet] = useState(false);
  if (wallet === undefined || transactionsAll === undefined)
    return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 px-4 container">
      <div className="px-24 py-10">
        <h1 className="text-2xl">My wallet</h1>
        <p className="text-gray-500">
          View and manage your wallet, transactions and payments.
        </p>
        <div className="bg-[#CC481F] px-10 py-16 rounded-lg mt-10">
          <h1 className="text-white font-semibold text-2xl">
            ₱ {wallet.balance.toFixed(2)}
          </h1>
          <p className="text-white opacity-70">Remaining balance</p>
        </div>
        <br />
        <p className="text-center px-10 text-sm text-gray-500">
          Please be reminded to proceed with extreme caution with performing
          transactions outside ConsTrade.
        </p>
        <div className="grid grid-cols-2 gap-x-4 mt-12">
          <Link
            to="/wallet/send"
            state={wallet}
            className="bg-[#CC481F] rounded"
          >
            <p className="text-center text-white py-3 ">Send money</p>
          </Link>

          <button
            onClick={() => setShowWallet(true)}
            className="border border-[#CC481F] rounded"
          >
            <p className="text-center text-[#CC481F] py-3 ">Top up</p>
          </button>
        </div>
        <p className="text-center px-10 text-sm text-gray-500 mt-3">
          Transactions held in our platform are fast and secure.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">All transactions</h3>
        {transactionsAll.map((transaction, index) => (
          <div key={index}>
            <RecentTransactionItem
              data={transaction}
              currentUserWalletId={wallet.walletId}
            />
          </div>
        ))}
      </div>
      <ShowWalletModal
        show={showWallet}
        onClose={() => setShowWallet(false)}
        wallet={wallet}
      />
    </div>
  );
};

export default WalletPage;
