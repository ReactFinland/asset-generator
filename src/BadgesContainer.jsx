import React from "react";
import connect from "./connect";
import Badges from "./Badges.jsx";

const BadgesContainer = ({ schedule }) => <Badges />;

export default connect(
  `
  query TicketsQuery($conferenceId: ID!, $day: String!) {
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
`
)(BadgesContainer);
