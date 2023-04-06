import api from "../../utilities/api";

export const googleAuthLogin = async (email) => {
  try {
    const res = await api.put(`/api/auth/login/google`, { email });

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const emailAndPasswordAuthLogin = async (userInfo) => {
  try {
    const res = await api.put(`/api/auth/login`, userInfo);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
