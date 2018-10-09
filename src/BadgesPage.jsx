import "@babel/polyfill";
import React from "react";
import Interactive from "antwar-interactive";
import Badges from "./Badges.jsx";

const BadgesPage = () => <Interactive id="src/Badges.jsx" component={Badges} />;

export default BadgesPage;
