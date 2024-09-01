import React from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import DownloadPdf from "./DownloadPdf";

function CustomerData() {
  const { t } = useTranslation();
  return (
    <>
      <div className='MainDiv'>
        <Header />
        <div className='d-flex justify-content-center align-items-center mt-[10rem] bg-[#1b2020]'>
          <div className='container '>
            <div className='d-flex align-items-center justify-content-center'>
              <label className='text-[#ff5757]' style={{ fontSize: "20px", fontWeight: "500" }}>
                {t("CustomerData.CustomerData")}
              </label>
            </div>
            <DownloadPdf />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerData;
