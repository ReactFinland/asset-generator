import React from "react";
import Contacts from "./Contacts.jsx";
import Sponsor from "./Sponsor.jsx";
import styles from "./sponsors.scss";

const Sponsors = ({
  conference: {
    goldSponsors = [],
    silverSponsors = [],
    bronzeSponsors = []
  } = {}
}) => (
  <div className={styles.sponsorsContainer}>
    <div className={styles.goldSponsors}>
      <section className={styles.sponsorsList}>
        <Contacts items={goldSponsors} render={Sponsor} />
      </section>
    </div>
    <div className={styles.silverSponsors}>
      <section className={styles.sponsorsList}>
        <Contacts items={silverSponsors} render={Sponsor} />
      </section>
    </div>
    <div className={styles.bronzeSponsors}>
      <section className={styles.sponsorsList}>
        <Contacts items={bronzeSponsors} render={Sponsor} />
      </section>
    </div>
  </div>
);

export default Sponsors;
