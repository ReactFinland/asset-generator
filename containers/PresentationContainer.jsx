import React from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import connect from "./connect";
import SponsorsContainer from "./SponsorsContainer.jsx";
import ScheduleIcon from "../components/ScheduleIcon.jsx";
import TitlePage from "../components/TitlePage.jsx";
import logo from "../assets/colored-logo.svg";
import styles from "./presentation.scss";
import root from "window-or-global";

const KeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const PresentationContainer = ({ schedule }) => (
  <KeyboardSwipeableViews
    enableMouseEvents
    index={schedule ? parseInt(location.hash.slice(1)) : 0}
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
            <header className={styles.presentationHeader}>
              <div className={styles.presentationLogoContainer}>
                <img
                  src={logo}
                  alt="GraphQL Finland 2018"
                  className={styles.presentationLogo}
                />
              </div>
              <div />
              {session.speakers && (
                <div className={styles.speakerImageContainer}>
                  <img
                    className={styles.speakerImage}
                    src={session.speakers[0].image.url}
                    alt={session.speakers[0].name}
                  />
                </div>
              )}
            </header>
            <main className={styles.presentationContent}>
              <SessionTitle className={styles.presentationTitle} {...session} />
              {session.interval && (
                <h4 className={styles.presentationInterval}>
                  {session.interval.begin} - {session.interval.end}
                </h4>
              )}
            </main>
            <footer className={styles.presentationFooter}>
              <SponsorsContainer />
            </footer>
          </div>
        ))
    ) : (
      <React.Fragment />
    )}
  </KeyboardSwipeableViews>
);

const SessionTitle = ({ className, title, type, speakers }) => (
  <h3 className={className}>
    {type === "COFFEE_BREAK" ||
    type === "PARTY" ||
    type === "LUNCH" ||
    type === "BREAKFAST" ? (
      <div className={styles.specialSession}>
        {title} <ScheduleIcon type={type} />
      </div>
    ) : (
      <>
        <div className={styles.speakerTitle}>{title}</div>
        {speakers ? (
          <span className={styles.speakerName}>
            {speakers[0].name} <ScheduleIcon type={type} />
          </span>
        ) : (
          <ScheduleIcon type={type} />
        )}
      </>
    )}
  </h3>
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
