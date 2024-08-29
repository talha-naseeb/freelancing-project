import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LanguageSelector from "../Languages/LanguageSelector";
import axios from "../../Api/Api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/Customers/Login", data);
      if (response.status === 200) {
        toast.success(t("Login.loginSuccess"));
        const token = response.data.Token;
        onLogin(token);
        navigate("/all-customers-data");

        reset();
      } else {
        toast.error(t("Login.logErr"));
        reset();
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(t("Login.logFailed"));
      reset();
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}

      <div className='login-form'>
        <form onSubmit={handleSubmit(onSubmit)} className='main-form'>
          <LanguageSelector />
          <div className='my-3 m-auto'>
            <h2 className='text-center'>{t("Login.welcome")}</h2>
            <p className='text-center'>{t("Login.signContinue")}</p>
            <div className='mb-3'>
              <label htmlFor='Username' className='form-label'>
                {t("Login.email")} <span className='required'>*</span>
              </label>
              <input
                type='text'
                placeholder={t("Login.email")}
                className={`form-control`}
                {...register("Username", {
                  required: t("Login.emailRequired"),
                })}
              />
            </div>
            <div className='mb-3 position-relative'>
              <label htmlFor='Password' className='form-label'>
                {t("Login.Password")} <span className='required'>*</span>
              </label>
              <div className='password-wrapper'>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type between password and text
                  placeholder={t("Login.Password")}
                  className={`form-control`}
                  {...register("Password")}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className='eye-icon'
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on state */}
                </span>
              </div>
            </div>
            <div className='d-grid'>
              <button type='submit' className='btn-SignIn'>
                {t("Login.sigIn")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
