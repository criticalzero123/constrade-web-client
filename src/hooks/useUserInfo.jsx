import { useSelector } from "react-redux";

export const useUserInfo = () => {
  const userInfo = useSelector((state) => state.userInfoReducer);

  return userInfo === undefined
    ? undefined
    : { user: userInfo.user, person: userInfo.person };
};
