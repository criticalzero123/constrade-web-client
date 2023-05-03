import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyReviewsUser, getNotRated } from "../../redux/action/reviewAction";

export default function useMyReview(userId, currentUserId) {
  const dispatch = useDispatch();
  const { data: notRated } = useSelector((state) => state.getNotRatedReducer);
  const { data: myRate } = useSelector(
    (state) => state.getMyReviewsUserReducer
  );

  useEffect(() => {
    if (userId === undefined || currentUserId === undefined) return;

    dispatch(getNotRated(userId, currentUserId));
    dispatch(getMyReviewsUser(userId, currentUserId));
  }, [userId, currentUserId]);

  return [notRated, myRate];
}
