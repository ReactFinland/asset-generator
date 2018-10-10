import React from "react";
import PropTypes from "prop-types";
import ScheduleIcon from "./ScheduleIcon.jsx";
import styles from "./session-title.scss";

const SessionTitle = ({ title, type, speakers }) => (
  <h3 className={styles.sessionIntervalTitle}>
    {type === "COFFEE_BREAK" ||
    type === "PARTY" ||
    type === "LUNCH" ||
    type === "BREAKFAST" ? (
      <div className={styles.specialSession}>
        {title} <ScheduleIcon type={type} />
      </div>
    ) : (
      <>
        {title} {speakers && `- ${speakers[0].name}`}{" "}
        <ScheduleIcon type={type} />
      </>
    )}
  </h3>
);

const titlePropTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  speakers: PropTypes.array
};

SessionTitle.propTypes = { ...titlePropTypes, styles: PropTypes.object };

export default SessionTitle;
