import React from "react";
import useTransaction from "../../hooks/transaction/useTransaction";

const UserProfileTransactionList = ({ id }) => {
  const [transactions] = useTransaction(id);

  if (transactions === undefined) return <div>Loading...</div>;

  return (
    <div>
      <p>Hellowie</p>
      {transactions.map((transaction, index) => (
        <div key={index}>{transaction.productName}</div>
      ))}
    </div>
  );
};

export default UserProfileTransactionList;
