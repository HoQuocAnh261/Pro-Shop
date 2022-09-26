import axiosClient from "./axiosClient";

const productApi = {
  getAll(keyword, pageNumber) {
    const url = `/products?keyword=${keyword}&pageNumber=${pageNumber}`;
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  deleteProduct(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  createProduct() {
    const url = "/products";
    return axiosClient.post(url);
  },
  updateProduct(data) {
    const url = `products/${data._id}`;
    return axiosClient.put(url, data);
  },
  createProductReview(id, data) {
    const url = `products/${id}/reviews`;
    return axiosClient.post(url, data);
  },
  getListTopProduct() {
    const url = "products/top";
    return axiosClient.get(url);
  },
};

export default productApi;
