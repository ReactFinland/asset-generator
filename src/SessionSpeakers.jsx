import React from "react";
import PropTypes from "prop-types";
import Image from "./Image.jsx";

const SessionSpeakers = ({ speakers = [] }) => (
  <span className="session--speakers">
    {speakers &&
      speakers.map(({ name, image, about }, i) => [
        speakers.length > 1 &&
          i === speakers.length - 1 && <span key={`and-${i}`}> and </span>,
        <Image
          className="speaker-name--photo photo"
          alt={about}
          key={i}
          width={32}
          height={32}
          src={image.url}
        />,
        name
      ])}
  </span>
);
SessionSpeakers.propTypes = {
  speakers: PropTypes.array
};

export default SessionSpeakers;
