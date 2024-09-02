import React from "react";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import "../../Forms/form.css";
import { Link } from "react-router-dom";

function Thankyou() {
  const { t } = useTranslation();

  return (
    <div className='d-flex justify-content-center align-items-center mt-[5rem] bg-[#1b2020]'>
      <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
        <div className='ThankyouServices'>
          <h1 className='fw-bold'>{t("Form.Thankyou")}</h1>
          <p>{t("Form.ChoosingService")}</p>
          <PiHandsPrayingDuotone size={60} />
        </div>
      </Link>
    </div>
  );
}

export default Thankyou;
