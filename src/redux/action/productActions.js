import api from "../../utilities/api";

export const addProduct = async (productDetails, imageList) => {
  try {
    const data = {
      product: productDetails,
      imageUrlList: imageList,
    };
    const res = await api.setAuthHeaders().post(`/api/products`, data);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (productId, productInfo) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(`/api/products/${productId}`, productInfo);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByUser = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/products/user/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (productId, userId) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_ID_REQUEST" });
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/products/${productId}?uid=${userId}`);

    dispatch({
      type: "GET_PRODUCT_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_ID_FAILED", error: error });
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().delete(`/api/products/${productId}`);

    dispatch({
      type: "DELETE_PRODUCT_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_BY_ID_FAILED", error: error });
  }
};

export const addFavorite = async (info) => {
  try {
    const res = await api.setAuthHeaders().post(`/api/products/favorite`, info);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong");
    return;
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/products/favorite/${favoriteId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteByUserId = async (userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/products/favorite/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const reportProduct = (info) => async (dispatch) => {
  dispatch({ type: "REPORT_PRODUCT_REQUEST" });

  try {
    const result = await api.setAuthHeaders().post(`api/products/report`, info);

    dispatch({
      type: "REPORT_PRODUCT_SUCCESS",
      payload: result.data.responseData,
    });

    if (result.data.responseData) alert("Product reported");
  } catch (err) {
    dispatch({ type: "REPORT_PRODUCT_FAILED", error: err });
  }
};

export const getProductBoost = async (id) => {
  try {
    const result = await api.setAuthHeaders().get(`api/products/boost/${id}`);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const addProductBoost = async (id, days, userId) => {
  try {
    const result = await api
      .setAuthHeaders()
      .post(`api/products/boost/${id}?days=${days}&userId=${userId}`);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const editProductBoost = async (id, days) => {
  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/products/boost/${id}?days=${days}`);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const cancelProductBoost = async (id) => {
  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/products/boost/${id}/cancel`);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};
