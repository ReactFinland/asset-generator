import "@babel/polyfill";
import React from "react";
import Interactive from "antwar-interactive";
import BadgesContainer from "./BadgesContainer.jsx";

const BadgesPage = () => (
  <Interactive id="src/BadgesContainer.jsx" component={BadgesContainer} />
);

export default BadgesPage;
