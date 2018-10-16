/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { endsWith, trimStart, upperFirst } = require("lodash");
const parse = require("csv-parse/lib/sync");

const tickets = loadCSV(path.join(__dirname, "tickets.csv"));

const typeDefs = `
type Query {
  tickets: [Ticket!]
}

type Ticket {
  firstName: String!
  lastName: String!
  company: String
  type: String!
  twitter: String
}
`;

const resolvers = {
  Query: {
    tickets: () => tickets
  }
};

function loadCSV(csvPath) {
  if (fs.statSync(csvPath)) {
    return convertData(
      parse(fs.readFileSync(csvPath), {
        columns: true,
        skip_empty_lines: true
      })
    );
  }

  return [];
}

function convertData(tickets) {
  return tickets.filter(t => !t["Void Status"]).map(i => ({
    firstName: getName(i["Ticket First Name"] || i["First Name"]),
    lastName: getName(i["Ticket Last Name"] || i["Last Name"]),
    company:
      i["Ticket Company Name"] &&
      (!i["Ticket Full Name"].includes(i["Ticket Company Name"]) &&
        !i["Ticket Company Name"].includes(i["Ticket Full Name"]))
        ? i["Ticket Company Name"]
        : null, // Remove company if it's same as the name
    type: getType(i["Ticket"] || i["Ticket Type"], i["Email"]),
    twitter: getTwitter(i["Twitter"] || i["What's your Twitter handle?"]) || ""
  }));
}

function getType(type, email) {
  if (isSponsor(email)) {
    return "sponsor";
  }

  switch (type) {
    case "Organizer": {
      return "organizer";
    }
    case "Volunteer": {
      return "volunteer";
    }
    case "Speaker": {
      return "speaker";
    }
    default:
      return "attendee";
  }
}

function getName(name) {
  return upperFirst(name);
}
function getTwitter(twitter) {
  return trimStart(twitter, "'@");
}
function isSponsor(email) {
  return ["almamedia.fi", "codento.com"].some(pattern =>
    endsWith(email, pattern)
  );
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
