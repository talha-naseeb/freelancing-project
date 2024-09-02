import React, { useState, useEffect } from "react";
import axios from "../../../Api/Api"; // Adjust the path based on your project structure
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./home.css";

const CountsData = () => {
  const [adminCounts, setAdminCounts] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchAdminCounts = async () => {
      try {
        const response = await axios.get("/api/admin/GetCustomerCounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.statusCode === "1") {
          setAdminCounts(response.data.response);
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

    fetchAdminCounts();
  }, [token]);

  const getChartOptions = (data, title, color) => ({
    series: [
      {
        name: title,
        data: [data || 0],
      },
    ],
    chart: {
      height: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: [color],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: title,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 20,
      },
    },
    xaxis: {
      categories: ["Count"],
    },
  });

  const renderChartWithCount = (data, title, color) => (
    <div className='contentBox'>
      <div className='count'>{data !== undefined ? data : 0}</div>
      <ReactApexChart options={getChartOptions(data, title, color)} series={getChartOptions(data, title, color).series} type='line' height={200} />
    </div>
  );

  return (
    <div className='my-3'>
      <div className='ActiveAccounts'>
        {renderChartWithCount(adminCounts.landCount, t("chartLabels.LandCount"), "#FF5733")}
        {renderChartWithCount(adminCounts.buildingCount, t("chartLabels.BuildingCount"), "#33FF57")}
        {renderChartWithCount(adminCounts.apartmentCount, t("chartLabels.ApartmentCount"), "#768d9d")}
        {renderChartWithCount(adminCounts.houseCount, t("chartLabels.HouseCount"), "#47b7c5")}
        {renderChartWithCount(adminCounts.restHouseCount, t("chartLabels.RestHouseCount"), "#FFA533")}
        {renderChartWithCount(adminCounts.saleCount, t("chartLabels.SaleCount"), "#FFA533")}
        {renderChartWithCount(adminCounts.rentCount, t("chartLabels.RentCount"), "#FFA533")}
        {renderChartWithCount(adminCounts.sellingOnLimitCount, t("chartLabels.SellingOnLimitCount"), "#FFA533")}
        {renderChartWithCount(adminCounts.sellingOnPriceCount, t("chartLabels.SellingOnPriceCount"), "#FFA533")}
      </div>
    </div>
  );
};

export default CountsData;
