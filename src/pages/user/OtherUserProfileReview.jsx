import React from "react";
import useOtherReview from "../../hooks/review/useOtherReview";
import useAverageReview from "../../hooks/review/useAverageReview";
import { useUserInfo } from "../../hooks/useUserInfo";
import useMyReview from "../../hooks/review/useMyReview";
import { getStar } from "../../utilities/reviewService";
import { Link } from "react-router-dom";

const OtherUserProfileReview = ({ id }) => {
  const { user } = useUserInfo();
  const [rate] = useAverageReview(id);
  const [otherReview] = useOtherReview(id, user.userId);
  const [notRate, myRate] = useMyReview(id, user.userId);

  if (otherReview === undefined || myRate === undefined)
    return <p>Loading...</p>;

  if (otherReview.length === 0 && myRate.length === 0)
    return <p>No reviews.</p>;

  return (
    <div>
      <p>Average Rating: {rate}</p>
      <div className="mt-10">
        <p className="mb-2">Reviews:</p>

        {myRate.map((review, index) => (
          <Link
            key={index}
            className="flex items-center gap-x-3 p-4 bg-gray-100 hover:bg-[#cc471f13] rounded-lg"
            to={`/transaction/details/${review.productId}`}
          >
            <div>
              <img
                src={review.imageUrl}
                alt="user"
                className="w-14 h-14 rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <p className="text-black font-semibold">Me</p>
                <p className=" flex gap-x-1">{getStar(review.rate)}</p>
              </div>
              <p className=" text-gray-500">{review.description}</p>
              <p className="text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}

        {otherReview.map((review, index) => (
          <Link
            key={index}
            className="flex items-center gap-x-3 p-4 bg-gray-200 rounded-lg"
            to={`/transaction/details/${review.productId}`}
          >
            <div>
              <img
                src={review.imageUrl}
                alt="user"
                className="w-14 h-14 rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <p className="text-black font-semibold">{review.userName}</p>
                <p className=" flex gap-x-1">{getStar(review.rate)}</p>
              </div>
              <p className=" text-gray-500">{review.description}</p>
              <p className="text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherUserProfileReview;
