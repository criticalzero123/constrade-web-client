import { soldProduct } from "../../redux/action/transactionAction";

export default function useSoldProduct() {
  const markAsSoldProduct = (info) => {
    const newInfo = {
      ...info,
      getWanted: true,
      inAppTransaction: true,
      isReviewed: false,
      dateTransaction: new Date(),
    };
    return soldProduct(newInfo);
  };

  return { markAsSoldProduct };
}
