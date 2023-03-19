import React from "react";
import { Outlet } from "react-router";

const PersonalMessagesList = () => {
  return (
    <div>
      <p>Personal Messages List</p>
      <Outlet />
    </div>
  );
};

export default PersonalMessagesList;
