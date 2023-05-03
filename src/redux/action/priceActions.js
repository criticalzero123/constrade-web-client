import api from "../../utilities/api";

export const getPricesFromQuery = async (text) => {
  // try {
  //   const res = await api
  //     .setAuthHeaders()
  //     .get(`/api/price/product?query=${text}`);
  //   return res.data.responseData;
  // } catch (error) {
  //   console.error(error);
  // }
  try {
    const res = await api.get(
      `https://www.pricecharting.com/api/products?t=c0b53bce27c1bdab90b1605249e600dc43dfd1d5&q=${text}`
    );

    return res.data.products;
  } catch (error) {
    console.error(error);
  }
};

export const getShopFromName = async (name) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/price/product/shop?name=${name}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
