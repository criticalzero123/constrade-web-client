import { useEffect, useState } from "react";
import { getSearchResultPlatform } from "../../redux/action/homeActions";
import { genreUniqueFilter } from "../../utilities/filterService";

export default function useSearchPlatform(search) {
  const [result, setResult] = useState();

  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (search === undefined) return;

    const fetch = async () => {
      const res = await getSearchResultPlatform(search);

      setGenreList(["all", ...genreUniqueFilter(res)]);

      setResult(res);
    };

    fetch();
  }, [search]);

  return [result, genreList];
}
