import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";

export const getToken = () => {
  return localStorage.getItem("auth_token");

};

//! Bookings
export const issueBooking = async (id) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking-issue`,
      data: {
        pnr: id,
      },
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return { status: false, data: response.data };
    }
  } catch (error) {
  }
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

export const refundRequest = async (payload) => {

  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/request-booking-refund`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.status === 200) {
      return { status: true, message: "Refund Requested" };
    }
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: "Failed while sending booking refund request",
      };
    } else {
      return {
        status: false,
        message: "Server Connection Error!",
      };
    }
  }
};

export const confirmBooking = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        message: "Booking Created",
      };
    } else {
      return {
        status: false,
        message: response.message,
      };
    }
  } catch (error) {
    if (error.response.data.data.errors) {
      return {
        status: false,
        message: Object.values(error.response.data.data.errors),
      };
    } else {
      return {
        status: false,
        message: error.response.data.message,
      };
    }
  }
};

//! Booking Active Routes
export const getRoutes = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking-all-active-routes`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        data: response.data.data.Routes,
      };
    }
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while fetching routes.",
    };
  }
};
