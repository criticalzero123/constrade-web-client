import React from "react";
import useOtherReview from "../../hooks/review/useOtherReview";
import useAverageReview from "../../hooks/review/useAverageReview";
import { useUserInfo } from "../../hooks/useUserInfo";
import useMyReview from "../../hooks/review/useMyReview";

const OtherUserProfileReview = ({ id }) => {
  const { user } = useUserInfo();
  const [rate] = useAverageReview(id);
  const [otherReview] = useOtherReview(id, user.userId);
  const [notRate, myRate] = useMyReview(id, user.userId);

  if (otherReview === undefined || myRate === undefined)
    return <p>Loading...</p>;

  return (
    <div>
      <p>Average Rating: {rate}</p>
      <p>Other Reviews</p>
      <div>
        {otherReview.map((review, index) => (
          <div key={index}>{review.userName}</div>
        ))}
      </div>
      <div>
        MyRate:{" "}
        {myRate.map((review, index) => (
          <div key={index}>{review.userName}</div>
        ))}
      </div>
    </div>
  );
};

export default OtherUserProfileReview;
