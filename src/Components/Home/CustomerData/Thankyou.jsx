import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import "../../Forms/form.css";
import Header from "../../Header/Header";

function Thankyou() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='MainDiv'>
      <Header />
      <div className='d-flex justify-content-center align-items-center mt-[15rem] bg-[#1b2020]'>
        <div className='ThankyouServices'>
          <h1 className='fw-bold'>{t("Form.Thankyou")}</h1>
          <p>{t("Form.ChoosingService")}</p>
          <PiHandsPrayingDuotone size={60} />
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
