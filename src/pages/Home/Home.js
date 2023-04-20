import React from "react";
import { AuthButtonGroup, PageHeading} from "../../components";

import "./Home.scss";

export const Home = () => {
    return (
    <div id="home-page-container">
      <div className="header">
        <PageHeading heading="Home" />
        <AuthButtonGroup />
      </div>
    </div>
  );
};
