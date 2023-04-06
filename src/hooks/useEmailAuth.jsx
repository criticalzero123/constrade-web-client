import { emailAndPasswordAuthLogin } from "../redux/action/authActions";

export const useEmailAuth = () => {
  const loginEmail = async (email, password) => {
    const res = await emailAndPasswordAuthLogin({ email, password });

    if (res) {
      localStorage.setItem("ApiKey", JSON.stringify(res.apiKey));
      localStorage.setItem("Authorization", JSON.stringify(res.token));
      window.location.href = "/discover";
    } else {
      alert("User doesn't exist");
    }
  };

  return { loginEmail };
};
