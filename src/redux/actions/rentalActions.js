import axios from "axios";
import { message } from "antd";

import { LOADING } from "../constants/alertsConstants";
import { GET_ALL_BOOKINGS } from "../constants/bookingsConstants";

export const bookCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  console.log(data);
  try {
    await axios.post(
      "https://enveco-server-final.herokuapp.com/api/rentals/bookcar",
      data
    );
    dispatch({ type: LOADING, payload: false });

    message.success("Car booked successfully");
    setTimeout(() => {
      window.location.href = "/userRentals";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
    message.error("Something went wrong");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(
      "https://enveco-server-final.herokuapp.com/api/rentals/userRentals"
    );
    dispatch({ type: GET_ALL_BOOKINGS, payload: response.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};
