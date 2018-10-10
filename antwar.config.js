module.exports = () => ({
  // conferenceId: "graphql-finland-2018", TODO
  // apiUrl: "", TODO
  // apiUrl: "http://localhost:3333/graphql",
  output: "build",
  // layout: () => require("./layouts/SiteBody").default,
  paths: {
    "/": () => require("./pages/IndexPage.jsx").default,
    badges: () => require("./pages/BadgesPage.jsx").default,
    schedule: () => require("./pages/SchedulePage.jsx").default,
    title: () => require("./pages/TitlePage.jsx").default
  }
});
