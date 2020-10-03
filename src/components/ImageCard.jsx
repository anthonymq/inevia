import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Container, Card, Row, Col } from "react-bootstrap";
import Image from "components/Image";
import "./ImageCard.scss";

const ImageCard = ({ className, imageFileName, imageLogo, imageAlt, header, subheader, extraInfo }) => {
  return (
    <Card className={clsx("image-card bg-dark text-white text-center", className)}>
      <Image className="image" fileName={imageFileName} alt={imageAlt || header || subheader} />
      <Card.ImgOverlay className="no-padding">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="12" className="intro-heading" >
            <Image className="logo" fileName={imageLogo} />
            </Col>
          </Row>
          <div className="intro-text">
            {subheader}
            <div className="text-uppercase">
            <div dangerouslySetInnerHTML={{ __html: header }} />
            </div>
          </div>
          {extraInfo}
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  imageFileName: PropTypes.string,
  imageLogo: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  extraInfo: PropTypes.any,
};

ImageCard.defaultProps = {
  className: null,
  imageFileName: null,
  imageLogo: null,
  imageAlt: null,
  header: "",
  subheader: "",
  extraInfo: null,
};

export default ImageCard;
