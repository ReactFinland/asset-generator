import React from "react";
import connect from "./connect";
import Schedule from "./Schedule.jsx";

import styles from "./css/badges.scss";

const BadgeBack = ({ schedule, type }) => (
  <section className={styles[type]}>
    <div className={`${styles.content} ${styles.badgeBack}`}>
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
            }
          }
        }
      }
    }
  }
`,
  () => ({ day: "2018-10-19" })
)(BadgeBack);
