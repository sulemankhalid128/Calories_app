import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("calories_token");
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

// const hostname = window && window.location && window.location.hostname;
axios.defaults.baseURL = "http://localhost:3005";
axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 401) {
      throw err;
    }
    return Promise.reject(err.response);
  }
);

export const ApiService = {
  // this call used for the get user by is name
  getUserByName(name) {
    return axios.get(`find/user`, { params: { name } });
  },

  // this call used to getting the reached days entries
  getReachedDays() {
    return axios.get(`/get/limit/exceeded`);
  },

  // this call is used for the creating food entry
  createFoodEntry(payload) {
    return axios.post(`/create/food/entry`, payload);
  },

  // used for the delete user
  deleteUser(id) {
    return axios.delete(`user/${id}`);
  },
  // this is used for the getting user entries and filtering
  getUserEntries({ userId, limit = 10, skip, searchFilter, sort }) {
    const params = {};
    params.skip = skip.toString();
    params.limit = limit.toString();
    params.searchFilter = searchFilter;
    params.sort = sort;
    return axios.get(`/user/entries/${userId}`, { params });
  },

  // this  call is used for the getting all user for admin
  getUsers({ limit, skip }) {
    const params = {};
    params.skip = skip.toString();
    params.limit = limit.toString();
    return axios.get(`/users`, { params });
  },

  // this call is used for the update user entry (admin)
  updateUserEntry(id, data) {
    return axios.put(`/update/user/entry/${id}`, data);
  },

  // used to validate the admin with password
  validateAdmin(data) {
    return axios.post(`/admin/validate`, data);
  },

  // deleting the user food entry
  deleteUserFoodEntry(id) {
    return axios.delete(`/remove/user/entry/${id}`);
  },

  // this is used for refresh the user token is its expire
  refreshToken(userId) {
    return axios.post(`/refresh/token/${userId}`);
  },

  // this is used for the set the new threshold limit of the user by passing id
  resetLimit(userId, threshold) {
    return axios.post(`/reset/threshold/${userId}`, { threshold });
  },

  // getting stats of food entries for admin
  getStats() {
    return axios.get(`/get/stats`);
  },
};
