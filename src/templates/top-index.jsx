import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Navbar from "views/Navbar";
import Top from "views/Top";
import Footer from "views/Footer";
import * as Sections from "views/Sections";
import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import "utils/fixFontAwesome";
import breakDownAllNodes from "utils/breakDownAllNodes";
import fileNameToSectionName from "utils/fileNameToSectionName";
import getBaseUrl from "utils/getBaseUrl";

import "../style/main.scss";

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
    site {
      siteMetadata {
        title
        keywords
        description
        siteUrl
        lang
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: [{ fields: { directoryName: ASC } }, { fields: { fileName: ASC } }]
    ) {
      nodes {
        frontmatter {
          brand
          anchor
          clients {
            href
            imageFileName
          }
          content
          copyright
          header
          email
          embedMap
          adresse
          imageFileName
          imageLogo
          jumpToAnchor
          jumpToAnchorText
          menuText
          portfolios {
            content
            header
            subheader
            imageFileNameDetail
            imageFileName
          }
          privacyHref
          privacyText
          services {
            content
            header
            subHeader
            iconName
            imageFileName
          }
          social {
            facebook
            github
            linkedin
            medium
            twitter
          }
          subheader
          teamMember {
            header
            imageFileName
            social {
              facebook
              github
              linkedin
              medium
              twitter
            }
            subheader
          }
          telephone
          termsHref
          termsText
          title
          timeline {
            content
            header
            imageContent
            imageFileName
            subheader
          }
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`;

const IndexPage = ({ data, pageContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { title, keywords, description, siteUrl, lang: contentLang },
    },
    allMarkdownRemark: { nodes },
  } = data;

  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes);
  const pagePath = getBaseUrl(defaultLang, langKey);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: title,
    url: new URL(pagePath, siteUrl).toString(),
    image: new URL("/logo-inevia-signature-GA.jpg", siteUrl).toString(),
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Quai de la Gare",
      postalCode: "37270",
      addressLocality: "Montlouis-sur-Loire",
      addressCountry: "FR",
    },
    email: "inevia@inevia.pro",
    telephone: "+33247413371",
    areaServed: "Tours et la Touraine",
  };

  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    );
  }

  return (
    <>
      <SEO
        lang={contentLang}
        title="Inevia"
        keywords={keywords}
        description={description}
        pathname={pagePath}
        image="/logo-inevia-signature-GA.jpg"
        schemaMarkup={organizationSchema}
      />
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
      />
      <Top frontmatter={topNode.frontmatter} />
      {
        // dynamically import sections
        sectionsNodes.map(({ frontmatter, fields: { fileName } }, ind) => {
          const sectionComponentName = fileNameToSectionName(fileName);
          const SectionComponent = Sections[sectionComponentName];

          return SectionComponent ? (
            <SectionComponent
              key={sectionComponentName}
              className={ind % 2 === 1 ? "bg-light" : null}
              frontmatter={frontmatter}
            />
          ) : null;
        })
      }
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

IndexPage.defaultProps = {
  pageContext: {
    langKey: "en",
    defaultLang: "en",
    langTextMap: {},
  },
};

export default IndexPage;
