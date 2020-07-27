import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";
import Icon from "components/Icon";
import PageSection from "components/PageSection";
import Iframe from 'react-iframe';
import "./Contact.scss";

const Contact = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header, subheader, telephone, email, adresse, embedMap } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h2 className="mt-0">{header}</h2>
          <hr className="divider my-4" />
          <p className="text-muted mb-5">{subheader}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="ml-auto text-center mb-3">
          <Icon iconName="PhoneIcon" size="3x" className="text-muted" />
          <a className="d-block" href={`tel:${telephone}`}>
            {telephone}
          </a>
        </Col>
        <Col lg={4} className="mr-auto text-center mb-3">
          <Icon iconName="AtIcon" size="3x" className="text-muted" />
          <a className="d-block" href={`mailto:${email}`}>
            {email}
          </a>
        </Col>
        <Col lg={4} className="ml-auto text-center">
          <Icon iconName="EnvelopIcon" size="3x" className="text-muted" />
          <p className="d-block" dangerouslySetInnerHTML={{ __html: adresse }} />
        </Col>
      </Row>
      <div className="space" />
      <Row>
        <Col>
          <Iframe 
            url={embedMap}
            width="100%"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative" />
        </Col>
      </Row>
    </PageSection>
    // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.234265260762!2d0.694522215622924!3d47.38786187917069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd44aa1c70a39%3A0xe5a187ee4bb0bbd9!2s19%20Rue%20%C3%89douard%20Vaillant%2C%2037000%20Tours!5e0!3m2!1sfr!2sfr!4v1591948273294!5m2!1sfr!2sfr" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
  );
};

Contact.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Contact.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Contact;
