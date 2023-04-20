import React from "react";

import { BiHomeSmile, BiConfused } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { URLS } from "../../constants/navConstants";

export const NavIcons = ({ url }) => {
  const iconMap = {
    [URLS.home]: <BiHomeSmile className="nav-icon" />,
    [URLS.userInfo]: <FaUserEdit className="nav-icon" />,
    [URLS.adminDashboard]: <MdAdminPanelSettings className="nav-icon" />,
    default: <BiConfused className="nav-icon" />,
  };

  return iconMap[url] || iconMap.default;
};
