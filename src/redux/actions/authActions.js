import axios from "axios";
import { message } from "antd";
//import { useNavigate } from "react-router-dom";

import { LOADING } from "../constants/alertsConstants";

export const userLogin = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.post(
      "https://enveco-server-final.herokuapp.com/api/users/login",
      data
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successful");
    dispatch({ type: LOADING, payload: false });

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Login failed");
    dispatch({ type: LOADING, payload: false });
  }
};

export const userRegister = (data) => async (dispatch) => {
  //const navigate = useNavigate()

  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post(
      "https://enveco-server-final.herokuapp.com/api/users/register",
      data
    );
    message.success("Registration successful");
    setTimeout(() => {
      /* navigate("/login") */
      window.location.href = "/login";
    }, 500);

    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    message.error("Register failed");
    dispatch({ type: LOADING, payload: false });
  }
};
