import React from "react";
import connect from "./connect";
import Contacts from "./Contacts.jsx";
import Sponsor from "./Sponsor.jsx";

import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

const BadgeFront = ({
  type,
  firstName,
  lastName,
  twitter,
  company,
  conference: { goldSponsors = [] } = {}
}) => (
  <section className={styles[type]}>
    <img src={Logo} alt="GraphQL Finland 2018" className={styles.logo} />
    <div className={styles.content}>
      <h2 className={styles.name}>
        <span className={styles.firstName}>
          {firstName} {lastName}
        </span>
      </h2>
      {twitter && <h3 className={styles.twitter}>@{twitter}</h3>}
      {company && <p className={styles.company}>{company}</p>}
      <div className={styles.goldSponsors}>
        <section className={styles.sponsorsList}>
          <Contacts items={goldSponsors} render={Sponsor} />
        </section>
      </div>
    </div>
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
