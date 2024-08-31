import React, { useState } from "react";
import axios from "../../Api/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Dropdown, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoSettingsOutline } from "react-icons/io5";
import logoutIcon from "../../assets/images/logout.svg";
import profileIcon from "../../assets/images/Profile.svg";
import userImg from "../../assets/images/defaultImg.svg";
import homeIcon from "../../assets/images/homeIcon.svg";
import "./header.css";
import LanguageSelector from "../Languages/LanguageSelector";
import { CgProfile } from "react-icons/cg";


function HeaderLogin() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.put("/auth/admin/logout", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.statusCode === "1") {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
        toast.success(t("header.logoutSuccessfully"));
      }
    } catch (error) {
      toast.error(t("header.errLogoutOut"));
      setLoading(false);
    }
  };

  const handlepasschangeRoute = () => {
    navigate("/User-Profile");
  };

  const handleAccount = () => {
    navigate("/account-settings");
  };

  return (
    <Navbar
      className='fixed-top shadow-sm'
      sticky='top'
      style={{
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "15px",
      }}
    >
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}

      <Nav.Link className='icon-wrapper' onClick={handleAccount}>
        <IoSettingsOutline size={22} />
        <span>{t("header.settings")}</span>
      </Nav.Link>

      <Nav.Link as={Link} to='/home' className='icon-wrapper'>
        <img src={homeIcon} alt='Home Icon' />
        <span>{t("header.home")}</span>
      </Nav.Link>

      <Nav.Link className='user_settings'>
        <Dropdown>
          <Dropdown.Toggle variant='none' style={{ border: "none", transition:"none !important" }} id='dropdownMenuButton4'>
            <span>
              <img src={userImg} alt='Profile Photo' className='accountImage' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className={`slideDownIn animation ${document.documentElement.dir === "rtl" ? "dropdown-menu-start" : "dropdown-menu-end"}`}>
            <Dropdown.Item>
              <span className='text-black'>{t("header.welcome")}</span>
            </Dropdown.Item>
            <Dropdown.Item className='d-flex gap-2 align-items-center' onClick={handlepasschangeRoute}>
              <img src={profileIcon} alt='Profile Icon' />
              {t("header.profileSettings")}
            </Dropdown.Item>
            <Dropdown.Item className='d-flex gap-2 align-items-center' onClick={handleLogout}>
              <img src={logoutIcon} alt='Logout Icon' />
              {t("header.logout")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Link>
    </Navbar>
  );
}

export default HeaderLogin;
