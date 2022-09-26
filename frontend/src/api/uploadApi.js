import axiosClient from "./axiosClient";

const uploadApi = {
  uploadImage: (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return axiosClient.post(`/upload`, formData, config);
  },
};

export default uploadApi;
