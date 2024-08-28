import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/Languages/i18n.js";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage.jsx";
import Login from "./Components/Login/Login.jsx";
import CustomToaster from "./Components/Toaster/CustomToaster.jsx";
import CustomerData from "./Components/CustomerData/CustomerData.jsx";
import Thankyou from "./Components/CustomerData/Thankyou.jsx";
import AllCustomersData from "./Components/CustomerData/AllCustomersData.jsx";

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
          <Route path='/auth-login-admin' element={<Login onLogin={handleLogin} />} />
          {isToken ? (
            <>
              <Route path='/all-customers-data' element={<AllCustomersData />} />
            </>
          ) : (
            <Route path='*' element={<Navigate to='/auth-login-admin' />} />
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
