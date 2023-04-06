import api from "../../utilities/api";

export const googleAuthLogin = async (email) => {
  try {
    const res = await api.put(`/api/auth/login/google`, { email });

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const googleAuthRegister = async (userInfo) => {
  try {
    const res = await api.post(`/api/auth`, userInfo);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
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

export const checkEmail = async (email) => {
  try {
    const res = await api.get(`/api/auth/check/email/${email}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const requestOtpEmail = async (email) => {
  try {
    const res = await api.post(`/api/auth/otp/email`, { sendto: email });

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (email, code) => {
  try {
    const result = await api.get(
      `/api/auth/otp/verify?user=${email}&code=${code}`
    );

    return result.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
