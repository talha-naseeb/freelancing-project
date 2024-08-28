import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import houseImage from "../../assets/images/house.png";
import { useTranslation } from "react-i18next";
import "./header.css";
import LanguageSelector from "../Languages/LanguageSelector";

function Header() {
  const expand = "lg";
  const location = useLocation();

  const { t } = useTranslation();

  return (
    <Navbar expand={expand} className='bg-inherit fixed-top headerStyles' sticky='top'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/home'>
          <img src={houseImage} alt='Image Loading' style={{ height: "50px", width: "50px", filter: "brightness(0) invert(1)" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='custom-toggler' />
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement={document.documentElement.dir === "rtl" ? "start" : "end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <img src={houseImage} alt='ImagaLoading' style={{ height: "50px", width: "50px", filter: "brightness(0) invert(1)" }} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <div className='no-hover'>
                <LanguageSelector />
              </div>
              <Nav.Link as={Link} to='/' className={location.pathname === "/" ? "navLinks active" : "navLinks"}>
                {t("landingHome.home")}
              </Nav.Link>

              <Nav.Link as={Link} to='#' className={location.pathname === "/all-customers-data" ? "navLinks active" : "navLinks"}>
                {t("landingHome.aboutUs")}
              </Nav.Link>

              <Nav.Link as={Link} to='#' className={location.pathname === "/contactUs" ? "navLinks active" : "navLinks"}>
                {t("landingHome.contactUs")}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
