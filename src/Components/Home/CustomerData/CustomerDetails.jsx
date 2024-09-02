// import React, { useEffect, useState } from "react";
// import axios from "../../../Api/Api";
// import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Row, Col } from "react-bootstrap";
// import "./style.css";
// import { FaUsers } from "react-icons/fa6";
// import { BsDownload } from "react-icons/bs";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// function CustomerDetails() {
//   const { t } = useTranslation();
//   const { customerID } = useParams();
//   const [customerData, setcustomerData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const token = sessionStorage.getItem("token");
//     const navigate = useNavigate();


//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/admin/GetCustomerByCustomerID?customerId=${customerID}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setcustomerData(response.data.response);
//       } catch (error) {
//         console.error("Error fetching customer details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomerDetails();
//   }, [customerID, token]);

//   const handleDownload = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/api/prop/GenerateCustomerPdf?customerID=${customerID}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         responseType: "arraybuffer",
//       });

//       if (response.status === 200) {
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);

//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `${customerData.name}-document.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error("Failed to download the document.");
//       }
//     } catch (error) {
//       console.error("Error downloading the document:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='my-3 container'>
//       {/* Loader overlay */}
//       {loading && (
//         <div className='loader-overlay'>
//           <div className='loader'></div>
//         </div>
//       )}
//       <div className='userProfile-form'>
//         <Row className='container text-black mb-2'>
//           <div className='d-flex align-items-center justify-between gap-2 mb-3'>
//             <div className='d-flex align-items-center gap-2 mb-3'>
//               <IoIosArrowBack className='rtl-icon' onClick={() => navigate("/all-customers-data")} />

//               <FaUsers size={30} />
//               <label className='text-black' style={{ fontSize: "20px", fontWeight: "600" }}>
//                 {t("customerDetails.title")}
//               </label>
//             </div>
//             <div className='d-flex align-items-center gap-2 mb-3' onClick={handleDownload} style={{ cursor: "pointer" }}>
//               <BsDownload size={25} />
//               <label className='text-black' style={{ fontSize: "20px", fontWeight: "600" }}>
//                 {t("CustomersData.Download")}
//               </label>
//             </div>
//           </div>
//           <Col md={6}>
//             <p>
//               <strong>{t("customerDetails.name")}:</strong> {customerData.name}
//             </p>
//             <p>
//               <strong>{t("customerDetails.mobileNo")}:</strong> {customerData.mobileNo}
//             </p>
//             <p>
//               <strong>{t("customerDetails.licenceNo")}:</strong> {customerData.licenceNo}
//             </p>
//             <p>
//               <strong>{t("customerDetails.advertisementDate")}:</strong> {new Date(customerData.advertisementDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>{t("customerDetails.propertyType")}:</strong> {customerData.propertyType}
//             </p>
//             <p>
//               <strong>{t("customerDetails.dealType")}:</strong> {customerData.dealType}
//             </p>
//             <p>
//               <strong>{t("customerDetails.city")}:</strong> {customerData.city}
//             </p>
//             <p>
//               <strong>{t("customerDetails.district")}:</strong> {customerData.district}
//             </p>
//             <p>
//               <strong>{t("customerDetails.propertyLocation")}:</strong> {customerData.propertyLocation}
//             </p>
//           </Col>
//           <Col md={6}>
//             <p>
//               <strong>{t("customerDetails.leadingProperty")}:</strong> {customerData.leadingProperty}
//             </p>
//             <p>
//               <strong>{t("customerDetails.totalArea")}:</strong> {customerData.totalArea}
//             </p>
//             <p>
//               <strong>{t("customerDetails.landmark")}:</strong> {customerData.landmark}
//             </p>
//             <p>
//               <strong>{t("customerDetails.propertyNo")}:</strong> {customerData.propertyNo}
//             </p>
//             <p>
//               <strong>{t("customerDetails.additionalDetails")}:</strong> {customerData.additionalDetails}
//             </p>
//             <p>
//               <strong>{t("customerDetails.transactionType")}:</strong> {customerData.transactionType}
//             </p>
//             <p>
//               <strong>{t("customerDetails.propertyValue")}:</strong> {customerData.propertyValue}
//             </p>
//           </Col>
//         </Row>
//         <Row>
//           {[customerData.image1, customerData.image2, customerData.image3, customerData.image4, customerData.image5, customerData.image6, customerData.image7, customerData.image8]
//             .filter((image) => image !== null)
//             .map((image, index) => (
//               <Col md={2} key={index} className='customer-images mb-3'>
//                 <img src={image} alt={`Property Image ${index + 1}`} className='customer-image' />
//               </Col>
//             ))}
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default CustomerDetails;

import React, { useEffect, useState } from "react";
import axios from "../../../Api/Api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col, Form } from "react-bootstrap"; // Import Form component from react-bootstrap
import "./style.css";
import { FaUsers } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CustomerDetails() {
  const { t } = useTranslation();
  const { customerID } = useParams();
  const [customerData, setCustomerData] = useState("");
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/admin/GetCustomerByCustomerID?customerId=${customerID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomerData(response.data.response);
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
    <div className='my-3 container'>
      {/* Loader overlay */}
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <div className='userProfile-form'>
        <Row className='container text-black mb-2'>
          <div className='d-flex align-items-center justify-between gap-2 mb-3'>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <IoIosArrowBack className='rtl-icon' onClick={() => navigate("/all-customers-data")} />

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

          {/* Three fields in one line */}
          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.name")}</Form.Label>
                <Form.Control type='text' value={customerData.name || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.mobileNo")}</Form.Label>
                <Form.Control type='text' value={customerData.mobileNo || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.licenceNo")}</Form.Label>
                <Form.Control type='text' value={customerData.licenceNo || ""} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.advertisementDate")}</Form.Label>
                <Form.Control type='text' value={new Date(customerData.advertisementDate).toLocaleDateString() || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.propertyType")}</Form.Label>
                <Form.Control type='text' value={customerData.propertyType || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.dealType")}</Form.Label>
                <Form.Control type='text' value={customerData.dealType || ""} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.city")}</Form.Label>
                <Form.Control type='text' value={customerData.city || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.district")}</Form.Label>
                <Form.Control type='text' value={customerData.district || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.propertyLocation")}</Form.Label>
                <Form.Control type='text' value={customerData.propertyLocation || ""} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.leadingProperty")}</Form.Label>
                <Form.Control type='text' value={customerData.leadingProperty || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.totalArea")}</Form.Label>
                <Form.Control type='text' value={customerData.totalArea || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.landmark")}</Form.Label>
                <Form.Control type='text' value={customerData.landmark || ""} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.propertyNo")}</Form.Label>
                <Form.Control type='text' value={customerData.propertyNo || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.additionalDetails")}</Form.Label>
                <Form.Control type='text' value={customerData.additionalDetails || ""} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.transactionType")}</Form.Label>
                <Form.Control type='text' value={customerData.transactionType || ""} disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("customerDetails.propertyValue")}</Form.Label>
                <Form.Control type='text' value={customerData.propertyValue || ""} disabled />
              </Form.Group>
            </Col>
          </Row>
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


