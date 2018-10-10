import React from "react";
import connect from "./connect";
import SponsorsContainer from "../containers/SponsorsContainer.jsx";
import Schedule from "../components/Schedule.jsx";
import Logo from "../assets/logo.svg";
import styles from "./schedule.scss";

const ScheduleContainer = ({ schedule }) => (
  <div className={styles.scheduleContainer}>
    <img
      src={Logo}
      alt="GraphQL Finland 2018"
      className={styles.scheduleLogo}
    />
    <h1 className={styles.scheduleHeader}>Schedule</h1>
    <div className={styles.scheduleContent}>
      <Schedule intervals={schedule && schedule.intervals} styles={styles} />
    </div>
    <SponsorsContainer />
  </div>
);

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
}
`,
  {
    apiUrl: "https://api.react-finland.fi/graphql",
    propsToVars: () => ({ day: "2018-10-19" })
  }
)(ScheduleContainer);
