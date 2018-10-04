import React from "react";
import PropTypes from "prop-types";
import ScheduleIcon from "./ScheduleIcon.jsx";
import SessionSpeakers from "./SessionSpeakers.jsx";

const Schedule = ({ intervals }) =>
  intervals ? (
    <dl className="schedule">
      {intervals.map(({ begin, end, sessions }, i) => [
        <dt className={`schedule--title ${getType(sessions)}`} key={`dt-${i}`}>
          {begin}–{end}
        </dt>,
        <dd className="schedule--definition" key={`dd-${i}`}>
          {sessions.map(({ title, type, speakers }, i) => (
            <div className="session" key={`session-${i}`}>
              <AnchorTitle
                key={i}
                title={title}
                type={type}
                speakers={speakers}
              />
            </div>
          ))}
        </dd>
      ])}
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

const AnchorTitle = ({ title, type, speakers }) => (
  <h3>
    <ScheduleIcon type={type} />
    {title} {title && speakers && "—"}{" "}
    {speakers && <SessionSpeakers key={`speaker-names`} speakers={speakers} />}
  </h3>
);
AnchorTitle.propTypes = titlePropTypes;

export default Schedule;
