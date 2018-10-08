import React from "react";
import PropTypes from "prop-types";
import ScheduleIcon from "./ScheduleIcon.jsx";
import styles from "./css/badges.scss";

const Schedule = ({ intervals }) =>
  intervals ? (
    <dl className={styles.schedule}>
      {intervals.map(({ begin, end, sessions }, i) => (
        <div
          key={`schedule-container-${i}`}
          className={styles.scheduleItemContainer}
        >
          <dt
            className={`${styles.scheduleTitle} ${styles[getType(sessions)]}`}
            key={`dt-${i}`}
          >
            {begin}–{end}
          </dt>
          <dd className={styles.scheduleDefinition} key={`dd-${i}`}>
            {sessions.map(({ title, type, speakers }, i) => (
              <SessionTitle
                key={i}
                title={title}
                type={type}
                speakers={speakers}
              />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  ) : null;
Schedule.propTypes = {
  intervals: PropTypes.array
};

// TODO: If there are multiple sessions, how to resolve type? -> mixed?
function getType(sessions) {
  return sessions.length && sessions[0].type.toLowerCase();
}

const titlePropTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  speakers: PropTypes.array
};

const SessionTitle = ({ title, type, speakers }) => (
  <h3 className={styles.sessionIntervalTitle}>
    {type === "COFFEE_BREAK" ||
    type === "PARTY" ||
    type === "LUNCH" ||
    type === "BREAKFAST" ? (
      <div className={styles.specialSession}>
        <ScheduleIcon type={type} />
      </div>
    ) : (
      <>
        <ScheduleIcon type={type} />
        {title} {speakers && `- ${speakers[0].name}`}
      </>
    )}
  </h3>
);
SessionTitle.propTypes = titlePropTypes;

export default Schedule;
