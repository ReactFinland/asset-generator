import React from "react";

import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

const Badge = ({
  type,
  firstName,
  lastName,
  twitter,
  company,
  username,
  password
}) => (
  <section className={styles[type]}>
    <img src={Logo} alt="ReasonConf 2018" className={styles.logo} />
    <div className={styles.content}>
      <h2 className={styles.name}>
        <span className={styles.firstName}>
          {firstName} {lastName}
        </span>
      </h2>
      {twitter && <h3 className={styles.twitter}>@{twitter}</h3>}
      {company && <p className={styles.company}>{company}</p>}
    </div>
    <section className={styles.footer}>
      <div className={styles.footerLeft}>
        <h4>ImpactHub</h4>
        <dl>
          <dt>WLAN</dt>
          <dd>ImpactHubVienna</dd>
        </dl>
        <dl>
          <dt>Pass.</dt>
          <dd>WeLoveImpact</dd>
        </dl>
      </div>
      <div className={styles.footerRight}>
        <h4>TU Wien</h4>
        <dl>
          <dt>WLAN</dt>
          <dd>tunetguest</dd>
        </dl>
        <dl>
          <dt>User.</dt>
          <dd>{username}</dd>
        </dl>
        <dl>
          <dt>Pass.</dt>
          <dd>{password}</dd>
        </dl>
      </div>
    </section>
  </section>
);

export default Badge;
