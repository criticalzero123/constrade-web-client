import socialMediaAuth from "../firebase/authSocialMedia";
import { googleAuthLogin } from "../redux/action/authActions";

export const useGoogleAuth = () => {
  const login = async () => {
    const res = await socialMediaAuth();
    const exist = await googleAuthLogin(res.email);

    if (exist) {
      localStorage.setItem("ApiKey", JSON.stringify(exist.apiKey));
      localStorage.setItem("Authorization", JSON.stringify(exist.token));
      window.location.href = "/discover";
    } else {
      alert("User doesn't exist");
    }
  };

  return { login };
};
