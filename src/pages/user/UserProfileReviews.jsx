import React from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useAverageReview from "../../hooks/review/useAverageReview";
import useOtherReview from "../../hooks/review/useOtherReview";
const UserProfileReviews = () => {
  const { user } = useUserInfo();
  const [rate] = useAverageReview(user.userId);
  const [otherReview] = useOtherReview(user.userId, user.userId);

  if (otherReview === undefined) return <p>Loading...</p>;

  return (
    <div>
      <p>Average Rating: {rate}</p>
      <p>Reviews of you:</p>
      <div>
        {otherReview.map((review, index) => (
          <div key={index}>{review.userName}</div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileReviews;
