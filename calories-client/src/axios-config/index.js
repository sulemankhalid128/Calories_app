import axios from "axios";
// import store from "../stores/configureStore";

const getAuthHeaders = () => ({
  // Authorization: `Bearer ${store.getState().authStoreState.token}`,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  debugger;
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

// const hostname = window && window.location && window.location.hostname;
axios.defaults.baseURL = "http://localhost:3005";
axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (
      err.response.status === 401
      // err.response.data &&
      // (err.response.data.code === 3 || err.response.data.code === 4)
    ) {
      // store.dispatch({ type: "LOGGED_OUT" });
      throw err;
    }
    return Promise.reject(err.response);
  }
);

export const ApiService = {
  // createUser(item) {

  //   return axios.post("/user/create", item);
  // },

  editUser(id, data) {
    return axios.put(`users/${id}/info`, data, { headers: getAuthHeaders() });
  },

  createFoodEntry(payload) {
    return axios.post(`/create/food/entry`, payload);
  },

  deleteUser(id) {
    return axios.delete(`users/${id}`, { headers: getAuthHeaders() });
  },

  getUserEntries({ userId, limit = 10, skip = 0, searchTerm = "" }) {
    debugger;
    const params = {};
    params.skip = skip.toString();
    params.limit = limit.toString();
    params.searchTerm = searchTerm;
    return axios.get(`/user/entries/${userId}`, { params });
  },
  getUsers({ limit = 10, skip = 0, searchTerm = "" }) {
    const params = {};
    params.skip = skip.toString();
    params.limit = limit.toString();
    params.searchTerm = searchTerm;
    debugger;
    return axios.get(`/users`, { params });
  },

  updateUserEntry(id, data) {
    debugger;
    return axios.put(`/update/user/entry/${id}`, data);
  },

  deleteUserFoodEntry(id) {
    return axios.delete(`/remove/user/entry/${id}`);
  },
};
