import React from "react";
import connect from "./connect";
import SponsorsContainer from "./SponsorsContainer.jsx";
import SessionTitle from "../components/SessionTitle.jsx";
import TitlePage from "../components/TitlePage.jsx";
import logo from "../assets/colored-logo.svg";
import styles from "./presentation.scss";
import root from "window-or-global";

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
  onKeydown = ({ key }) => {
    if (key === "ArrowRight") {
      const { schedule } = this.props;
      const nextSlide = Math.min(
        parseInt(root.location.hash.slice(1)) + 1,
        schedule.intervals.length
      );

      root.location = `${location.origin}${location.pathname}#${nextSlide}`;
      this.setState({ slide: nextSlide });
    }
    if (key === "ArrowLeft") {
      const previousSlide = Math.max(
        parseInt(root.location.hash.slice(1)) - 1,
        0
      );

      root.location = `${location.origin}${location.pathname}#${previousSlide}`;
      this.setState({ slide: previousSlide });
    }
  };

  render() {
    const { schedule } = this.props;
    const { slide } = this.state;

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
  }
}

function getPresentation(schedule, index) {
  if (!schedule) {
    return {};
  }

  // XXX: Better with lodash get as otherwise this can crash with bad data
  return schedule.intervals[index].sessions[0];
}

function getSlide() {
  if (!root.location) {
    return 0;
  }

  return root.location.hash ? parseInt(root.location.hash.slice(1)) : 0;
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
