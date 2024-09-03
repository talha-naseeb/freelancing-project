import React from "react";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import "../../Forms/form.css";
import { useNavigate } from "react-router-dom";

function Thankyou() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleHomeRoute = () => {
    navigate("/");
    sessionStorage.removeItem("customerData");
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-[5rem] bg-[#1b2020]'>
        <div className='ThankyouServices' onClick={handleHomeRoute}>
          <h1 className='fw-bold'>{t("Form.Thankyou")}</h1>
          <p>{t("Form.ChoosingService")}</p>
          <PiHandsPrayingDuotone size={60} />
        </div>
    </div>
  );
}

export default Thankyou;
