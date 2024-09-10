import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/Languages/i18n.js";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage.jsx";
import CustomToaster from "./Components/Toaster/CustomToaster.jsx";
import AllCustomersData from "./Components/Home/CustomerData/AllCustomersData.jsx";
import CustomerData from "./Components/Home/CustomerData/CustomerData.jsx";
import Thankyou from "./Components/Home/CustomerData/Thankyou.jsx";
import Layout from "./Components/Home/Layout/Layout.jsx";
import Login from "./Components/Login/Login/Login.jsx";
import SignUp from "./Components/Login/User Register/SignUp.jsx";
import UserProfile from "./Components/Home/UserProfile/UserProfile.jsx";
import { UserProvider } from "./Components/Custom/Context/UserContext.jsx";
import Home from "./Components/Dashboard/Home/Home.jsx";
import CustomerDetails from "./Components/Home/CustomerData/CustomerDetails.jsx";
import AboutUs from "./Components/Pages/About us/AboutUs.jsx";
import ContactUs from "./Components/Pages/Contact us/ContactUs.jsx";

function App() {
  const [isToken, setIsToken] = useState(() => !!sessionStorage.getItem("token"));

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setIsToken(!!storedToken);
  }, []);

  const handleLogin = (token) => {
    sessionStorage.setItem("token", token);
    setIsToken(true);
  };

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <CustomToaster />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/customer-Data/:customerID' element={<CustomerData />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            {isToken ? (
              <Route path='/' element={<Layout />}>
                <Route path='/home' element={<Home />} />
                <Route path='/all-customers-data' element={<AllCustomersData />} />
                <Route path='/customer-details/:customerID' element={<CustomerDetails />} />
                <Route path='/user-profile' element={<UserProfile />} />
              </Route>
            ) : (
              <Route path='*' element={<MainPage />} />
            )}
            <Route path='/auth-admin-login' element={<Login onLogin={handleLogin} />} />
            <Route path='/auth-admin-register' element={<SignUp />} />
          </Routes>
        </UserProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
