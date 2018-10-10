import connect from "./connect";
import Badges from "./Badges.jsx";

export default connect(
  `
{
  tickets {
    firstName
    lastName
    company
    type
    twitter
  }
}
`,
  {
    apiUrl: "http://localhost:4000"
  }
)(Badges);
