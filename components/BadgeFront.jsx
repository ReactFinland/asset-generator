import React from "react";
import styles from "./badges.scss";
import Logo from "../assets/logo.svg";

const BadgeFront = ({ type, firstName, lastName, twitter, company }) => (
  <section className={`${styles.badge} ${styles[type]}`}>
    <img src={Logo} alt="GraphQL Finland 2018" className={styles.logo} />
    <div className={styles.content}>
      <h2 className={styles.name}>
        <span className={styles.firstName}>
          {firstName} {lastName}
        </span>
      </h2>
      {twitter && <h3 className={styles.twitter}>@{twitter}</h3>}
      {company && <p className={styles.company}>{company}</p>}
    </div>
    {type && <h3 className={styles.typeText}>{type}</h3>}
  </section>
);

export default BadgeFront;
