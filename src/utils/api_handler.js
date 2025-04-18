import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";

export const getToken = () => {
  return localStorage.getItem("auth_token");

};

export const cancelFlightBooking = async (payload) => {

  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/request-cancel-booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.status === 200) {
      return { status: true, message: "Cancelled Requested" };
    }
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: "Failed while cancelling booking",
      };
    } else {
      return {
        status: false,
        message: "Server Connection Error!",
      };
    }
  }
};