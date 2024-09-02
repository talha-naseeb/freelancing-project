import React from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import DownloadPdf from "./DownloadPdf";
import Thankyou from "./Thankyou";

function CustomerData() {
  const { t } = useTranslation();
  return (
    <>
      <div className='MainDiv'>
        <Header />
        <div className='d-flex justify-content-center align-items-center mt-[10rem] bg-[#1b2020]'>
          <div className='container '>
            <Thankyou />
            <DownloadPdf />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerData;
