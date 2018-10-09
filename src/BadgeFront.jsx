import React from "react";
import connect from "./connect";

import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

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

const sponsorFragment = `
  fragment SponsorFragment on Contact {
    name
    social {
      homepage
    }
    about
    image {
      url
    }
  }
`;

export default connect(
  `
  query RootQuery($conferenceId: ID!) {
    conference(id: $conferenceId) {
      goldSponsors {
        ...SponsorFragment
      }
    }
  }

  ${sponsorFragment}
`,
  () => ({ day: "2018-10-19" })
)(BadgeFront);
