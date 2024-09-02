import React, { useState } from "react";
import axios from "../../../Api/Api";
import { IoIosCloudDownload } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function DownloadPdf() {
  const customerID = sessionStorage.getItem("customerData");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GenerateDocument = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/prop/GenerateCustomerPdf?customerID=${customerID}`, {
        responseType: "arraybuffer",
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Property-document.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='ThankyouServices mt-5'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <div className='ThankyouServices' onClick={GenerateDocument}>
        <IoIosCloudDownload size={50} />
        <h1>{t("Form.DownloadPDF")}</h1>
      </div>
    </div>
  );
}

export default DownloadPdf;
