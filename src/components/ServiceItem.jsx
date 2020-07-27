import React from "react";
import PropTypes from "prop-types";

import CircleFAButton from "components/CircleFAButton";
import Image from "components/Image";
import "./ServiceItem.scss";

const ServiceItem = ({ iconName, imageFileName, header, subHeader, content }) => {
  let iconPart;
  if (iconName) {
    iconPart = <CircleFAButton iconName={iconName} />;
  }

  let imagePart;
  if (imageFileName) {
    imagePart = <Image className="mx-auto circle rounded-circle" fileName={imageFileName} />;
  }

  return (
    <>
      {iconPart}
      {imagePart}
      <h4 className="service-item-heading">{header}</h4>
      <h5 className="service-item-heading">{subHeader}</h5>
      <p className="text-muted">{content}</p>
    </>
  );
};

ServiceItem.propTypes = {
  iconName: PropTypes.string,
  imageFileName: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  content: PropTypes.string,
};

ServiceItem.defaultProps = {
  iconName: null,
  imageFileName: null,
  header: "",
  subHeader: "",
  content: "",
};

export default ServiceItem;
