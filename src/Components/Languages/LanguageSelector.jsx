import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";
import NavDropdown from "react-bootstrap/NavDropdown";

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    sessionStorage.setItem("selectedLanguage", lng);
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("selectedLanguage");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    }
  }, [i18n]);

  return (
    <Dropdown className='user_settings'>
      <Dropdown.Toggle variant='none' id='dropdownMenuButton4' style={{ border: "none" }}>
        <TbWorld style={{ color: "#ffffff", padding: 0 }} size={24} />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ left: "auto", right: 0, minWidth: "unset", padding: 0 }}>
        <Dropdown.Item onClick={() => changeLanguage("en")}>{t("languageSelector.english")}</Dropdown.Item>
        <NavDropdown.Divider />
        <Dropdown.Item onClick={() => changeLanguage("ar")}>{t("languageSelector.arabic")}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
