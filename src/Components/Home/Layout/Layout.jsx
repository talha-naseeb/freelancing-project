import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLogin from "../../Header/HeaderLogin";
import Sidebar from "../SideBar/Sidebar";

const Layout = () => {
  return (
    <>
      <Sidebar>
        <HeaderLogin />
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Layout;
