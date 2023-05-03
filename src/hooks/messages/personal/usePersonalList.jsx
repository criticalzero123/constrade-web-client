import { useEffect } from "react";

import { useUserInfo } from "../../useUserInfo";
import { useState } from "react";
import { getChatByUserId } from "../../../redux/action/userMessageAction";

export default function usePersonalList() {
  const { user } = useUserInfo();
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getChatByUserId(user.userId);
      setData(res);
    };

    fetch();
  }, [user.userId]);

  // const searchUser = (name) => {
  //   return getUserByName(name);
  // };

  return { data };
}
