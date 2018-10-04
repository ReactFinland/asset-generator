import React from "react";
import PropTypes from "prop-types";
import scheduleTypes from "./schedule-types";

const ScheduleIcon = ({ type }) =>
  scheduleTypes[type] ? (
    <span title={scheduleTypes[type].title}>{scheduleTypes[type].icon}</span>
  ) : null;
ScheduleIcon.propTypes = {
  type: PropTypes.string
};

export default ScheduleIcon;
