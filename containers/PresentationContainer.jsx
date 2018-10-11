import React from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import connect from "./connect";
import SponsorsContainer from "./SponsorsContainer.jsx";
import SessionTitle from "../components/SessionTitle.jsx";
import TitlePage from "../components/TitlePage.jsx";
import logo from "../assets/colored-logo.svg";
import styles from "./presentation.scss";
import root from "window-or-global";

const KeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const PresentationContainer = ({ schedule }) => (
  <KeyboardSwipeableViews
    enableMouseEvents
    onChangeIndex={index => {
      root.location = `${location.origin}${location.pathname}#${index}`;
    }}
  >
    <div className={styles.presentationContainer}>
      <TitlePage />
    </div>
    {schedule ? (
      schedule.intervals
        .map(interval => interval.sessions[0])
        .map((session, index) => (
          <div className={styles.presentationContainer} key={index}>
            <img
              src={logo}
              alt="GraphQL Finland 2018"
              className={styles.presentationLogo}
            />
            <div className={styles.presentationContent}>
              <SessionTitle {...session} />
            </div>
            <SponsorsContainer />
          </div>
        ))
    ) : (
      <React.Fragment />
    )}
  </KeyboardSwipeableViews>
);

export default connect(
  `
query PageQuery($conferenceId: ID!, $day: String!) {
  schedule(conferenceId: $conferenceId, day: $day) {
    intervals {
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
            type
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
)(PresentationContainer);
