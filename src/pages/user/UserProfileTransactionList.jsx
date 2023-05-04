import React from "react";
import useTransaction from "../../hooks/transaction/useTransaction";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";

const UserProfileTransactionList = ({ id }) => {
  const [transactions] = useTransaction(id);
  const { user } = useUserInfo();
  const getName = (id, userName) => {
    return id === user.userId ? "Me" : userName;
  };

  if (transactions === undefined) return <div>Loading...</div>;
  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <div>
      {transactions.map((transaction, index) => (
        <Link
          key={index}
          className="flex items-center gap-x-4 p-4 bg-gray-100 my-3 rounded hover:bg-[#cc471f13] "
          to={`/transaction/details/${transaction.productId}`}
        >
          <div>
            <img
              src={transaction.productImage}
              alt="product"
              className="w-14 h-14 rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-[#CC481F] font-semibold text-base">
              {transaction.productName}
            </p>
            <p className="text-gray-500">
              Buyer: {getName(transaction.buyerId, transaction.buyerName)}
            </p>
            <p className="text-gray-500">
              Seller: {getName(transaction.sellerId, transaction.sellerName)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserProfileTransactionList;
