/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({
  lang,
  description,
  meta,
  keywords,
  title,
  pathname,
  image,
  robots,
  schemaMarkup,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
          lang
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const metaLang = lang || site.siteMetadata.lang;
  const normalizedPath = pathname ? (pathname.startsWith("/") ? pathname : `/${pathname}`) : "/";
  const canonical = new URL(normalizedPath, site.siteMetadata.siteUrl).toString();
  const socialImage = image || site.siteMetadata.image;
  const imageUrl = socialImage ? new URL(socialImage, site.siteMetadata.siteUrl).toString() : null;
  const fullTitle =
    title === site.siteMetadata.title ? title : `${title} | ${site.siteMetadata.title}`;
  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:locale`,
      content: metaLang === "fr" ? "fr_FR" : metaLang,
    },
    {
      property: `og:site_name`,
      content: site.siteMetadata.title,
    },
    {
      property: `og:title`,
      content: fullTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:url`,
      content: canonical,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: fullTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    imageUrl
      ? {
          property: `og:image`,
          content: imageUrl,
        }
      : null,
    imageUrl
      ? {
          name: `twitter:image`,
          content: imageUrl,
        }
      : null,
  ]
    .filter(Boolean)
    .concat(
      keywords.length > 0
        ? {
            name: `keywords`,
            content: keywords.join(`, `),
          }
        : [],
    )
    .concat(meta);

  return (
    <Helmet
      htmlAttributes={{
        lang: metaLang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metaTags}
    >
      <link rel="canonical" href={canonical} />
      {robots ? <meta name="robots" content={robots} /> : null}
      {schemaMarkup ? (
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      ) : null}
    </Helmet>
  );
};

SEO.propTypes = {
  lang: PropTypes.string,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  image: PropTypes.string,
  robots: PropTypes.string,
  schemaMarkup: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

SEO.defaultProps = {
  lang: "fr",
  meta: [],
  keywords: [],
  description: "",
  pathname: "/",
  image: null,
  robots: null,
  schemaMarkup: null,
};

export default SEO;
