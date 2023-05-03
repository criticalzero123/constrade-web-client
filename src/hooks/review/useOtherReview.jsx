import { getOtherReviewsUser } from "../../redux/action/reviewAction";
import { useEffect, useState } from "react";

export default function useOtherReview(userId, currentUserId) {
  const [otherReview, setOtherReview] = useState();

  useEffect(() => {
    if (userId === undefined || currentUserId === undefined) return;

    const fetch = async () => {
      const res = await getOtherReviewsUser(userId, currentUserId);

      setOtherReview(res);
    };

    fetch();
  }, [userId, currentUserId]);

  return [otherReview];
}
