import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../../../Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");

  const token = sessionStorage.getItem("token");

  // API: Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/admin/GetAppUserProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.statusCode === "1") {
        const { appUserID, fullName, countryCode, mobileNumber, emailID } = response.data.response;
        setUserData({
          appUserID,
          fullName,
          mobileNumber,
          emailID,
          countryCode,
        });
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.response && (error.response.data.statusCode === "2" || error.response.data.statusCode === "4")) {
      sessionStorage.removeItem("token");
      localStorage.clear();
      navigate("/");
      toast.info("Session expired");
    } else {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  return <UserContext.Provider value={{ userData, loading }}>{children}</UserContext.Provider>;
};
