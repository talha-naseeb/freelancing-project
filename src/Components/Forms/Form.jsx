import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "../../Api/Api";
import "./form.css";
import { useTranslation } from "react-i18next";
import { FaSchool, FaHospitalAlt, FaMosque } from "react-icons/fa";
import { GiAirplaneDeparture } from "react-icons/gi";
import { MdBusiness } from "react-icons/md";
import { LuTrees } from "react-icons/lu";
import { RiImageAddFill } from "react-icons/ri";
import Header from "../Header/Header";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Form() {
  const fileInputRef = useRef(null);
  const [selectedLandmark, setSelectedLandmark] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = "TWFjcXVpcmVzLTg5QDg1OTg6UGFzczk4NUBAJiY=";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).slice(0, 5);
      const totalImages = selectedImages.length + filesArray.length;

      if (totalImages > 5) {
        toast.error(t("Form.imageErr"));
        return;
      }
      const conversionPromises = filesArray.map((file) => convertToBase64(file));

      Promise.all(conversionPromises)
        .then((base64Files) => {
          const newDisplayedImages = [...displayedImages, ...base64Files];

          setDisplayedImages(newDisplayedImages);

          const trimmedImages = base64Files.map((image) => image.replace(/^data:image\/[a-z]+;base64,/, "").replace(/,/g, ""));
          setSelectedImages([...selectedImages, ...trimmedImages]);
        })
        .catch((error) => console.error("Error converting files to base64:", error));
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reader.abort();
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const nextStep = (data) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    setFormStep((current) => current + 1);
  };

  const prevStep = () => {
    setFormStep((current) => current - 1);
  };

  const clearFileds = () => {
    setSelectedImages([]);
    setSelectedLandmark("");
    setTransactionType("");
  };

  const handleSelectLandmark = (landmark) => {
    setSelectedLandmark(landmark);
    setValue("Landmark", landmark, { shouldValidate: true });
  };

  const iconStyle = (landmark) => `icon-container ${selectedLandmark === landmark ? "selected" : ""}`;

  const onSubmit = async (data) => {
    setLoading(true);

    const trimmedImages = selectedImages.map((image) => image.replace(/^data:image\/jpeg;base64,/, ""));
    const apiData = {
      ...data,
      Image1: trimmedImages[0] || "",
      Image2: trimmedImages[1] || "",
      Image3: trimmedImages[2] || "",
      Image4: trimmedImages[3] || "",
      Image5: trimmedImages[4] || "",
    };

    try {
      const response = await axios.post("/Customers/CreateCustomerData", apiData);
      if (response.data.StatusCode === 200) {
        const customerData = response.data.Data;
        setFormStep((current) => current + 1);
        sessionStorage.setItem("customerData", customerData);
        navigate(`/customer-Data/:${customerData}`);
        clearFileds();
      } else {
        toast.error(t("Form.dataErr"));
      }
    } catch (error) {
      console.error("Submission error", error);

      if (error.status === 401) {
        toast.error(t("Form.dataErr"));
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='MainDiv'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <Header />
      <div className='d-flex justify-content-center align-items-center mt-[10rem] bg-[#1b2020]'>
        <form onSubmit={handleSubmit(formStep < 4 ? nextStep : onSubmit)} className='w-100 max-w-lg p-4 sm:p-[3.5rem] text-white rounded'>
          {formStep > 0 && (
            <button type='button' onClick={prevStep} className='backButton'>
              <IoChevronForward />
            </button>
          )}
          {formStep === 0 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl'>{t("Form.Marketerdata")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label text-[#ff5757]'>
                  {t("Form.name")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("Name", { required: t("fieldErrors.name") })} id='Name' placeholder={t("placeholder.name")} className='form-control' />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
              <div className='mb-3'>
                <label htmlFor='MobileNo' className='form-label text-[#ff5757]'>
                  {t("Form.MobileNumber")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input
                  {...register("MobileNo", {
                    required: t("fieldErrors.Mobile"),
                    pattern: {
                      value: /^[0-9]+$/,
                      message: t("fieldErrors.numericValues"),
                    },
                  })}
                  id='MobileNo'
                  placeholder={t("placeholder.Mobile")}
                  className='form-control'
                />
                {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='LicenceNo' className='form-label text-[#ff5757]'>
                  {t("Form.Falllicense")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("LicenceNo", { required: t("fieldErrors.EnterLicense") })} id='LicenceNo' placeholder={t("placeholder.EnterLicense")} className='form-control' />
                {errors.fallLicenseNumber && <span>{errors.fallLicenseNumber.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
              </button>
            </div>
          )}

          {formStep === 1 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl'>{t("Form.Advertisementdata")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='AdvertisementDate' className='form-label text-[#ff5757]'>
                  {t("Form.date")}
                </label>
                <input {...register("AdvertisementDate", { required: t("fieldErrors.date") })} id='AdvertisementDate' type='date' className='form-control' />
                {errors.date && <span>{errors.date.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='PropertyType' className='form-label text-[#ff5757]'>
                  {t("Form.propertyType")}
                  <span className='SpanRequired'>*</span>
                </label>
                <select {...register("PropertyType", { required: t("fieldErrors.propertyType") })} id='PropertyType' className='form-select'>
                  <option value='' disabled>
                    {t("Form.selectProperty")}
                  </option>
                  <option value='Residential'>{t("Form.land")}</option>
                  <option value='Commercial'>{t("Form.building")}</option>
                  <option value='Commercial'>{t("Form.Apartment")}</option>
                  <option value='Commercial'>{t("Form.House")}</option>
                  <option value='Commercial'>{t("Form.Renthouse")}</option>
                </select>
                {errors.propertyType && <span>{errors.propertyType.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='DealType' className='form-label text-[#ff5757]'>
                  {t("Form.Dealtype")}
                  <span className='SpanRequired'>*</span>
                </label>
                <select {...register("DealType", { required: t("fieldErrors.Dealtype") })} id='DealType' className='form-select'>
                  <option value='' disabled>
                    {t("Form.SelectDeal")}
                  </option>
                  <option value='Sale'>{t("Form.sale")}</option>
                  <option value='Rent'>{t("Form.Rent")}</option>
                </select>
                {errors.dealType && <span>{errors.dealType.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl'>{t("Form.propertyInfo")}</span>
              </div>

              <div className='mb-3'>
                <label htmlFor='City' className='form-label text-[#ff5757]'>
                  {t("Form.City")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("City", { required: t("fieldErrors.city") })} id='City' placeholder={t("placeholder.city")} className='form-control' />
                {errors.city && <span>{errors.city.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='District' className='form-label text-[#ff5757]'>
                  {t("Form.District")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("District", { required: t("fieldErrors.district") })} id='District' placeholder={t("placeholder.district")} className='form-control' />
                {errors.district && <span>{errors.district.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='LeadingProperty' className='form-label text-[#ff5757]'>
                  {t("Form.Roads")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("LeadingProperty", { required: t("fieldErrors.roads") })} id='LeadingProperty' placeholder={t("placeholder.roads")} className='form-control' />
                {errors.roads && <span>{errors.roads.message}</span>}
              </div>

              <button type='submit' className='nextButton'>
                {t("Form.Next")}
              </button>
            </div>
          )}

          {formStep === 3 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl'>{t("Form.propertyInfo")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='PropertyLocation' className='form-label text-[#ff5757]'>
                  {t("Form.location")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("PropertyLocation", { required: t("fieldErrors.Property") })} id='PropertyLocation' placeholder={t("placeholder.Property")} className='form-control' />
                {errors.propertyLocation && <span>{errors.propertyLocation.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='TotalArea' className='form-label text-[#ff5757]'>
                  {t("Form.TotalArea")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("TotalArea", { required: t("fieldErrors.area") })} id='TotalArea' placeholder={t("placeholder.area")} className='form-control' />
                {errors.totalArea && <span>{errors.totalArea.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='Landmark' className='form-label text-[#ff5757]'>
                  {t("Form.landmarks")}
                  <span className='SpanRequired'>*</span>
                </label>
                <div className='landmark-selector'>
                  <div className={iconStyle("School")} onClick={() => handleSelectLandmark("School")}>
                    <FaSchool size={24} />
                  </div>
                  <div className={iconStyle("Airport")} onClick={() => handleSelectLandmark("Airport")}>
                    <GiAirplaneDeparture size={24} />
                  </div>
                  <div className={iconStyle("Hospital")} onClick={() => handleSelectLandmark("Hospital")}>
                    <FaHospitalAlt size={24} />
                  </div>
                  <div className={iconStyle("Trees")} onClick={() => handleSelectLandmark("Trees")}>
                    <LuTrees size={24} />
                  </div>
                  <div className={iconStyle("Mosque")} onClick={() => handleSelectLandmark("Mosque")}>
                    <FaMosque size={24} />
                  </div>
                  <div className={iconStyle("Buildings")} onClick={() => handleSelectLandmark("Buildings")}>
                    <MdBusiness size={24} />
                  </div>
                </div>
              </div>

              <input type='hidden' {...register("Landmark", { required: t("fieldErrors.landmarks") })} />
              {errors.landmark && <span className='error'>{errors.landmark.message}</span>}

              <div className='mb-3'>
                <label htmlFor='PropertyNo' className='form-label text-[#ff5757]'>
                  {t("Form.DisplayedPropertyNumber")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("PropertyNo", { required: t("fieldErrors.Displayed") })} id='PropertyNo' placeholder={t("placeholder.Displayed")} className='form-control' />
                {errors.displayedPropertyNumber && <span>{errors.displayedPropertyNumber.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
              </button>
            </div>
          )}

          {formStep === 4 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl'>{t("Form.propertyInfo")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='Image1' className='form-label text-[#ff5757]'>
                  {t("Form.PropertyPicture")}
                  <span className='SpanRequired'>*</span>
                </label>
                <div className='Image-Input' onClick={handleIconClick}>
                  <RiImageAddFill size={25} />
                  {t("Form.Addpicproperty")}
                </div>
                <input type='file' multiple accept='image/*' onChange={onImageChange} className='form-control' style={{ display: "none" }} ref={fileInputRef} />
                <span className='image-preview'>
                  {displayedImages.map((image, index) => (
                    <img key={index} src={image} alt='Property' className='images-size' />
                  ))}
                </span>
              </div>

              <div className='mb-3'>
                <label htmlFor='AdditionalDetails' className='form-label text-[#ff5757]'>
                  {t("Form.AdditionalDetails")}
                </label>
                <input {...register("AdditionalDetails")} id='AdditionalDetails' placeholder={t("placeholder.AdditionalDetails")} className='form-control' />
              </div>

              <div className='mb-3'>
                <label htmlFor='TransactionType' className='form-label text-[#ff5757]'>
                  {t("Form.TransactionType")}
                </label>
                <input {...register("TransactionType")} id='TransactionType' placeholder={t("Form.TransactionType")} className='form-control' />
              </div>

              <div className='mb-3'>
                <label htmlFor='PropertyValue' className='form-label text-[#ff5757]'>
                  {t("Form.sellingvalue")}
                </label>
                <input {...register("PropertyValue")} id='PropertyValue' placeholder={t("placeholder.Addselling")} className='form-control' />
              </div>

              <button type='submit' className='nextButton'>
                {t("Form.submit")}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
