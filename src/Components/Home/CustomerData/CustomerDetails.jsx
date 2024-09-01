import React, { useEffect, useState } from "react";
import axios from "../../../Api/Api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import { FaUsers } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";

function CustomerDetails() {
  const { t } = useTranslation();
  const { customerID } = useParams();
  const [customerData, setcustomerData] = useState("");
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/admin/GetCustomerByCustomerID?customerId=${customerID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setcustomerData(response.data.response);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerID, token]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/prop/GenerateCustomerPdf?customerID=${customerID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${customerData.name}-document.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download the document.");
      }
    } catch (error) {
      console.error("Error downloading the document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-3 container'>
      {/* Loader overlay */}
      {loading && (
        <div className='loader-overlay'>
          <div className='loader1'></div>
        </div>
      )}
      <div className='userProfile-form'>
        <Row className='container text-black mb-2'>
          <div className='d-flex align-items-center justify-between gap-2 mb-3'>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <FaUsers size={30} />
              <label className='text-black' style={{ fontSize: "20px", fontWeight: "600" }}>
                {t("customerDetails.title")}
              </label>
            </div>
            <div className='d-flex align-items-center gap-2 mb-3' onClick={handleDownload} style={{ cursor: "pointer" }}>
              <BsDownload size={25} />
              <label className='text-black' style={{ fontSize: "20px", fontWeight: "600" }}>
                {t("CustomersData.Download")}
              </label>
            </div>
          </div>
          <Col md={6}>
            <p>
              <strong>{t("customerDetails.name")}:</strong> {customerData.name}
            </p>
            <p>
              <strong>{t("customerDetails.mobileNo")}:</strong> {customerData.mobileNo}
            </p>
            <p>
              <strong>{t("customerDetails.licenceNo")}:</strong> {customerData.licenceNo}
            </p>
            <p>
              <strong>{t("customerDetails.advertisementDate")}:</strong> {new Date(customerData.advertisementDate).toLocaleDateString()}
            </p>
            <p>
              <strong>{t("customerDetails.propertyType")}:</strong> {customerData.propertyType}
            </p>
            <p>
              <strong>{t("customerDetails.dealType")}:</strong> {customerData.dealType}
            </p>
            <p>
              <strong>{t("customerDetails.city")}:</strong> {customerData.city}
            </p>
            <p>
              <strong>{t("customerDetails.district")}:</strong> {customerData.district}
            </p>
            <p>
              <strong>{t("customerDetails.propertyLocation")}:</strong> {customerData.propertyLocation}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>{t("customerDetails.leadingProperty")}:</strong> {customerData.leadingProperty}
            </p>
            <p>
              <strong>{t("customerDetails.totalArea")}:</strong> {customerData.totalArea}
            </p>
            <p>
              <strong>{t("customerDetails.landmark")}:</strong> {customerData.landmark}
            </p>
            <p>
              <strong>{t("customerDetails.propertyNo")}:</strong> {customerData.propertyNo}
            </p>
            <p>
              <strong>{t("customerDetails.additionalDetails")}:</strong> {customerData.additionalDetails}
            </p>
            <p>
              <strong>{t("customerDetails.transactionType")}:</strong> {customerData.transactionType}
            </p>
            <p>
              <strong>{t("customerDetails.propertyValue")}:</strong> {customerData.propertyValue}
            </p>
          </Col>
        </Row>
        <Row>
          {[customerData.image1, customerData.image2, customerData.image3, customerData.image4, customerData.image5, customerData.image6, customerData.image7, customerData.image8]
            .filter((image) => image !== null)
            .map((image, index) => (
              <Col md={2} key={index} className='customer-images mb-3'>
                <img src={image} alt={`Property Image ${index + 1}`} className='customer-image' />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default CustomerDetails;
