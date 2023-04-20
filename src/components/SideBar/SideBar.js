import React, { useContext } from "react";
import { USER_ROLES } from "../../constants/appConstants";
import { PAGES, URLS } from "../../constants/navConstants";
import { AppContext } from "../../state-management/app-context";
import {STATES } from "../../state-management/constants";
import { AppLogo } from "../AppLogo/AppLogo";
import { NavItem } from "../NavItem/NavItem";
import { UserPreview } from "../UserPreview/UserPreview";

import "./SideBar.scss";

export const SideBar = () => {
  const { data } = useContext(AppContext);
  const shouldHide = (url) => {
    const hideMap = {
      [URLS.userInfo]: () => {
        const isLoggedIn = data[STATES.IS_LOGGED_IN];
        return !isLoggedIn;
      },

      [URLS.adminDashboard]: () => {
        const user = data[STATES.CURRENT_USER];
        return !((user.userRole === USER_ROLES.ADMIN) && data[STATES.IS_LOGGED_IN]);
      },
    
      default: false,
    };
    if (hideMap[url]) {
      return hideMap[url]();
    }

    return hideMap.default;
  };

  return (
    <div id="side-bar-container">
      <div>
        <AppLogo />
        {PAGES.map((page) => {
          return (
            <NavItem
              pageUrl={page.url}
              label={page.name}
              key={page.id}
              hide={shouldHide(page.url)}
            />
          );
        })}
      </div>
      <UserPreview />
    </div>
  );
};
