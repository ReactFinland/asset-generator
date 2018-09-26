module.exports = () => ({
  output: "build",
  // layout: () => require("./layouts/SiteBody").default,
  paths: {
    "/": () => require("./src/Badges.jsx").default
  }
});
