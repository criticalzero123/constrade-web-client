import React, { useState } from "react";
import { useParams } from "react-router";
import useBoostProduct from "../../../hooks/product/useBoostProduct";
import { Spinner } from "flowbite-react";
import { useUserInfo } from "../../../hooks/useUserInfo";

const ProductBoost = () => {
  const { pid } = useParams();
  const [days, setDays] = useState(0);
  const { user } = useUserInfo();
  // const [newDays, setNewDays] = useState(0);
  const [data, submit, cancel, loading] = useBoostProduct(pid);

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="shadow-2xl w-1/4 h-1/2 p-4">
        {data !== undefined &&
          (data === null ? (
            <div className="mt-1 flex-1">
              <p className="text-base mb-2">
                Please input number of days below:
              </p>
              <input
                value={days}
                onChange={(e) => setDays(e.target.value)}
                type="number"
                placeholder="Enter days..."
                className="px-4 py-2 border border-gray-400 rounded"
              />
              <div className="mt-10">
                <p>
                  Days boosted:{" "}
                  <span className="font-semibold text-base">{days}</span>
                </p>
                <p className="my-2">
                  Total amount to be paid:{" "}
                  <span className="font-semibold text-base">
                    {user.userType === "premium"
                      ? days * 5 - days * 5 * 0.15
                      : days * 5}
                  </span>
                </p>
                {user.userType === "premium" && (
                  <p className="my-2">
                    Total saved because of premium:{" "}
                    <span className="font-semibold text-base">
                      {days * 5 * 0.15}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex-1 justify-end mb-5 ">
                <button
                  className="p-4  bg-[#CC481F] rounded w-full mt-5"
                  onClick={() => submit(days, user.userId)}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <p className="text-center text-white font-semibold">
                      Submit
                    </p>
                  )}
                </button>
              </div>
            </div>
          ) : (
            data.status === "active" && (
              <div>
                <p>Days Boosted: {data.daysBoosted}</p>
                <p>Status: {data.status}</p>
                <p>
                  DateTime Expired:{" "}
                  {new Date(data.dateTimeExpired).toLocaleDateString()}
                </p>
                <p>
                  Date Boosted:{" "}
                  {new Date(data.dateBoosted).toLocaleDateString()}
                </p>

                <button
                  className="p-4 border w-full border-[#CC481F] mt-10 hover:bg-[#CC481F] rounded"
                  onClick={() => cancel(data.boostProductId)}
                >
                  <p className="text-center text-[#CC481F] hover:text-white ">
                    Cancel
                  </p>
                </button>
                <button
                  className="p-4 border w-full  mt-10 bg-[#CC481F] rounded"
                  onClick={() =>
                    (window.location.href = `/products/details/${pid}`)
                  }
                >
                  <p className="text-center text-white ">Back</p>
                </button>
              </div>
            )
          ))}
      </div>
    </div>
  );
};

export default ProductBoost;
