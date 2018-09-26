import React from "react";

import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

const Badge = ({ ticket }) => (
  <section className={styles[ticket.type]}>
    <img src={Logo} alt="ReasonConf 2018" className={styles.logo} />
    <div className={styles.content}>
      <h2 className={styles.name}>
        <span className={styles.firstName}>{ticket.firstName}</span>{" "}
        <span className={styles.lastName}>{ticket.lastName}</span>
      </h2>
      {ticket.twitter && <h3 className={styles.twitter}>{ticket.twitter}</h3>}
      {ticket.company && <p className={styles.company}>{ticket.company}</p>}
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
          <dd>{ticket.username}</dd>
        </dl>
        <dl>
          <dt>Pass.</dt>
          <dd>{ticket.password}</dd>
        </dl>
      </div>
    </section>
  </section>
);

export default Badge;
