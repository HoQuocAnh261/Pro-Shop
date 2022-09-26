import axiosClient from "./axiosClient";

const orderApi = {
  createOrder(data) {
    const url = "/order";
    return axiosClient.post(url, data);
  },

  getOrderById(id) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  updateOrder(id, data) {
    const url = `order/${id}/pay`;
    return axiosClient.put(url, data);
  },

  getListMyOrder() {
    const url = "order/my-order";
    return axiosClient.get(url);
  },
  getListOrder() {
    const url = "/order";
    return axiosClient.get(url);
  },
  orderDelivered(id) {
    const url = `/order/${id}/deliver`;
    return axiosClient.put(url);
  },
};

export default orderApi;
