import React, { useState, useEffect } from "react";
import axios from "../../../Api/Api";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminCounts = () => {
  const [customerCounts, setCustomerCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCustomerCounts = async () => {
      try {
        const response = await axios.get("/api/admin/GetCustomerCounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.statusCode === "1") {
          const data = response.data.response;
          setCustomerCounts([
            data.landCount,
            data.buildingCount,
            data.apartmentCount,
            data.houseCount,
            data.restHouseCount,
            data.saleCount,
            data.rentCount,
            data.sellingOnLimitCount,
            data.sellingOnPriceCount,
          ]);
        } else {
          console.error("API request failed:", response.data.message);
        }
        setIsLoading(false);
      } catch (error) {
        if (error.response && (error.response.data.statusCode === "2" || error.response.data.statusCode === "4")) {
          sessionStorage.removeItem("token");
          localStorage.clear();
          navigate("/");
          toast.info("Session expired");
        }
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchCustomerCounts();
  }, [token, navigate]);

  const chartOptions = {
    series: customerCounts,
    chart: {
      width: 700,
      type: "pie",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FF5733", "#33FF57", "#768d9d", "#47b7c5", "#FFA533", "#8e44ad", "#e67e22", "#2980b9", "#2ecc71"],
    labels: [t("Land"), t("Building"), t("Apartment"), t("House"), t("Rest House"), t("Sale"), t("Rent"), t("Selling on Limit"), t("Selling on Price")],
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
            show: true,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
            show: true,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
    },
  };

  return (
    <div className='my-3' style={{ overflow: "hidden" }}>
      {isLoading && (
        <div className='loader-overlay'>
          <div className='loader1'></div>
        </div>
      )}
      <ReactApexChart options={chartOptions} series={customerCounts} type='pie' />
    </div>
  );
};

export default AdminCounts;
