import axios from "axios";
// import store from "../stores/configureStore";

const getAuthHeaders = () => ({
  // Authorization: `Bearer ${store.getState().authStoreState.token}`,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;

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
      return err;
    }
    return Promise.reject(err.response);
  }
);

export const ApiService = {
  createUser(item) {
    debugger;
    return axios.post("/user/create", item);
  },

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

  getMyPreviouslyUsedBikes({ skip = 0 }) {
    const params = { skip: skip.toString() };
    return axios.get("myPreviouslyUsedBikes", {
      params,
      headers: getAuthHeaders(),
    });
  },

  getBikeReservations(bikeId, { skip }) {
    const params = { skip: skip.toString() };
    return axios.get(`bikeReservations/${bikeId}`, {
      params,
      headers: getAuthHeaders(),
    });
  },

  getPastReservations(userId, { skip = 0 }) {
    const params = { skip: skip.toString() };
    return axios.get(`reservations/past/${userId}`, {
      params,
      headers: getAuthHeaders(),
    });
  },

  getUpcomingReservations(userId, { skip = 0 }) {
    const params = { skip: skip.toString() };
    return axios.get(`reservations/upcoming/${userId}`, {
      params,
      headers: getAuthHeaders(),
    });
  },

  reserveBike(bikeId, startDate, endDate) {
    return axios.post(
      "reservations",
      { bikeId, startDate, endDate },
      { headers: getAuthHeaders() }
    );
  },

  cancelReservation(reservationId) {
    return axios.delete(`reservations/${reservationId}`, {
      headers: getAuthHeaders(),
    });
  },

  rateBike(bikeId, rate) {
    return axios.post(
      `ratings/${bikeId}/${rate}`,
      {},
      { headers: getAuthHeaders() }
    );
  },

  getBikesWithPagination({ skip, filter }) {
    const params = this._getBikeParams(filter);
    params.skip = skip.toString();
    return axios.get("bikesWithPagination", {
      params,
      headers: getAuthHeaders(),
    });
  },

  _getBikeParams(filter) {
    const params = {};
    if (filter.model) {
      params["model"] = filter.model;
    }
    if (filter.color) {
      params["color"] = filter.color;
    }
    if (filter.maxWeight) {
      params["maxWeight"] = filter.maxWeight;
    }
    if (filter.minWeight) {
      params["minWeight"] = filter.minWeight;
    }
    if (filter.startDate) {
      params["startDate"] = filter.startDate;
    }
    if (filter.endDate) {
      params["endDate"] = filter.endDate;
    }
    if (filter.longitude) {
      params["longitude"] = filter.longitude;
    }
    if (filter.latitude) {
      params["latitude"] = filter.latitude;
    }
    if (filter.avgRate) {
      params["avgRate"] = filter.avgRate;
    }
    return params;
  },

  getBike(id) {
    return axios.get("bikes/" + id, { headers: getAuthHeaders() });
  },

  getUser(userId) {
    return axios.get(`users/${userId}`, { headers: getAuthHeaders() });
  },

  addBike(data) {
    return axios.post(`bikes`, data, { headers: getAuthHeaders() });
  },

  forgottenPassword(email) {
    return axios.post("recovery_code_requests", { email });
  },

  changeMyPasswordUsingRecoveryCode({ recoveryCode, email, newPassword }) {
    return axios.post("recovery_code", { recoveryCode, email, newPassword });
  },

  changePasswordUsingOldPassword({ oldPassword, newPassword }) {
    return axios.patch(
      "password",
      { oldPassword, newPassword },
      { headers: getAuthHeaders() }
    );
  },

  changeOtherUserPassword(id, newPassword) {
    return axios.patch(
      `users/${id}/password`,
      { newPassword },
      { headers: getAuthHeaders() }
    );
  },
};
