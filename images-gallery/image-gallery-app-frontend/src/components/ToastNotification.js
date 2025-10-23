import React from "react";
import { toast, Bounce } from "react-toastify";

const showToast = (type, message) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
  });
};

export default showToast;
