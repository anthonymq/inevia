const path = require("path");
const getBaseUrl = require("./src/utils/getBaseUrl");
const { defaultLang, langTextMap = {} } = require("./config/site");

function getMarkdownFileInfo(fileAbsolutePath) {
  const parsedPath = path.parse(fileAbsolutePath);
  const parts = parsedPath.name.split(".");
  const langKey = parts.length > 1 ? parts.pop() : defaultLang;
  const fileName = parts.join(".") || parsedPath.name;

  return {
    fileName,
    langKey,
    directoryName: path.basename(parsedPath.dir),
  };
}

/**
 * add fileName to node for markdown files
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { fileName, langKey, directoryName } = getMarkdownFileInfo(node.fileAbsolutePath);

    createNodeField({
      node,
      name: "fileName",
      value: fileName,
    });

    createNodeField({
      node,
      name: "langKey",
      value: langKey,
    });

    createNodeField({
      node,
      name: "directoryName",
      value: directoryName,
    });
  }
};

/**
 * define nullable items
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    `type Frontmatter {
      anchor: String
      jumpToAnchor: String
      jumpToAnchorText: String
      social: Social
      services: [Service]
      portfolios: [Portfolio]
      clients: [Client]
      timeline: [TimelineItem]
      teamMember: [TeamMember]
    }`,
    `type Portfolio {
      imageFileName: String
      imageFileNameDetail: String
      header: String
      subheader: String
      content: String
    }`,
    `type Client {
      href: String
      imageFileName: String
    }`,
    `type TeamMember {
      header: String
      imageFileName: String
      subheader: String
      social: Social
    }`,
    `type Service {
      iconName: String
      imageFileName: String
      header: String
      subHeader: String
      content: String
    }`,
    `type TimelineItem {
      content: String
      header: String
      imageContent: String
      imageFileName: String
      subheader: String
    }`,
    `
    type Social {
      twitter: String
      facebook: String
      linkedin: String
      medium: String
      github: String
    }
    `,
  ];

  createTypes(typeDefs);
};

/**
 * generate i18n top pages
 */
exports.createPages = ({ graphql, actions: { createPage } }) => {
  const topIndex = path.resolve("./src/templates/top-index.jsx");

  return graphql(`
    {
      allMarkdownRemark {
        distinct(field: { fields: { langKey: SELECT } })
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      throw errors;
    }

    data.allMarkdownRemark.distinct.forEach((langKey) => {
      createPage({
        path: getBaseUrl(defaultLang, langKey),
        component: topIndex,
        context: {
          langKey,
          defaultLang,
          langTextMap,
        },
      });
    });

    return null;
  });
};
