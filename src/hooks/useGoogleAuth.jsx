import { useDispatch } from "react-redux";
import socialMediaAuth from "../firebase/authSocialMedia";
import {
  googleAuthLogin,
  googleAuthRegister,
} from "../redux/action/authActions";
import { getFirstName, getLastName } from "../utilities/extractionName";
import { getUserInfo } from "../redux/action/userActions";
export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const login = async () => {
    const res = await socialMediaAuth();
    if (res === undefined) return;
    const exist = await googleAuthLogin(res.email);

    if (exist) {
      localStorage.setItem("ApiKey", JSON.stringify(exist.apiKey));
      localStorage.setItem("Authorization", JSON.stringify(exist.token));
      dispatch(getUserInfo(exist.user));

      window.location.href = "/discover";
    } else {
      alert("User doesn't exist");
    }
  };

  const register = async () => {
    const res = await socialMediaAuth();

    if (res === undefined) return;

    const user = {
      userType: res.emailVerified ? "semi-verified" : "non-verified",
      authproviderType: "google",
      email: res.email,
      password: "",
      imageUrl: res.photoURL,
      firebaseId: res.uid,
      userStatus: "active",
    };

    const person = {
      firstname: getFirstName(res.displayName),
      lastname: getLastName(res.displayName),
    };

    const result = await googleAuthRegister({ user, person });

    if (result) {
      localStorage.setItem("ApiKey", JSON.stringify(result.apiKey));
      localStorage.setItem("Authorization", JSON.stringify(result.token));
      dispatch(getUserInfo(result.user));

      window.location.href = "/discover";
    } else {
      alert("User exist");
    }
  };

  return { login, register };
};
