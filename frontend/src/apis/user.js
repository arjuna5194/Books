import axios from "./axios.js";
import { toast } from "react-toastify";

export const signUp = async (payload) => {
  try {
    await axios.post("/Signup", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("User created Successfully");
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const logIn = async (payload) => {
  try {
    const response = await axios.post("/Login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("token", response.data.token);
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const forgotPassword = async (email) => {
  try {
    await axios.post(
      "/forgotPassword",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Reset Link Sent successfully");
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const resetPassword = async ({ password, token }) => {
  try {
    await axios.patch(
      "/resetPassword",
      { password, token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Password reset successfully");
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const getProfile = async () => {
  try {
    return (await axios.get("/getProfile")).data;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};
