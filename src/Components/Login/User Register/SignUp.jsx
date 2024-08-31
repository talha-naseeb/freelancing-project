import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import "../Login/style.css";
import axios from "../../../Api/Api";
import { Nav } from "react-bootstrap";
import LanguageSelector from "../../Languages/LanguageSelector";

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    { countryID: "+996", name: "+996 (SAR)" },
    { countryID: "+1", name: "+1 (USA)" },
    { countryID: "+44", name: "+44 (UK)" },
    { countryID: "+971", name: "+971 (UAE)" },
    { countryID: "+962", name: "+962 (Jordan)" },
    { countryID: "+91", name: "+91 (India)" },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/Admin/CreateAppUser", data);
      if (response.status === 200) {
        toast.success(t("SignUp.signUpSuccess"));
        onSignUp(response.data);
        navigate("/welcome");

        reset();
      } else {
        toast.error(t("SignUp.signUpErr"));
        reset();
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(t("SignUp.signUpFailed"));
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
            <h2 className='text-center'>{t("SignUp.welcome")}</h2>
            <p className='text-center'>{t("SignUp.createAccount")}</p>

            <div className='mb-3'>
              <label htmlFor='FullName' className='form-label'>
                {t("SignUp.fullName")} <span className='required'>*</span>
              </label>
              <input
                type='text'
                placeholder={t("SignUp.fullName")}
                className={`form-control`}
                {...register("FullName", {
                  required: t("SignUp.fullNameRequired"),
                })}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='EmailID' className='form-label'>
                {t("SignUp.email")} <span className='required'>*</span>
              </label>
              <input
                type='email'
                placeholder={t("SignUp.email")}
                className={`form-control`}
                {...register("EmailID", {
                  required: t("SignUp.emailRequired"),
                })}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='MobileNumber' className='form-label'>
                {t("SignUp.mobileNumber")} <span className='required'>*</span>
              </label>
              <div className='d-flex'>
                <select
                  className='form-select me-2'
                  style={{ width: "30%" }}
                  {...register("CountryCode", {
                    required: t("SignUp.countryCodeRequired"),
                  })}
                >
                  <option value='' disabled>
                    {t("SignUp.Codes")}
                  </option>
                  {countryCodes.map((country) => (
                    <option key={country.countryID} value={country.countryID}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <input
                  type='text'
                  placeholder={t("SignUp.mobileNumber")}
                  className='form-control'
                  style={{ width: "calc(70% - 40px)" }}
                  {...register("MobileNumber", {
                    required: t("SignUp.mobileNumberRequired"),
                    pattern: {
                      value: /^[0-9]+$/,
                    },
                  })}
                />
              </div>
            </div>

            <div className='d-grid'>
              <button type='submit' className='btn-SignIn'>
                {t("SignUp.signUp")}
              </button>
            </div>
            <div style={{ marginTop: "30px" }} className='d-flex align-items-center justify-content-start'>
              {t("SignUp.alreadyHaveAcc")}
              <Nav.Link as={Link} to='/auth/admin/login' className='link-item fw-bold px-2'>
                {t("SignUp.logIn")}
              </Nav.Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
