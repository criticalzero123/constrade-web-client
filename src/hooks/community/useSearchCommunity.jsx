import { useEffect, useState } from "react";
import { searchCommunity } from "../../redux/action/communityAction";

export default function useSearchCommunity(search, userId) {
  const [result, setResult] = useState();
  useEffect(() => {
    if (search === undefined || userId === undefined) return;

    const fetch = async () => {
      const res = await searchCommunity(search, userId);

      setResult(res);
    };

    fetch();
  }, [search, userId]);

  return [result];
}
