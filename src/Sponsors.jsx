import React from "react";
import Contacts from "./Contacts.jsx";
import Sponsor from "./Sponsor.jsx";
import styles from "./css/sponsors.scss";
import connect from "./connect";

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

// TODO: Implement a sponsor query to the root
export default connect(
  `
  query PageQuery($conferenceId: ID!) {
    conference(id: $conferenceId) {
      goldSponsors {
        ...SponsorFragment
      }
      silverSponsors {
        ...SponsorFragment
      }
      bronzeSponsors {
        ...SponsorFragment
      }
    }
  }

  ${sponsorFragment}
`
)(Sponsors);
