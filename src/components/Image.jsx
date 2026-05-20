import React from "react";
import PropTypes from "prop-types";

import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Image = ({ fileName, alt, ...restProps }) => {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      images: allFile(filter: { extension: { regex: "/(jpg|jpeg|png|webp|avif|gif)/i" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1920, quality: 90)
          }
        }
      }
    }
  `);

  const imageNode = data.images.nodes.find((node) => node.relativePath.includes(fileName));
  const image = getImage(imageNode?.childImageSharp);

  if (!image) {
    return null;
  }

  return <GatsbyImage alt={alt || ""} image={image} {...restProps} />;
};

Image.propTypes = {
  fileName: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Image.defaultProps = {
  alt: null,
};

export default Image;
