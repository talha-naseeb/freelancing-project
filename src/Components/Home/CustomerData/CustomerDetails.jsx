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
import RightImage from "../../../assets/images/2.png";
import leftImage from "../../../assets/images/2.png";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoListCircleOutline } from "react-icons/io5";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function CustomerDetails() {
  const { t } = useTranslation();
  const { customerID } = useParams();
  const [customerData, setCustomerData] = useState("");
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const [images, setImages] = useState([]);
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
        const data = response.data.response;
        const imageArray = [
          { id: 1, url: data.image1 },
          { id: 2, url: data.image2 },
          { id: 3, url: data.image3 },
          { id: 4, url: data.image4 },
          { id: 5, url: data.image5 },
          { id: 6, url: data.image6 },
          { id: 7, url: data.image7 },
          { id: 8, url: data.image8 },
        ].filter((image) => image.url !== null); // Filter out null images

        setImages(imageArray.slice(0, 8));
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerID, token]);

  const generatePDF = () => {
    setLoading(true);

    const imgWidth = 210;
    const imgHeight = 190;

    const captureSection = (elementId) => {
      const input = document.getElementById(elementId);
      return html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        return imgData;
      });
    };

    // Capture all 5 sections individually
    Promise.all([captureSection("section1"), captureSection("section2"), captureSection("section3"), captureSection("section4"), captureSection("section5")]).then((sectionImages) => {
      const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);

      // Add each section to a separate page
      sectionImages.forEach((imageData, index) => {
        if (index !== 0) pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      });

      // Save the PDF
      pdf.save(`${customerData.name}-property-details.pdf`);
      setLoading(false);
    });
  };

  const summaryItems = [
    { id: 1, label: "City", value: customerData.city },
    { id: 2, label: "District", value: customerData.district },
    { id: 3, label: "Roads leading to the property", value: customerData.propertyLocation },
    { id: 4, label: "Property Type", value: customerData.propertyType },
    { id: 5, label: "Deal Type", value: customerData.dealType },
    { id: 6, label: "Total Area", value: customerData.totalArea },
    { id: 7, label: "Main Landmarks", value: customerData.landmark },
  ];

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
            <div className='d-flex align-items-center gap-2 mb-3' onClick={generatePDF} style={{ cursor: "pointer" }}>
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
      <div id='pdf-content' dir='ltr' style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
        {/* <div id='pdf-content'> */}
        <div id='section1' className='container1'>
          <div className='background-image'></div>
          <div className='overlay'>
            <h1>{customerData.name}'s Property</h1>
          </div>
        </div>

        {/* second section (Property Summary) */}
        <div id='section2' className='third-section'>
          <div className='summary-content'>
            <h1>Summary</h1>
            <h3 className='sub-title mb-5'>OF THE PROPERTY</h3>
            <ul className='summary-list'>
              {summaryItems.map((item) => {
                const colorClass = item.id % 2 === 0 ? "even" : "odd";
                return (
                  <li key={item.id}>
                    <span className={`summary-number ${colorClass}`}>{item.id}</span>
                    <span className={`summary-label ${colorClass}`}>
                      {item.label}: {item.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='summary-image'>
            <img src={RightImage} alt='Property Overview' />
          </div>
          <div className='highlight-box'>
            <p>The selling value of the property</p>
            <div className='price-info'>
              <span>SR {customerData.propertyValue}</span>
              <span>{customerData.transactionType}</span>
            </div>
          </div>
        </div>

        {/* third Section (Images) */}
        <div id='section3' className='final-section'>
          {images.length > 0 && (
            <div className='featured-image'>
              <img src={images[0].url} alt='Featured' />
              <div className='featured-overlay'>
                <h2>Property Images</h2>
              </div>
              <span className='featured-number'>1</span>
            </div>
          )}

          <div className='thumbnail-row'>
            {images.slice(1, 8).map((image, index) => (
              <div className='thumbnail' key={image.id}>
                <img src={image.url} alt={`Thumb ${index + 2}`} />
                <span className='thumb-number'>{`0${index + 2}`}</span>
              </div>
            ))}
          </div>

          {/* About the property */}
          <div className='about-property'>
            <h2>About the property</h2>
            <p className='property-name'>{customerData.name}</p>
            <p>This could refer to a house, apartment, or piece of land, and details may include location, size, amenities, and ownership rights</p>
            <ul className='property-details'>
              <li>
                <FaMapMarkerAlt /> Property location: {customerData.propertyLocation}
              </li>
              <li>
                <FaPhoneAlt /> Mobile No: {customerData.mobileNo}
              </li>
              <li>
                <IoListCircleOutline /> Licence No: {customerData.licenceNo}
              </li>
            </ul>
          </div>
        </div>

        {/* Fourth section (About the Marketer) */}
        <div id='section4' className='fourth-section'>
          <div className='marketer-details'>
            <div className='d-flex justify-center align-items-center flex-col'>
              <h2>About the marketer</h2>
              <div className='line'></div>
            </div>
            <ul>
              <li>
                <span className='detail-name'>{customerData.name}</span>
              </li>
              <li>
                <span className='detail-phone'>{customerData.mobileNo}</span>
              </li>
              <li>
                <span className='detail-fail'>{customerData.licenceNo}</span>
              </li>
            </ul>
          </div>
          <div className='marketer-image'>
            <img src={leftImage} alt='Marketer' />
          </div>
        </div>

        {/* Last section */}
        <div id='section5' className='second-container'>
          <div className='second-background-image'></div>
          <div className='second-overlay'>
            <h2>Real estate is the future</h2>
            <p>ﻞﺒﻘﺘﺴﻤﻟا ﻮﻫ رﺎﻘﻌﻟا</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
