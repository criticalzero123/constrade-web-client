import { useDispatch } from "react-redux";
import { emailAndPasswordAuthLogin } from "../redux/action/authActions";
import { getUserInfo } from "../redux/action/userActions";

export const useEmailAuth = () => {
  const dispatch = useDispatch();
  const loginEmail = async (email, password) => {
    const res = await emailAndPasswordAuthLogin({ email, password });

    if (res) {
      localStorage.setItem("ApiKey", JSON.stringify(res.apiKey));
      localStorage.setItem("Authorization", JSON.stringify(res.token));
      dispatch(getUserInfo(res.user));

      window.location.href = "/discover";
    } else {
      alert("User doesn't exist");
    }
  };

  return { loginEmail };
};
