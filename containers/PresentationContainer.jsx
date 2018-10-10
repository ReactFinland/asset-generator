import React from "react";
import connect from "./connect";
import SponsorsContainer from "./SponsorsContainer.jsx";
import SessionTitle from "../components/SessionTitle.jsx";
import TitlePage from "../components/TitlePage.jsx";
import logo from "../assets/colored-logo.svg";
import styles from "./presentation.scss";

const PresentationContainer = ({ schedule }) => {
  const slide = parseInt(location.hash.slice(1));

  if (slide === 0) {
    return <TitlePage />;
  }

  return (
    <div className={styles.presentationContainer}>
      <img
        src={logo}
        alt="GraphQL Finland 2018"
        className={styles.presentationLogo}
      />
      <div className={styles.presentationContent}>
        <SessionTitle {...getPresentation(schedule, slide - 1)} />
      </div>
      <SponsorsContainer />
    </div>
  );
};

function getPresentation(schedule, index) {
  if (!schedule) {
    return {};
  }

  // XXX: Better with lodash get as otherwise this can crash with bad data
  return schedule.intervals[index].sessions[0];
}

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
