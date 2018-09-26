const path = require("path");

module.exports = () => ({
  stats: "minimal",
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js(x)$/,
        use: "babel-loader",
        include: [path.join(__dirname, "src")]
      },
      {
        test: /\.woff(2)?|\.ttf$|\.eot$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.(md|txt)$/,
        use: "raw-loader"
      }
    ]
  }
});
