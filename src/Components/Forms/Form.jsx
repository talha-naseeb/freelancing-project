import React, { useState, useRef, useEffect } from "react";
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
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { staticToken } from "../../Api/Tokens/token";
import { FaRegHandshake } from "react-icons/fa6";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { GrFormNextLink } from "react-icons/gr";

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

  const token = staticToken;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const savedStep = localStorage.getItem("formStep");
    const savedData = localStorage.getItem("formData");

    if (savedStep && savedData) {
      setFormStep(Number(savedStep));
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      // Restore the values in the form fields
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });

      // Restore the images and selected landmark
      const savedImages = JSON.parse(localStorage.getItem("selectedImages"));
      const savedDisplayedImages = JSON.parse(localStorage.getItem("displayedImages"));
      const savedLandmark = localStorage.getItem("selectedLandmark");

      if (savedImages && savedDisplayedImages) {
        setSelectedImages(savedImages);
        setDisplayedImages(savedDisplayedImages);
      }
      if (savedLandmark) {
        setSelectedLandmark(savedLandmark);
      }
    }
  }, [setValue]);

  const saveToLocalStorage = (data, step) => {
    localStorage.setItem("formData", JSON.stringify(data));
    localStorage.setItem("formStep", step);
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    localStorage.setItem("displayedImages", JSON.stringify(displayedImages));
    localStorage.setItem("selectedLandmark", selectedLandmark);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      const availableSlots = 8 - selectedImages.length;

      if (filesArray.length > availableSlots) {
        toast.error(t("Form.imageErr"));
        return;
      }

      const conversionPromises = filesArray.map((file) => convertToBase64(file));

      Promise.all(conversionPromises)
        .then((base64Files) => {
          const newDisplayedImages = [...displayedImages, ...base64Files];
          const trimmedImages = base64Files.map((image) => image.replace(/^data:image\/[a-z]+;base64,/, "").replace(/,/g, ""));

          setDisplayedImages(newDisplayedImages);
          setSelectedImages([...selectedImages, ...trimmedImages]);

          // Save to localStorage
          saveToLocalStorage({ ...formData }, formStep);
        })
        .catch((error) => console.error("Error converting files to base64:", error));
    }
  };

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const filesArray = Array.from(event.target.files).slice(0, 5);
  //     const totalImages = selectedImages.length + filesArray.length;

  //     if (totalImages > 5) {
  //       toast.error(t("Form.imageErr"));
  //       return;
  //     }
  //     const conversionPromises = filesArray.map((file) => convertToBase64(file));

  //     Promise.all(conversionPromises)
  //       .then((base64Files) => {
  //         const newDisplayedImages = [...displayedImages, ...base64Files];

  //         setDisplayedImages(newDisplayedImages);

  //         const trimmedImages = base64Files.map((image) => image.replace(/^data:image\/[a-z]+;base64,/, "").replace(/,/g, ""));
  //         setSelectedImages([...selectedImages, ...trimmedImages]);

  //         // Save to localStorage
  //         saveToLocalStorage({ ...formData }, formStep);
  //       })
  //       .catch((error) => console.error("Error converting files to base64:", error));
  //   }
  // };

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
    const nextStep = formStep + 1;
    setFormStep(nextStep);

    // Save to localStorage
    saveToLocalStorage(newFormData, nextStep);
  };

  const prevStep = () => {
    const previousStep = formStep - 1;
    setFormStep(previousStep);

    // Save to localStorage
    saveToLocalStorage(formData, previousStep);
  };

  const clearFileds = () => {
    setSelectedImages([]);
    setSelectedLandmark("");
  };

  const handleSelectLandmark = (landmark) => {
    if (selectedLandmark === landmark) {
      setSelectedLandmark("");
      setValue("Landmark", "");
    } else {
      setSelectedLandmark(landmark);
      setValue("Landmark", landmark, { shouldValidate: true });
    }

    saveToLocalStorage(formData, formStep);
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
      Image6: trimmedImages[5] || "",
      Image7: trimmedImages[6] || "",
      Image8: trimmedImages[7] || "",
    };

    try {
      const response = await axios.post("/api/prop/CreateCustomer", apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.statusCode === "1") {
        const customerData = response.data.response;
        setFormStep((current) => current + 1);
        sessionStorage.setItem("customerData", customerData);
        navigate(`/customer-Data/:${customerData}`);
        clearFileds();
        // Clear localStorage
        localStorage.clear();
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

  const deleteImage = (index) => {
    // Create copies of the current state arrays
    const newDisplayedImages = [...displayedImages];
    const newSelectedImages = [...selectedImages];

    // Remove the image at the specified index
    newDisplayedImages.splice(index, 1);
    newSelectedImages.splice(index, 1);

    // Update the state with the new arrays
    setDisplayedImages(newDisplayedImages);
    setSelectedImages(newSelectedImages);

    // If no images are left, clear the storage for images
    if (newDisplayedImages.length === 0) {
      localStorage.removeItem("selectedImages");
      localStorage.removeItem("displayedImages");
    } else {
      // Save the updated arrays back to local storage
      localStorage.setItem("selectedImages", JSON.stringify(newSelectedImages));
      localStorage.setItem("displayedImages", JSON.stringify(newDisplayedImages));
    }

    // Save the form data and step, ensuring consistency
    saveToLocalStorage({ ...formData }, formStep);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className='MainDiv'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <Header />
      <div className='d-flex justify-content-center align-items-center mt-[10rem] bg-[#1b2020]'>
        <form onSubmit={handleSubmit(formStep < 4 ? nextStep : onSubmit)} className='w-100 max-w-lg p-4 sm:p-[3.5rem] text-white rounded custom-formen'>
          {formStep > 0 && (
            <button type='button' onClick={prevStep} className='backButton'>
              <IoIosArrowBack className='rtl-icon' />
            </button>
          )}
          {formStep === 0 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl text-[#ff5757]'>{t("Form.Marketerdata")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label text-[#ff5757]'>
                  {t("Form.name")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("Name", { required: t("fieldErrors.name") })} id='Name' placeholder={t("placeholder.name")} className='form-control' />
                {errors.Name && <span>{errors.Name.message}</span>} {/* Corrected: errors.Name */}
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
                {errors.MobileNo && <span>{errors.MobileNo.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='LicenceNo' className='form-label text-[#ff5757]'>
                  {t("Form.Falllicense")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("LicenceNo", { required: t("fieldErrors.EnterLicense") })} id='LicenceNo' placeholder={t("placeholder.EnterLicense")} className='form-control' />
                {errors.LicenceNo && <span>{errors.LicenceNo.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
                <GrFormNextLink size={30} className="rtl-icon" />
              </button>
            </div>
          )}

          {formStep === 1 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl text-[#ff5757]'>{t("Form.Advertisementdata")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='AdvertisementDate' className='form-label text-[#ff5757]'>
                  {t("Form.date")}
                </label>
                <input {...register("AdvertisementDate", { required: t("fieldErrors.date") })} id='AdvertisementDate' type='date' className='form-control' min={today} />
                {errors.AdvertisementDate?.type === "required" && <span>{errors.AdvertisementDate.message}</span>}
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
                  <option value='Commercial'>{t("Form.Resthouse")}</option>
                </select>
                {errors.PropertyType?.type === "required" && <span>{errors.PropertyType.message}</span>}
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
                {errors.DealType?.type === "required" && <span>{errors.DealType.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
                <GrFormNextLink size={30} className="rtl-icon" />
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl text-[#ff5757]'>{t("Form.propertyInfo")}</span>
              </div>

              <div className='mb-3'>
                <label htmlFor='City' className='form-label text-[#ff5757]'>
                  {t("Form.City")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("City", { required: t("fieldErrors.city") })} id='City' placeholder={t("placeholder.city")} className='form-control' />
                {errors.City?.type === "required" && <span>{errors.City.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='District' className='form-label text-[#ff5757]'>
                  {t("Form.District")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("District", { required: t("fieldErrors.district") })} id='District' placeholder={t("placeholder.district")} className='form-control' />
                {errors.District?.type === "required" && <span>{errors.District.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='LeadingProperty' className='form-label text-[#ff5757]'>
                  {t("Form.Roads")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("LeadingProperty", { required: t("fieldErrors.roads") })} id='LeadingProperty' placeholder={t("placeholder.roads")} className='form-control' />
                {errors.LeadingProperty?.type === "required" && <span>{errors.LeadingProperty.message}</span>}
              </div>

              <button type='submit' className='nextButton'>
                {t("Form.Next")}
                <GrFormNextLink size={30} className="rtl-icon" />
              </button>
            </div>
          )}

          {formStep === 3 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl text-[#ff5757]'>{t("Form.propertyInfo")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='PropertyLocation' className='form-label text-[#ff5757]'>
                  {t("Form.location")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("PropertyLocation", { required: t("fieldErrors.Property") })} id='PropertyLocation' placeholder={t("placeholder.Property")} className='form-control' />
                {errors.PropertyLocation?.type === "required" && <span>{errors.PropertyLocation.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='TotalArea' className='form-label text-[#ff5757]'>
                  {t("Form.TotalArea")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("TotalArea", { required: t("fieldErrors.area") })} id='TotalArea' placeholder={t("placeholder.area")} className='form-control' />
                {errors.TotalArea?.type === "required" && <span>{errors.TotalArea.message}</span>}
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
              {errors.Landmark?.type === "required" && <span className='error'>{errors.Landmark.message}</span>}

              {/* Conditionally render the Time Distance field */}
              {selectedLandmark && (
                <div className='mb-3'>
                  <label htmlFor='TimeDistance' className='form-label text-[#ff5757]'>
                    {t("Form.timeDistance")}
                    <span className='SpanRequired'>*</span>
                  </label>
                  <input {...register("TimeDistance", { required: t("fieldErrors.timeDistance") })} id='TimeDistance' placeholder={t("placeholder.timeDistance")} className='form-control' />
                  {errors.TimeDistance?.type === "required" && <span>{errors.TimeDistance.message}</span>}
                </div>
              )}

              <div className='mb-3'>
                <label htmlFor='PropertyNo' className='form-label text-[#ff5757]'>
                  {t("Form.DisplayedPropertyNumber")}
                  <span className='SpanRequired'>*</span>
                </label>
                <input {...register("PropertyNo", { required: t("fieldErrors.Displayed") })} id='PropertyNo' placeholder={t("placeholder.Displayed")} className='form-control' />
                {errors.PropertyNo?.type === "required" && <span>{errors.PropertyNo.message}</span>}
              </div>
              <button type='submit' className='nextButton'>
                {t("Form.Next")}
                <GrFormNextLink size={30} className="rtl-icon" />
              </button>
            </div>
          )}

          {formStep === 4 && (
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <span className='text-2xl text-[#ff5757]'>{t("Form.propertyInfo")}</span>
              </div>
              <div className='mb-3'>
                <label htmlFor='Image1' className='form-label text-[#ff5757]'>
                  {t("Form.PropertyPicture")}
                  <span className='SpanRequired'>*</span>
                </label>
                <br />
                <label style={{ fontSize: "10px" }}>{t("Form.imageErr")}</label>
                <div className='Image-Input' onClick={handleIconClick}>
                  <RiImageAddFill size={25} />
                  {t("Form.Addpicproperty")}
                </div>
                <input type='file' multiple accept='image/*' onChange={onImageChange} className='form-control' style={{ display: "none" }} ref={fileInputRef} />
                <span className='image-preview'>
                  {displayedImages.map((image, index) => (
                    <div key={index} className='image-container'>
                      <img src={image} alt='Property' className='images-size' />
                      <button type='button' onClick={() => deleteImage(index)} className='delete-button'>
                        <MdDeleteOutline className='p-0' />
                      </button>
                    </div>
                  ))}
                </span>
              </div>

              <div className='mb-3'>
                <label htmlFor='AdditionalDetails' className='form-label text-[#ff5757]'>
                  {t("Form.AdditionalDetails")}
                </label>
                <input {...register("AdditionalDetails")} id='AdditionalDetails' placeholder={t("placeholder.AdditionalDetails")} className='form-control' />
              </div>

              {/* TransactionType radio buttons */}
              <div className='mb-3 '>
                <label className='form-label text-[#ff5757]'>
                  {t("Form.TransactionType")}
                  <span className='SpanRequired'>*</span>
                </label>
                <div className='TransactionType'>
                  <div className='form-check p-0 d-flex align-items-center mb-3'>
                    <input
                      className='form-check-input mx-2'
                      type='radio'
                      value='Selling on the limit'
                      {...register("TransactionType", { required: t("fieldErrors.TransactionType") })}
                      id='TransactionTypeLimit'
                    />
                    <label className='form-check-label' htmlFor='TransactionTypeLimit'>
                      {t("Form.SellingOnLimit")}
                    </label>
                    <FaRegHandshake className='mx-2' size={30} />
                  </div>

                  <div className='form-check p-0 d-flex align-items-center'>
                    <input
                      className='form-check-input mx-2'
                      type='radio'
                      value='Selling on price'
                      {...register("TransactionType", { required: t("fieldErrors.TransactionType") })}
                      id='TransactionTypePrice'
                    />
                    <label className='form-check-label' htmlFor='TransactionTypePrice'>
                      {t("Form.SellingOnPrice")}
                    </label>
                    <PiUserSwitchDuotone className='mx-2' size={30} />
                  </div>
                </div>

                {errors.TransactionType?.type === "required" && <span>{errors.TransactionType.message}</span>}
              </div>

              <div className='mb-3'>
                <label htmlFor='PropertyValue' className='form-label text-[#ff5757]'>
                  {t("Form.sellingvalue")}
                </label>
                <input {...register("PropertyValue")} id='PropertyValue' placeholder={t("placeholder.Addselling")} className='form-control' />
                {errors.PropertyValue?.type === "required" && <span>{errors.PropertyValue.message}</span>}
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
