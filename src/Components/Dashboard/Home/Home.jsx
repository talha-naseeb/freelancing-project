import React, { useEffect, useState } from "react";
import axios from "../../../Api/Api";
import "./home.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import AdminCounts from "./AdminCounts";
import ChartData from "./ChartData";
import CountsData from "./CountsData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [customerCounts, setCustomerCounts] = useState(null);
  const [adminCounts, setAdminCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
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
      }
    };



    fetchUserProfile();
    setLoading(false);
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
