import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductTransaction } from "../../redux/action/transactionAction";

const TransactionsPage = () => {
  const { pid } = useParams();

  const [transaction, setTransaction] = useState();

  useEffect(() => {
    if (pid === undefined) return;

    const fetch = async () => {
      const result = await getProductTransaction(pid);

      if (result) {
        setTransaction(result);
      } else {
        alert("Something went wrong in fetching transaction");
      }
    };

    fetch();
  }, [pid]);

  const TextContainer = ({
    leftText,
    rightText,
    onPressTitle,
    isTitle = false,
  }) => {
    return (
      <div className="flex items-center justify-between my-2">
        <p className="text-gray-500">{leftText}</p>
        <p
          className={`capitalize font-semibold ${isTitle && "text-[#CC481F]"} ${
            isTitle && "cursor-pointer"
          }`}
          onClick={() => {
            if (isTitle) onPressTitle();
          }}
        >
          {rightText}
        </p>
      </div>
    );
  };

  const transactedWith = () => {
    if (transaction.product.item === "") return "₱" + transaction.product.cash;
    if (transaction.product.cash === 0) return transaction.product.item;

    return `${transaction.product.item} & ₱ ${transaction.product.cash}`;
  };

  if (transaction === undefined) return <p>Fetching...</p>;

  return (
    <div className=" flex items-center justify-center h-[90vh]  w-full">
      <div className="items-center pt-10 w-1/4">
        <h6 className="text-center mb-8 font-semibold text-2xl">
          Transaction Successful
        </h6>
        <div className="w-full bg-gray-100 p-4" style={{ borderRadius: 10 }}>
          <TextContainer
            leftText={"Reference No.:"}
            rightText={transaction.transaction.transactionId}
          />
          <TextContainer
            leftText={"Product Name:"}
            rightText={transaction.product.title}
            isTitle
            onPressTitle={() =>
              (window.location.href = `/products/details/${transaction.transaction.productId}`)
            }
          />
          <TextContainer
            leftText={"Transaction Type:"}
            rightText={transaction.product.preferTrade}
          />
          <TextContainer
            leftText={"Traded with:"}
            rightText={transactedWith()}
          />
          <TextContainer
            leftText={"Buyer"}
            rightText={
              transaction.buyer.person.firstName +
              " " +
              transaction.buyer.person.lastName
            }
          />

          <TextContainer
            leftText={"Seller"}
            rightText={
              transaction.seller.person.firstName +
              " " +
              transaction.seller.person.lastName
            }
          />
          <TextContainer
            leftText={"Date transacted"}
            rightText={new Date(
              transaction.transaction.dateTransaction
            ).toLocaleDateString()}
          />
          <TextContainer
            leftText={"Time transacted"}
            rightText={new Date(
              transaction.transaction.dateTransaction
            ).toLocaleTimeString()}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
