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
import Sidebar from "./Components/Home/SideBar/Sidebar.jsx";
import Layout from "./Components/Home/Layout/Layout.jsx";
import Login from "./Components/Login/Login/Login.jsx";
import SignUp from "./Components/Login/User Register/SignUp.jsx";

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
        <CustomToaster />
        <Routes>
          <Route path='/auth/admin/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/auth/admin/register' element={<SignUp />} />

          {isToken ? (
            <Route path='/' element={<Layout />}>
              <Route path='/all-customers-data' element={<AllCustomersData />} />
            </Route>
          ) : (
            <Route path='*' element={<Navigate to='/' />} />
          )}
          <Route path='/' element={<MainPage />} />
          <Route path='/customer-Data/:customerID' element={<CustomerData />} />
          <Route path='/thankyou-for-choosing' element={<Thankyou />} />
        </Routes>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
