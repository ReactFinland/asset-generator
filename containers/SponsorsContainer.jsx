import connect from "./connect";
import Sponsors from "../components/Sponsors.jsx";

const sponsorFragment = `
  fragment SponsorFragment on Contact {
    name
    social {
      homepage
    }
    about
    image {
      url
    }
  }
`;

// TODO: Implement a sponsor query to the root
export default connect(
  `
  query PageQuery($conferenceId: ID!) {
    conference(id: $conferenceId) {
      goldSponsors {
        ...SponsorFragment
      }
      silverSponsors {
        ...SponsorFragment
      }
      bronzeSponsors {
        ...SponsorFragment
      }
    }
  }

  ${sponsorFragment}
`,
  {
    apiUrl: "https://api.react-finland.fi/graphql"
  }
)(Sponsors);
