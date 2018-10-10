import React from "react";
import PropTypes from "prop-types";
import styles from "./sponsors.scss";

const SponsorContent = ({ src, name, props }) => (
  <img alt={name} className={styles.sponsorsLogo} src={src} {...props} />
);
SponsorContent.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  props: PropTypes.object
};

const Sponsor = ({ name, image, logoProps }) => (
  <SponsorContent src={image.url} name={name} props={logoProps} />
);
Sponsor.propTypes = {
  name: PropTypes.string,
  about: PropTypes.string,
  social: PropTypes.object,
  image: PropTypes.object,
  logoProps: PropTypes.object
};

export default Sponsor;
