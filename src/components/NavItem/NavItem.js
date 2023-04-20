import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavIcons } from "../NavIcons/NavIcons";

import "./NavItem.scss";

export const NavItem = ({ pageUrl, label, hide }) => {
  const location = useLocation();

  const isActive = () => {
    if (
      pageUrl === location.pathname ||
      (pageUrl === "/home" && location.pathname === "/")
    ) {
      return true;
    }

    return false;
  };

  return (
    <div
      className={`nav-item-container ${isActive() ? "active" : ""} ${
        hide ? "hide" : ""
      }`}
    >
      <NavIcons url={pageUrl} />
      <Link to={pageUrl} className="nav-link">
        {label}
      </Link>
    </div>
  );
};
