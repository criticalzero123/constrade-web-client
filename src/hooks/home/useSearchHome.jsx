import { useEffect, useState } from "react";
import { getSearchResult } from "../../redux/action/homeActions";
import { platformUniqueFilter } from "../../utilities/filterService";

export default function useSearchHome(search) {
  const [result, setResult] = useState();

  const [platformList, setPlatformList] = useState([]);

  useEffect(() => {
    if (search === undefined) return;

    const fetch = async () => {
      const res = await getSearchResult(search);

      setPlatformList(["all", ...platformUniqueFilter(res.products)]);

      setResult(res);
    };

    fetch();
  }, [search]);

  return [result, platformList];
}
