import React from "react";
import coloredLogo from "../assets/colored-logo.svg";
import styles from "./title.scss";

const TitlePage = () => (
  <div className={styles.titleContainer}>
    <img
      className={styles.titleLogo}
      src={coloredLogo}
      title="GraphQL Finland 2018"
    />
    <h2 className={styles.titleYear}>2018</h2>
  </div>
);

export default TitlePage;
