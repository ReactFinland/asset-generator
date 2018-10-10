// TODO: Find a better convention for this
if (IS_SERVER) {
  module.exports = require("./location.server");
} else {
  module.exports = require("./location.browser");
}
