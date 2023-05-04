import React from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useAverageReview from "../../hooks/review/useAverageReview";
import useOtherReview from "../../hooks/review/useOtherReview";
import { Link } from "react-router-dom";
import { getStar } from "../../utilities/reviewService";
const UserProfileReviews = () => {
  const { user } = useUserInfo();
  const [rate] = useAverageReview(user.userId);
  const [otherReview] = useOtherReview(user.userId, user.userId);

  if (otherReview === undefined) return <p>Loading...</p>;

  return (
    <div>
      <p>Average Rating: {rate}</p>

      <p className="mt-10 mb-2">Reviews:</p>
      <div>
        {otherReview.map((review, index) => (
          <Link
            key={index}
            className="flex items-center gap-x-3 p-4 bg-gray-100 hover:bg-[#cc471f13]  rounded-lg"
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

export default UserProfileReviews;
