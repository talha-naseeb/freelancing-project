import React, { useEffect, useState } from "react";
import axios from "../../../Api/Api";
import "./home.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminCounts from "./AdminCounts";
import ChartData from "./ChartData";
import CountsData from "./CountsData";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

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
          setUserData(response.data.response);
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleApiError = (error) => {
    if (error.response && (error.response.data.statusCode === "2" || error.response.data.statusCode === "4")) {
      sessionStorage.removeItem("token");
      localStorage.clear();
      navigate("/");
      toast.info("Session expired");
    } else {
      console.error("API Error:", error);
    }
  };

  return (
    <div className='my-3 gap-3 container align-items-center justify-content-center'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <div className='main-start-div'>
        <div className='start-div'>
          <div className='contentDiv'>
            <h3>
              {t("home.welcomeAdminPanel")} {userData?.fullName}!
            </h3>
          </div>

          <AdminCounts />
        </div>
      </div>

      <CountsData />
      <ChartData />
    </div>
  );
};

export default Home;
