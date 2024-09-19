  import React, { useState, useEffect } from "react";
  import axios from "../../../Api/Api";
  import { IoIosCloudDownload } from "react-icons/io";
  import { useTranslation } from "react-i18next";
  import { useNavigate } from "react-router-dom";
  import RightImage from "../../../assets/images/2.png";
  import leftImage from "../../../assets/images/2.png";
  import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
  import { IoListCircleOutline } from "react-icons/io5";
  import { jsPDF } from "jspdf";
  import html2canvas from "html2canvas";
  import { staticToken } from "../../../Api/Tokens/token";

  function DownloadPdf() {
    const customerID = sessionStorage.getItem("customerData");
    const [customerData, setCustomerData] = useState({});
    const token = staticToken;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(`/api/prop/GetCustomerByCustomerID?customerId=${customerID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.response;
          setCustomerData(data);

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
          console.error("Error fetching customer data:", error);
        }
      };

      fetchCustomerData();
    }, [customerID]);

    const generatePDF = () => {
      setLoading(true);
      const input = document.getElementById("pdf-content");

      html2canvas(input, {
        scale: window.innerWidth > 768 ? 2 : 1, // Higher scale for larger screens
        useCORS: true, // Ensure cross-origin images are handled
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add extra pages if content is more than one page
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${customerData.name}-property-details.pdf`);
        setLoading(false);
      });
    };

    const summaryItems = [
      { id: 1, label: "City", value: customerData.city },
      { id: 2, label: "District", value: customerData.district },
      { id: 3, label: "Roads leading to the property", value: customerData.propertyLocation }, // Assuming this is the road information
      { id: 4, label: "Property Type", value: customerData.propertyType },
      { id: 5, label: "Deal Type", value: customerData.dealType },
      { id: 6, label: "Total Area", value: customerData.totalArea },
      { id: 7, label: "Main Landmarks", value: customerData.landmark },
    ];

    return (
      <>
        <div className='ThankyouServices mt-5'>
          {loading && (
            <div className='loader-overlay'>
              <div className='loader'></div>
            </div>
          )}
          <div className='ThankyouServices' onClick={generatePDF}>
            <IoIosCloudDownload size={50} />
            <h1>{t("Form.DownloadPDF")}</h1>
          </div>
        </div>

        <div id='pdf-content' style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
          <div className='container1'>
            <div className='background-image'></div>
            <div className='overlay'>
              <h1>{customerData.name}'s Property</h1>
            </div>
          </div>

          {/* Third section (Property Summary) */}
          <div className='third-section'>
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
            <div className='summary-content'>
              <h1>Summary</h1>
              <h3 className='sub-title mb-5'>OF THE PROPERTY</h3>
              <ul className='summary-list'>
                {summaryItems.map((item) => {
                  const colorClass = item.id % 2 === 0 ? "even" : "odd";
                  return (
                    <li key={item.id}>
                      <span className={`summary-label ${colorClass}`}>
                        {item.label}: {item.value}
                      </span>
                      <span className={`summary-number ${colorClass}`}>{item.id}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Final Section (Images) */}
          <div className='final-section'>
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
          <div className='fourth-section'>
            <div className='marketer-image'>
              <img src={leftImage} alt='Marketer' />
            </div>
            <div className='marketer-details'>
              <div className='d-flex justify-end align-items-center flex-col'>
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
          </div>

          {/* Last section */}
          <div className='second-container'>
            <div className='second-background-image'></div>
            <div className='second-overlay'>
              <h2>Real estate is the future</h2>
              <p>ﻞﺒﻘﺘﺴﻤﻟا ﻮﻫ رﺎﻘﻌﻟا</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default DownloadPdf;
