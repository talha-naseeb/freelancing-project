import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "../../../Api/Api";
import { toast } from "react-toastify";
import userEditIcon from "../../../assets/images/user-edit.svg";
import "./style.css";
import AppUsers from "../App Users/AppUsers";

function UserProfile() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("token");

  // Fetch user profile data from API on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/GetAppUserProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.statusCode === "1") {
          const { appUserID, fullName, countryCode, mobileNumber, emailID } = response.data.response;
          setUserData({ appUserID, fullName, countryCode, mobileNumber, emailID });
          setFullName(fullName);
          setMobileNumber(mobileNumber);
          setCountryCode(countryCode);
          setEmail(emailID);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, t]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "/api/admin/UpdateAppUser",
        {
          AppUserID: userData.appUserID,
          FullName: fullName,
          CountryCode: countryCode,
          MobileNumber: mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === "1") {
        toast.success(t("userProfile.updateSuccess"));
        setHasChanges(false);
      } else {
        toast.error(t("userProfile.updateFailed"));
      }
    } catch (error) {
      toast.error(t("userProfile.updateError"));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleCancel = () => {
    if (userData) {
      setFullName(userData.fullName);
      setMobileNumber(userData.mobileNumber);
      setCountryCode(userData.countryCode);
      setHasChanges(false);
    }
  };

  const countryCodes = [
    { countryID: "996", name: "+996 (SAR)" },
    { countryID: "92", name: "+92 (PAK)" },
    { countryID: "1", name: "+1 (USA)" },
    { countryID: "44", name: "+44 (UK)" },
    { countryID: "971", name: "+971 (UAE)" },
    { countryID: "962", name: "+962 (Jordan)" },
    { countryID: "91", name: "+91 (India)" },
  ];

  return (
    <div className='container mt-4'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}

      <div className='userProfile-form container mb-2'>
        <div className='d-flex align-items-center gap-3 mb-3'>
          <img src={userEditIcon} alt='Edit Icon' />
          <div>
            <label className='text-black' style={{ fontSize: "20px", fontWeight: "600" }}>
              {t("userProfile.title")}
            </label>
          </div>
        </div>

        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={4}>
              <Form.Group controlId='fullName'>
                <Form.Label className='text-black'>{t("SignUp.fullName")}</Form.Label>
                <Form.Control type='text' value={fullName} onChange={handleInputChange(setFullName)} className='forms bg-white' />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Label className='text-black'>{t("SignUp.mobileNumber")}</Form.Label>
              <div className='input-group'>
                <Form.Select value={countryCode} onChange={handleInputChange(setCountryCode)} className='form-control forms bg-white' style={{ width: "20%" }}>
                  <option value='' disabled>
                    {t("SignUp.Codes")}
                  </option>
                  {countryCodes.map((country) => (
                    <option key={country.countryID} value={country.countryID}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type='text'
                  value={mobileNumber}
                  onChange={handleInputChange(setMobileNumber)}
                  placeholder={t("SignUp.mobileNumber")}
                  className='form-control forms bg-white'
                  style={{ width: "calc(70% - 40px)" }}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Group controlId='emailID'>
                <Form.Label className='text-black'>{t("SignUp.email")}</Form.Label>
                <Form.Control type='text' value={email} disabled className='forms bg-white' />
              </Form.Group>
            </Col>
          </Row>
          {hasChanges && (
            <div className='d-flex gap-3 mt-3'>
              <Button variant='none' className='UserProfileBtn' type='submit' disabled={loading}>
                {t("userProfile.update")}
              </Button>
              <Button variant='none' className='userCancel' onClick={handleCancel}>
                {t("userProfile.cancel")}
              </Button>
            </div>
          )}
        </Form>
      </div>
      <AppUsers />
    </div>
  );
}

export default UserProfile;
