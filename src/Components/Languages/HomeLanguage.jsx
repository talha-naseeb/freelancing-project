import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TfiWorld } from "react-icons/tfi";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../Header/header.css"

function HomeLanguage({ auth }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    sessionStorage.setItem("language", lng); 
  };

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      document.documentElement.dir = storedLanguage === "ar" ? "rtl" : "ltr";
    }
  }, [i18n, auth]);

  return (
    <Dropdown className='user_settings'>
      <Dropdown.Toggle style={{ padding: "0px", border: "none" }} variant='none' id='dropdownMenuButton4'>
        <div className=''>
          <TfiWorld size={20} />
         
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ left: "auto", right: 0, minWidth: "unset", padding: "0px" }}>
        <Dropdown.Item onClick={() => changeLanguage("en")}>{t("languageSelector.english")}</Dropdown.Item>
        <NavDropdown.Divider />
        <Dropdown.Item onClick={() => changeLanguage("ar")}>{t("languageSelector.arabic")}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HomeLanguage;
