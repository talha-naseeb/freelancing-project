import React, { useEffect, useState } from "react";
import RightImage from "../../assets/images/2.png";
import leftImage from "../../assets/images/2.png";
import h1 from "../../assets/images/house 1.jpg";
import h2 from "../../assets/images/house 3.jpg";
import h3 from "../../assets/images/house4.jpg";
import h4 from "../../assets/images/house 3.jpg";
import "./style.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoListCircleOutline } from "react-icons/io5";

function Test() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  // Load title data from localStorage (or it could be from an API)
  useEffect(() => {
    const storedTitle = localStorage.getItem("pdfTitle") || "Talha's Property";
    setTitle(storedTitle);

    fetchImagesFromLocal();
  }, []);

  // List of property summary items
  const summaryItems = [
    { id: 1, label: "City" },
    { id: 2, label: "District" },
    { id: 3, label: "Roads leading to the property" },
    { id: 4, label: "Property type" },
    { id: 5, label: "Deal type" },
    { id: 6, label: "Total Area" },
    { id: 5, label: "Main landmarks around the property" },
  ];

  const fetchImagesFromLocal = () => {
    const localImages = [
      { id: 1, url: h1 },
      { id: 2, url: h2 },
      { id: 3, url: h3 },
      { id: 4, url: h4 },
    ];
    setImages(localImages.slice(0, 4));
  };

  return (
    <>
      {/* First section */}
      <div className='container'>
        <div className='background-image'></div>
        <div className='overlay'>
          <h1>{title}</h1>
        </div>
      </div>

      <div className='third-section'>
        <div className='summary-image'>
          <img src={RightImage} alt='Property Overview' />
        </div>
        <div className='highlight-box'>
          <p>The selling value of the property</p>
          <div className='price-info'>
            <span>SR</span>
            <span>type Transaction</span>
          </div>
        </div>
        <div className='summary-content'>
          <h1>Summary</h1>
          <h3 className='sub-title mb-5'>OF THE PROPERTY</h3>
          <ul className='summary-list'>
            {summaryItems.map((item) => (
              <li key={item.id}>
                <span> {item.label}</span>
                <span className={`summary-number ${item.id % 2 === 0 ? "even" : "odd"}`}> {item.id}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='final-section'>
        {images.length > 0 && (
          <div className='featured-image'>
            <img src={images[0].url} alt='Featured' />
            <div className='featured-overlay'>
              <h2>Text can be add</h2>
              <p>text can be add</p>
            </div>
            <span className='featured-number'>4</span>
          </div>
        )}

        <div className='thumbnail-row'>
          {images.slice(1, 4).map((image, index) => (
            <div className='thumbnail' key={image.id}>
              <img src={image.url} alt={`Thumb ${index + 1}`} />
              <span className='thumb-number'>{`0${index + 1}`}</span>
            </div>
          ))}
        </div>

        {/* About the property */}
        <div className='about-property'>
          <h2>About the property</h2>
          <p className='property-name'>name of the property</p>
          <p>This could refer to a house, apartment, or piece of land, and details may include location, size, amenities, and ownership rights.</p>
          <ul className='property-details'>
            <li>
              <FaMapMarkerAlt /> Property location
            </li>
            <li>
              <FaPhoneAlt /> Phone
            </li>
            <li>
              <IoListCircleOutline /> Fall Lisence number
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
              <span className='detail-name'>Name</span>
            </li>
            <li>
              <span className='detail-phone'>phone number</span>
            </li>
            <li>
              <span className='detail-fail'>fall number</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Last section */}
      <div className='second-container'>
        <div className='second-background-image'></div>
        <div className='second-overlay'>
          <h2>Real estate is the future</h2>
          <p> ﻞﺒﻘﺘﺴﻤﻟا ﻮﻫ رﺎﻘﻌﻟا</p>
        </div>
      </div>
    </>
  );
}

export default Test;
