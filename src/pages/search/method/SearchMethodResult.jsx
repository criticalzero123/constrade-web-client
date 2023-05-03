import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSearchCategory } from "../../../redux/action/homeActions";
import { platformUniqueFilter } from "../../../utilities/filterService";
import ProductCardDetails from "../../../components/product-card/ProductCardDisplay";
const SearchMethodResult = () => {
  const { method } = useParams();

  const [result, setResult] = useState();
  const [platformList, setPlatformList] = useState([]);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (method === undefined) return;

    const fetch = async () => {
      const res = await getSearchCategory(method);
      setPlatformList(["all", ...platformUniqueFilter(res)]);

      setResult(res);
    };

    fetch();
  }, [method]);

  if (result === undefined) return <p className="px-4">Loading...</p>;
  if (result.length === 0)
    return (
      <p className="px-4">
        No product found at <span className="font-semibold">{method}</span>
      </p>
    );

  return (
    <div className="container px-4">
      <p className="mb-5">Results: {result.length}</p>
      <div className="flex gap-x-4 items-center mb-5">
        <p>Search by:</p>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          {platformList.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-x-4">
        {platform === "all"
          ? result.map((_data, index) => (
              <ProductCardDetails product={_data} key={index} />
            ))
          : result
              .filter((p) => p.platform.toLowerCase().includes(platform))
              .map((_data, index) => (
                <ProductCardDetails product={_data} key={index} />
              ))}
      </div>
    </div>
  );
};

export default SearchMethodResult;
