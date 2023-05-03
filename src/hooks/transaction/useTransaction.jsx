import { useEffect, useState } from "react";
import { getUserTransactions } from "../../redux/action/transactionAction";

export default function useTransaction(id) {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    if (id === undefined) return;

    const fetch = async () => {
      const result = await getUserTransactions(id);

      if (result) {
        setTransactions(result);
      } else {
        alert("Something went wrong in fetching");
      }
    };

    fetch();
  }, [id]);

  return [transactions];
}
