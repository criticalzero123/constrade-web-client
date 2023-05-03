import api from "../../utilities/api";

export const soldProduct = async (info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post("/api/transactions/product", info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getProductTransaction = async (productId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/transactions/product/${productId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTransactions = async (userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/transactions/users/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
