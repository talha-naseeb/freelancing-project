import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "../../../Api/Api";
import { Col, Row, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import DownloadPdf from "./DownloadPdf";

function CustomerData() {
  const [customerData, setCustomerData] = useState("");
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const customerId = sessionStorage.getItem("customerData");
  const { t } = useTranslation();

  // const getCustomerData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/Customers/GetCustomer?customerID=${customerId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       const data = response.data.Data;
  //       setCustomerData(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getCustomerData();
  // }, [customerId, token]);

  return (
    <>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <div className='MainDiv'>
        <Header />
        <div className='d-flex justify-content-center align-items-center mt-[10rem] bg-[#1b2020]'>
          <div className='container userProfile-form'>
            <div className='d-flex align-items-center justify-content-center'>
              <label className='text-[#ff5757]' style={{ fontSize: "20px", fontWeight: "500" }}>
                {t("CustomerData.CustomerData")}
              </label>
            </div>
            {/* <Row className='my-2 '>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.Name")}</Form.Label>
                  <div className='form-static-text'>{customerData.Name}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.mobileNo")}</Form.Label>
                  <div className='form-static-text'>{customerData.MobileNo}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.licenceNo")}</Form.Label>
                  <div className='form-static-text'>{customerData.LicenceNo}</div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.propertyType")}</Form.Label>
                  <div className='form-static-text'>{customerData.PropertyType}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.dealType")}</Form.Label>
                  <div className='form-static-text'>{customerData.DealType}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.City")}</Form.Label>
                  <div className='form-static-text'>{customerData.City}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.propertyLocation")}</Form.Label>
                  <div className='form-static-text'>{customerData.PropertyLocation}</div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("CustomerData.propertyValue")}</Form.Label>
                  <div className='form-static-text'>{customerData.PropertyValue}</div>
                </Form.Group>
              </Col>
            </Row> */}
            <DownloadPdf />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerData;
