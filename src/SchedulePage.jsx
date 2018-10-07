import React from "react";
import connect from "./connect";
import Contacts from "./Contacts.jsx";
import Sponsor from "./Sponsor.jsx";
import Schedule from "./Schedule.jsx";
import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

const SchedulePage = ({
  schedule,
  conference: {
    goldSponsors = [],
    silverSponsors = [],
    bronzeSponsors = []
  } = {}
}) => (
  <div className={styles.scheduleContainer}>
    <img
      src={Logo}
      alt="GraphQL Finland 2018"
      className={styles.scheduleLogo}
    />
    <div className={styles.scheduleContent}>
      <Schedule intervals={schedule && schedule.intervals} />
    </div>
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

export default connect(
  `
  query PageQuery($conferenceId: ID!, $day: String!) {
    schedule(conferenceId: $conferenceId, day: $day) {
      day
      description
      intervals {
        begin
        end
        sessions {
          type
          interval {
            begin
            end
          }
          title

          ... on Talk {
            speakers {
              name
            }
          }
        }
      }
    }
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
`,
  () => ({ day: "2018-10-19" })
)(SchedulePage);
