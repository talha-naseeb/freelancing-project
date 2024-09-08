import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import LogoImg from "../../../assets/images/Logo.png";

import "./sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 576);
  const { t } = useTranslation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className='Parentcontainer'>
        <div style={{ width: isOpen ? "230px" : "50px" }} className='sidebar'>
          <div className='top_section'>
            <div style={{ display: isOpen ? "block" : "none" }}>
              <img src={LogoImg} alt='imageLoading' style={{ height: "30px", width: "130px" }} />
            </div>
            <div
              style={{
                marginLeft: document.dir === "ltr" ? (isOpen ? "50px" : "0px") : "0px",
                marginRight: document.dir === "rtl" ? (isOpen ? "50px" : "0px") : "0px",
              }}
              className='bars'
            >
              <FaBars onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          {/* Upload Documents */}

          <NavLink className='UploadMenuLink'>
            <div
              className='UploadDocMenu'
              style={{
                margin: isOpen ? "0px 10px" : "0px",
              }}
            >
              <div>
                <MdOutlineAdminPanelSettings size={28} />
              </div>
              <div className='link_text' style={{ display: isOpen ? "block" : "none" }}>
                {t("Sidebar.AdminPanel")}
              </div>
            </div>
          </NavLink>

          <NavLink
            to='/home'
            className='menuLinks'
            style={{
              margin: isOpen ? "5px 10px" : "5px 0px",
            }}
          >
            <div className='Menuicons'>
              <MdDashboard size={28} />
            </div>
            <div
              className='link_text'
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              {t("Sidebar.Dashboard")}
            </div>
          </NavLink>

          <NavLink
            to='/all-customers-data'
            className='menuLinks'
            style={{
              margin: isOpen ? "5px 10px" : "5px 0px",
            }}
          >
            <div className='Menuicons'>
              <HiOutlineUsers size={25} />
            </div>
            <div className='link_text' style={{ display: isOpen ? "block" : "none" }}>
              {t("CustomersData.CustomerData")}
            </div>
          </NavLink>
        </div>
        <main className='mainbody'>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
