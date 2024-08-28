import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CustomToaster() {
  return (
    <ToastContainer position='bottom-center' style={{ zIndex: "1050" }} autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  );
}
export default CustomToaster;
