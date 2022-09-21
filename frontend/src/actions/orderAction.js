import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants.js";
import orderApi from "../api/orderApi";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const data = await orderApi.createOrder(order);
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};
