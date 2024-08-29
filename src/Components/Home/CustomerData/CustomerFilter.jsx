import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CiFilter } from "react-icons/ci";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useTranslation } from "react-i18next";

function CustomerFilter({
  name,
  mobileNo,
  licenseNo,
  propertyNo,
  propertyType,
  city,
  district,
  setName,
  setMobileNo,
  setLicenseNo,
  setPropertyNo,
  setPropertyType,
  setcity,
  setDistrict,
  handleSearch,
  clearSearch,
}) {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    switch (name) {
      case "name":
        setName(value);
        break;
      case "mobileNo":
        setMobileNo(value);
        break;
      case "licenseNo":
        setLicenseNo(value);
        break;
      case "propertyNo":
        setPropertyNo(value);
        break;
      case "propertyType":
        setPropertyType(value);
        break;
      case "city":
        setcity(value);
        break;
      case "district":
        setDistrict(value);
        break;
      default:
        break;
    }
  };

  return (
    <Navbar expand={false}>
      <Container fluid>
        <Navbar.Toggle className='filterOpenBtn' aria-controls={`offcanvasNavbar`}>
          <CiFilter />
        </Navbar.Toggle>
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${false}`} aria-labelledby={`offcanvasNavbarLabel-expand-${false}`} placement={document.documentElement.dir === "rtl" ? "start" : "end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`} style={{ color: "#ff5757" }} className='fw-bold'>
              {t("customerFilter.filter")}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr style={{ margin: " auto 0", borderColor: "#ff5757" }} />
          <Offcanvas.Body>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.name")}</Form.Label>
                <Form.Control name='name' type='text' value={name} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.mobileNo")}</Form.Label>
                <Form.Control name='mobileNo' type='tel' value={mobileNo} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.licenceNo")}</Form.Label>
                <Form.Control name='licenseNo' type='text' value={licenseNo} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.propertyNo")}</Form.Label>
                <Form.Control name='propertyNo' type='text' value={propertyNo} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.propertyType")}</Form.Label>
                <Form.Control name='propertyType' type='text' value={propertyType} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.city")}</Form.Label>
                <Form.Control name='city' type='text' value={city} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>{t("tableLabels.district")}</Form.Label>
                <Form.Control name='district' type='text' value={district} onChange={handleInputChange} />
              </Form.Group>

              <div className='newComment d-flex align-items-center justify-content-between gap-3 w-100 p-3 py-4'>
                <Button className='customerFilterReset' onClick={clearSearch}>
                  {t("customerFilter.reset")}
                </Button>
                <Button className='customerFilterBtn' onClick={handleSearch} disabled={isDisabled}>
                  {t("customerFilter.apply")}
                </Button>
              </div>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CustomerFilter;
