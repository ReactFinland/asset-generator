import React from "react";
import connect from "./connect";
import Schedule from "./Schedule.jsx";

const SchedulePage = ({ schedule }) => (
  <Schedule intervals={schedule && schedule.intervals} />
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
)(SchedulePage);
