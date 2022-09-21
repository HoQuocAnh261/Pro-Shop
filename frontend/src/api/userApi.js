import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/user/login";
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = "/user";
    return axiosClient.post(url, data);
  },

  getUserDetail(id) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },

  updateUserProfile(data) {
    const url = `/user/profile`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
