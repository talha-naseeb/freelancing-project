import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import homeIcon from "../../../assets/images/Home.svg";
import documentIcon from "../../../assets/images/document-copy.svg";
import paperPLus from "../../../assets/images/PaperPlus2.svg";
import { useTranslation } from "react-i18next";
import { MdOutlineAddHomeWork } from "react-icons/md";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 576);
  const { t } = useTranslation();

  const startButton = () => {
    localStorage.clear();
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const sidebarBackgroundColor = "#171717";

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

  const direction = document.dir || "ltr";

  return (
    <div>
      <div className='Parentcontainer'>
        <div style={{ width: isOpen ? "230px" : "50px", background: sidebarBackgroundColor }} className='sidebar'>
          <div className='top_section'>
            <div style={{ display: isOpen ? "block" : "none" }}>
              <span className='text-white d-flex align-items-center gap-2' style={{ fontFamily: "Italic" }}>
                <MdOutlineAddHomeWork size={25} />
                Real EState
              </span>
            </div>
            <div
              style={{
                marginLeft: direction === "ltr" ? (isOpen ? "50px" : "0px") : "0px",
                marginRight: direction === "rtl" ? (isOpen ? "50px" : "0px") : "0px",
              }}
              className='bars'
            >
              <FaBars onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          {/* Upload Documents */}

          <NavLink to='/uploadDoc' className='UploadMenuLink' onClick={startButton}>
            <div className='UploadDocMenu'>
              <div>
                <img src={paperPLus} alt='imageLoading' />
              </div>
              <div className='link_text' style={{ display: isOpen ? "block" : "none", color: "#171717 " }}>
                {t("Sidebar.uploadDoc")}
              </div>
            </div>
          </NavLink>

          <NavLink to='/home' className='menuLinks'>
            <div className='Menuicons'>
              <img src={homeIcon} alt='imageLoading' />
            </div>
            <div className='link_text' style={{ display: isOpen ? "block" : "none" }}>
              {t("Sidebar.Dashboard")}
            </div>
          </NavLink>

          {/* Documents */}
          <NavLink to='/recentdocuments' className='menuLinks'>
            <div className='Menuicons'>
              <img src={documentIcon} alt='imageLoading' />
            </div>
            <div className='link_text' style={{ display: isOpen ? "block" : "none", fontSize: "14px" }}>
              {t("Sidebar.Documents")}
            </div>
          </NavLink>
        </div>
        <main className='mainbody'>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
