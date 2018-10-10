import "@babel/polyfill";
import React from "react";
import Interactive from "antwar-interactive";
import BadgesContainer from "../containers/BadgesContainer.jsx";

const BadgesPage = () => (
  <Interactive
    id="containers/BadgesContainer.jsx"
    component={BadgesContainer}
  />
);

export default BadgesPage;
