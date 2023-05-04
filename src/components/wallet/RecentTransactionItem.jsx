import React from "react";
import { OtherTransactionType } from "../../utilities/enums";

const RecentTransactionItem = ({ data, currentUserWalletId }) => {
  const getDateTime = (date) => {
    return new Date(date).toLocaleString([], {
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      year: "2-digit",
    });
  };

  const getType = () => {
    switch (data.transactionType) {
      case OtherTransactionType.Boost:
        return "Product Boost";
      case OtherTransactionType.Subscribe:
        return "Subscribe";
      case OtherTransactionType.Topup:
        return "Topup";
      case OtherTransactionType.Refund:
        return "Refund";
      case OtherTransactionType.AddCount:
        return "Add Post Count";
      default:
        return "";
    }
  };

  const getTypeSign = () => {
    switch (data.transactionType) {
      case OtherTransactionType.Boost:
        return false;
      case OtherTransactionType.Subscribe:
        return false;
      case OtherTransactionType.Topup:
        return true;
      case OtherTransactionType.Refund:
        return true;
      case OtherTransactionType.AddCount:
        return false;
      default:
        return "";
    }
  };

  const Receiver = () => {
    return (
      <div className="justify-between flex items-center my-2 bg-gray-100 p-4 rounded">
        <div>
          <p className="text-base mb-1">Received Money</p>
          <p className="text-md opacity-50">{getDateTime(data.date)}</p>
        </div>
        <p className="text-green-500 font-semibold">
          + ₱ {data.amount.toFixed(2)}
        </p>
      </div>
    );
  };

  const Sender = () => {
    return (
      <div className="justify-between flex items-center my-2 bg-gray-100 p-4 rounded">
        <div>
          <p className="text-base mb-1">Send Money</p>
          <p className="text-md opacity-50">{getDateTime(data.date)}</p>
        </div>
        <p className="text-red-500 font-semibold">
          - ₱ {data.amount.toFixed(2)}
        </p>
      </div>
    );
  };

  const Other = () => {
    return (
      <div className="justify-between flex items-center my-2 bg-gray-100 p-4 rounded">
        <div>
          <p className="text-base mb-1">{getType()}</p>
          <p className="text-md opacity-50">{getDateTime(data.date)}</p>
        </div>
        <p
          className={`${
            getTypeSign() ? "text-green-500  " : "text-red-500 "
          } font-semibold`}
        >
          {getTypeSign() ? "+" : "-"} ₱ {data.amount.toFixed(2)}
        </p>
      </div>
    );
  };
  return (
    <div>
      {data.otherTransactionId !== undefined ? (
        <Other />
      ) : data.senderWalletId === currentUserWalletId ? (
        <Sender />
      ) : (
        <Receiver />
      )}
    </div>
  );
};

export default RecentTransactionItem;
