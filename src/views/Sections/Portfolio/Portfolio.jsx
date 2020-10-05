import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row, Col, Button } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PortfolioItem from "components/PortfolioItem";
import PageSection from "components/PageSection";
import Icon from "components/Icon";
import "./Portfolio.scss";
import rail from "./inevia-references-rail-tramway.pdf"
import vrd from "./inevia-references-vrd.pdf"

const Portfolio = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter;

  return (
    <PageSection className={clsx("portfolio-section", className)} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        {portfolios.map(
          ({ content, header, imageFileName, imageFileNameDetail, subheader }) => (
            <PortfolioItem
              key={header}
              imageFileName={imageFileName}
              header={header}
              subheader={subheader}
              content={content}
              imageFileNameDetail={imageFileNameDetail}
            />
          ),
        )}
       
      </Row>
      <Row className="text-center">
        <Col>
        <Button variant="outline-dark" href={rail}><Icon iconName="DownloadIcon" /> Télécharger nos références Rail et Tramway</Button>
        </Col>
        <Col><Button variant="outline-dark" href={vrd}><Icon iconName="DownloadIcon" /> Télécharger nos références VRD</Button></Col>
      </Row>
    </PageSection>
  );
};

Portfolio.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Portfolio.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Portfolio;
