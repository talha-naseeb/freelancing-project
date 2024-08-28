import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LanguageSelector from "../Languages/LanguageSelector";
import axios from "../../Api/Api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
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
            <div className='mb-3'>
              <label htmlFor='Password' className='form-label'>
                {t("Login.Password")} <span className='required'>*</span>
              </label>
              <input type='password' placeholder={t("Login.Password")} className={`form-control`} {...register("Password")} />
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
