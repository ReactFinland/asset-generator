import React from "react";
import coloredLogo from "../assets/colored-logo.svg";
import styles from "./title.scss";

const TitlePage = () => (
  <div className={styles.titleContainer}>
    <div className={styles.logoContainer}>
      <img
        className={styles.titleLogo}
        src={coloredLogo}
        title="GraphQL Finland 2018"
      />
    </div>
    <div className={styles.yearContainer}>
      <h2 className={styles.titleYear}>2018</h2>
    </div>
  </div>
);

export default TitlePage;
