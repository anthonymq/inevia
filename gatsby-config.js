const path = require("path");
const {
  title,
  keywords,
  description,
  author,
  defaultLang,
  contentLang,
  trackingId,
  siteUrl,
  socialImage,
} = require("./config/site");

module.exports = {
  pathPrefix: `/inevia`,
  siteMetadata: {
    title,
    keywords,
    description,
    author,
    siteUrl,
    lang: contentLang,
    image: socialImage,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [trackingId],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: title,
        short_name: "Inevia",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#fed136",
        display: "minimal-ui",
        icon: "content/assets/logo-inevia-signature-GA.jpg",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404", "/404.html", "/dev-404-page", "/offline-plugin-app-shell-fallback"],
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/assets/images`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        additionalData: `@import "core.scss";`,
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/style")],
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          `Montserrat\:400,700`,
          `Kaushan+Script`,
          `Droid+Serif\:400, 700, 400italic, 700italic`,
        ],
        display: "swap",
      },
    },
  ],
};
