import api from "../../utilities/api";

export const getSearchResult = async (search) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/home?text=${search}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResultGenre = async (search) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/genre?genre=${search}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResultPlatform = async (search) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/platform?platform=${search}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchCategory = async (tradeMethod) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/method?method=${tradeMethod}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getBoostedProducts = async () => {
  try {
    const res = await api.setAuthHeaders().get(`/api/home/boosted`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularProduct = async (count) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/popular?count=${count}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getCommunityPopular = async (userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/home/community?userId=${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getCommunity = async (userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community?userId=${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
