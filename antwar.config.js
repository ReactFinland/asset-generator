module.exports = () => ({
  // conferenceId: "graphql-finland-2018", TODO
  // apiUrl: "", TODO
  // apiUrl: "http://localhost:3333/graphql",
  output: "build",
  // layout: () => require("./layouts/SiteBody").default,
  paths: {
    "/": () => require("./src/IndexPage.jsx").default,
    badges: () => require("./src/BadgesPage.jsx").default,
    schedule: () => require("./src/SchedulePage.jsx").default
  }
});
