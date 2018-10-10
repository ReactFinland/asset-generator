import connect from "./connect";
import Badges from "../components/Badges.jsx";

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
