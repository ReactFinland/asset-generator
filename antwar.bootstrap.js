/* eslint-disable no-console */
// Needed for JSX compilation to work
require("@babel/register");

// Needed by generators
require("@babel/polyfill");

const antwar = require("antwar");
const environment = process.argv[2];

/*console.log(
  require.resolve("./antwar.config"),
  require.resolve("./webpack.config")
);*/

antwar[environment]({
  environment,
  configurationPaths: {
    antwar: require.resolve("./antwar.config"),
    webpack: require.resolve("./webpack.config")
  }
})
  .then(() => {
    if (environment !== "build") {
      console.log("Surf to http://localhost:3000");
    }
  })
  .catch(err => {
    console.error(err);

    process.exit(1);
  });
