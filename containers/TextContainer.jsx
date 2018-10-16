import React from "react";
import SponsorsContainer from "../containers/SponsorsContainer.jsx";
import logo from "../assets/logo.svg";
import scheduleStyles from "./schedule.scss";
import textStyles from "./text.scss";

const TextContainer = ({ text, size }) => (
  <div className={scheduleStyles.scheduleContainer}>
    <img
      src={logo}
      alt="GraphQL Finland 2018"
      className={scheduleStyles.scheduleLogo}
    />
    <div className={`${scheduleStyles.scheduleContent} ${textStyles.textContent}`}>
      <h1 className={textStyles.text} style={{ fontSize: size }}>{text}</h1>
    </div>
    <SponsorsContainer />
  </div>
);

export default TextContainer;
