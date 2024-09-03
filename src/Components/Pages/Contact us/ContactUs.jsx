import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-[#1b2020] text-[#ff5757] h-[100vh]'>
      <Header />
      <div className='d-flex justify-center align-items-start flex-col px-5 m-5'>
        <h1>{t("contactUs.title")}</h1>
        <p>{t("contactUs.description")}</p>
        <h2>{t("contactUs.contactInformationTitle")}</h2>
        <p>
          {t("contactUs.phoneLabel")}: {t("contactUs.phone")}
        </p>
        <p>
          {t("contactUs.emailLabel")}: {t("contactUs.email")}
        </p>
        <h2>{t("contactUs.officeLocationTitle")}</h2>
        <p>{t("contactUs.officeAddress")}</p>
      </div>
    </div>
  );
};

export default ContactUs;
