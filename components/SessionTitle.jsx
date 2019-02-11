import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ScheduleIcon from "./ScheduleIcon.jsx";
import styles from "./session-title.scss";

const SessionTitle = ({ className, title, type, people }) => (
  <h3 className={cx(className, styles.sessionIntervalTitle)}>
    {type === "COFFEE_BREAK" ||
    type === "PARTY" ||
    type === "LUNCH" ||
    type === "BREAKFAST" ? (
      <div className={styles.specialSession}>
        {title} <ScheduleIcon type={type} />
      </div>
    ) : (
      <>
        {title} {people && `- ${people[0].name}`} <ScheduleIcon type={type} />
      </>
    )}
  </h3>
);

const titlePropTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  people: PropTypes.array
};

SessionTitle.propTypes = { ...titlePropTypes, styles: PropTypes.object };

export default SessionTitle;
