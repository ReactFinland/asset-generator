import React from "react";
import Swipe from "react-swipe-component";
import connect from "./connect";
import SponsorsContainer from "./SponsorsContainer.jsx";
import ScheduleIcon from "../components/ScheduleIcon.jsx";
import TitlePage from "../components/TitlePage.jsx";
import logo from "../assets/colored-logo.svg";
import styles from "./presentation.scss";
import root from "window-or-global";

if (root.location) {
  require("viewport-units-buggyfill").init();
}

class PresentationContainer extends React.Component {
  state = {
    slide: getSlide()
  };
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown, false);
  }
  onKeydown = event => {
    const { key } = event;

    if (key === "ArrowUp") {
      event.preventDefault();
      this.moveToPreviousSlide();
    }
    if (key === "ArrowDown") {
      event.preventDefault();
      this.moveToNextSlide();
    }
  };

  moveToPreviousSlide = () => {
    const previousSlide = Math.max(
      parseInt(root.location.hash.slice(1)) - 1,
      0
    );

    root.location = `${root.location.origin}${
      root.location.pathname
    }#${previousSlide}`;
    this.setState({ slide: previousSlide });
    this.scrollToSlide(previousSlide);
  };

  moveToNextSlide = () => {
    const { schedule } = this.props;

    const nextSlide = Math.min(
      parseInt(root.location.hash.slice(1)) + 1,
      schedule.intervals.length
    );

    root.location = `${root.location.origin}${
      root.location.pathname
    }#${nextSlide}`;
    this.setState({ slide: nextSlide });
    this.scrollToSlide(nextSlide);
  };

  scrollToSlide(slide) {
    root.document
      .getElementsByClassName(`slide-${slide}`)[0]
      .scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { schedule } = this.props;

    return (
      <Swipe
        mouseSwipe
        onSwipedUp={this.moveToNextSlide}
        onSwipedDown={this.moveToPreviousSlide}
      >
        <Slides schedule={schedule} />
      </Swipe>
    );
  }
}

function Slides({ schedule }) {
  return (
    <>
      <div className={`${styles.presentationContainer} slide-0`}>
        <TitlePage />
      </div>
      {schedule ? (
        schedule.intervals
          .map(interval => interval.sessions[0])
          .map((session, index) => (
            <div
              className={`${styles.presentationContainer} slide-${index + 1}`}
              key={index}
            >
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
                <SessionTitle
                  className={styles.presentationTitle}
                  {...session}
                />
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
    </>
  );
}

function getSlide() {
  if (!root.location) {
    return 0;
  }

  return root.location.hash ? parseInt(root.location.hash.slice(1)) : 0;
}

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
