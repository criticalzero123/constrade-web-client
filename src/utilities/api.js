import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
  });

  const setAuthHeaders = async () => {
    const apiKey = JSON.parse(localStorage.getItem("ApiKey"));
    const token = JSON.parse(localStorage.getItem("Authorization"));
    api.defaults.headers.common["ApiKey"] = apiKey;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  return {
    setAuthHeaders: () => {
      return {
        get: async (url, config) => {
          await setAuthHeaders();
          return api.get(url, config);
        },
        post: async (url, data, config) => {
          await setAuthHeaders();
          return api.post(url, data, config);
        },
        put: async (url, data, config) => {
          await setAuthHeaders();
          return api.put(url, data, config);
        },
        delete: async (url, config) => {
          await setAuthHeaders();
          return api.delete(url, config);
        },
      };
    },
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
  };
};

const api = createApi();

export default api;
