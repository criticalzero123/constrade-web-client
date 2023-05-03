import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, isFollowUser } from "../../redux/action/followActions";
export default function useFollowAction(otherUserId, currentUserId) {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isFollow, setIsFollow] = useState();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.followCountReducer);

  useEffect(() => {
    if (otherUserId === undefined || currentUserId === undefined) return;

    const fetch = async () => {
      const result = await isFollowUser(otherUserId, currentUserId);
      setIsFollow(result);
    };

    fetch();

    return () => {
      setFlag(false);
    };
  }, [otherUserId, currentUserId]);

  const followAction = async () => {
    setLoading(true);

    const result = await followUser(otherUserId, currentUserId);

    if (!result) {
      alert("Something went wrong!");
      return;
    }
    setIsFollow(!isFollow);
    const followCount =
      !isFollow === true ? data.followCount + 1 : data.followCount - 1;

    const info = {
      ...data,
      followCount: followCount,
    };

    dispatch({ type: "GET_FOLLOW_COUNT", payload: info });
    setLoading(false);
  };

  return { followAction, isFollow, loading, flag };
}
