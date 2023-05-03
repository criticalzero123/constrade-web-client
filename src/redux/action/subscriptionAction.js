import api from "../../utilities/api";

export const subscribeUser = async (userId) => {
  try {
    const res = await api.put(`/api/subscription/subscribe/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};
export const getSubscriptionHistory = async (userId) => {
  try {
    const res = await api.get(`/api/subscription/history/user/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const cancelSubscription = async (userId) => {
  try {
    const res = await api.put(`/api/subscription/cancel/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
