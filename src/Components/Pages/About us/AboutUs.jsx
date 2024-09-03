import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-[#1b2020] text-[#ff5757] h-[100vh]'>
      <Header />
      <div className='d-flex justify-center align-items-start flex-col px-5 m-5'>
        <h1>{t("aboutUs.title")}</h1>
        <p>{t("aboutUs.description")}</p>
        <h2>{t("aboutUs.ourMissionTitle")}</h2>
        <p>{t("aboutUs.ourMissionDescription")}</p>
        <h2>{t("aboutUs.ourVisionTitle")}</h2>
        <p>{t("aboutUs.ourVisionDescription")}</p>
      </div>
    </div>
  );
};

export default AboutUs;
