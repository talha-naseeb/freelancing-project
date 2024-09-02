import React, { useState } from "react";
import axios from "../../Api/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Dropdown, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoSettingsOutline } from "react-icons/io5";
import logoutIcon from "../../assets/images/logout.svg";
import profileIcon from "../../assets/images/Profile.svg";
import userImg from "../../assets/images/defaultImg.png";
import homeIcon from "../../assets/images/homeIcon.svg";
import "./header.css";
import HomeLanguage from "../Languages/HomeLanguage";
import { useUser } from "../Custom/Context/UserContext";

function HeaderLogin() {
  const [loading, setLoading] = useState(false);
  const { userData } = useUser("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/admin/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.statusCode === "1") {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/auth/admin/login");
        toast.success(t("header.logoutSuccessfully"));
      }
    } catch (error) {
      toast.error(t("header.errLogoutOut"));
      navigate("/auth/admin/login");
      setLoading(false);
    }
  };

  const handlepasschangeRoute = () => {
    navigate("/user-profile");
  };

  const handleAccount = () => {
    navigate("#");
  };

  return (
    <Navbar
      className='fixed-top shadow-sm main-form'
      sticky='top'
      style={{
        display: "flex",
        background:
          "linear-gradient(41deg, rgba(0, 0, 0, 1) 2%, rgba(74, 24, 24, 1) 16%, rgba(0, 0, 0, 1) 33%, rgba(94, 33, 33, 1) 50%, rgba(0, 0, 0, 1) 63%, rgba(70, 23, 23, 1) 76%, rgba(19, 1, 1, 1) 87%)",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "15px",
        width: "98%",
      }}
    >
      {/* {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )} */}

      <Nav.Link className='icon-wrapper'>
        <HomeLanguage />
        <span>{t("header.language")}</span>
      </Nav.Link>

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
          <Dropdown.Toggle variant='none' style={{ border: "none", transition: "none !important" }} id='dropdownMenuButton4'>
            <span>
              <img src={userImg} alt='Profile Photo' className='accountImage' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className={`slideDownIn animation ${document.documentElement.dir === "rtl" ? "dropdown-menu-start" : "dropdown-menu-end"}`}>
            <Dropdown.Item>
              <span className='text-black'>
                {t("header.welcome")},{userData.fullName}
              </span>
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
