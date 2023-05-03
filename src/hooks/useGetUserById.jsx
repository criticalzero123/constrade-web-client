import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/action/userActions";
export default function useGetUserById(userId) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getUserByIdReducer);

  useEffect(() => {
    dispatch(getUserById(userId));

    return () => {
      dispatch({ type: "GET_USER_BY_ID_LEAVE" });
    };
  }, [userId, dispatch]);

  return [data];
}
