import React from "react";
import connect from "./connect";
import Schedule from "./Schedule.jsx";

import Logo from "./assets/logo.svg";
import styles from "./css/badges.scss";

const BadgeBack = ({ schedule, type }) => (
  <section className={styles[type]}>
    <img src={Logo} alt="GraphQL Finland 2018" className={styles.logo} />
    <div className={styles.content}>
      <Schedule intervals={schedule && schedule.intervals} />
    </div>
  </section>
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
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`,
  () => ({ day: "2018-10-19" })
)(BadgeBack);
