import React, { useState, useEffect } from "react";
import axios from "../../../Api/Api"; // Adjust the path based on your project structure
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./home.css";

const ChartData = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const orderedKeys = ["landCount", "buildingCount", "apartmentCount", "houseCount", "restHouseCount", "saleCount", "rentCount", "sellingOnLimitCount", "sellingOnPriceCount"];

  const labelMapping = {
    landCount: t("chartLabels.LandCount"),
    buildingCount: t("chartLabels.BuildingCount"),
    apartmentCount: t("chartLabels.ApartmentCount"),
    houseCount: t("chartLabels.HouseCount"),
    restHouseCount: t("chartLabels.RestHouseCount"),
    saleCount: t("chartLabels.SaleCount"),
    rentCount: t("chartLabels.RentCount"),
    sellingOnLimitCount: t("chartLabels.SellingOnLimitCount"),
    sellingOnPriceCount: t("chartLabels.SellingOnPriceCount"),
  };

  useEffect(() => {
    const fetchDocumentCounts = async () => {
      try {
        const response = await axios.get("/api/admin/GetCustomerCounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.statusCode === "1") {
          const responseData = response.data.response;
          const categories = orderedKeys.map((key) => labelMapping[key]);
          const data = orderedKeys.map((key) => responseData[key]);
          setDataPoints({ categories, data });
        } else {
          console.error("API request failed:", response.data.message);
        }
      } catch (error) {
        if (error.response && (error.response.data.statusCode === "2" || error.response.data.statusCode === "4")) {
          sessionStorage.removeItem("token");
          localStorage.clear();
          navigate("/");
          toast.info("Session expired");
        }
        console.log(error);
      }
    };

    fetchDocumentCounts();
  }, [token, navigate]);

  const chartOptions = {
    series: [
      {
        name: "Customer Property Counts",
        data: dataPoints.data || [],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#003e52"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#003e52"],
    },
    title: {
      text: t("chartLabels.customerPropertyCounts"),
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 20,
      },
    },
    xaxis: {
      categories: dataPoints.categories || [],
    },
  };

  return (
    <div className='chart-container'>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type='line' height={350} />
    </div>
  );
};

export default ChartData;
