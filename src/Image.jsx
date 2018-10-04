import React from "react";
import PropTypes from "prop-types";

const Image = ({ alt, width, height, className, src }) => (
  <img
    alt={alt}
    width={width}
    height={height}
    className={className}
    src={src}
  />
);

Image.propTypes = {
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default Image;
