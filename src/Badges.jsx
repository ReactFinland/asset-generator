import "@babel/polyfill";

import React from "react";
import Papa from "papaparse";
import Dropzone from "react-dropzone";
import { flatten, chunk } from "lodash";

import styles from "./css/badges.scss";
import Badge from "./Badge.jsx";
import DummyBadge from "./DummyBadge.jsx";

const emptyBadges = 10;
const emptyOrgBadges = 5;
const badgesPerPage = 4; // Should be even!

const getEmptyData = type => ({
  firstName: null,
  lastName: null,
  company: null,
  type,
  twitter: null
});

const getType = type => {
  switch (type) {
    case "Organizer": {
      return "Organizer";
    }
    case "Volunteer": {
      return "Volunteer";
    }
    default:
      return "Attendee";
  }
};

const convertData = (tickets, passwords) => {
  const validTickets = tickets.filter(t => !t["Void Status"]);
  // Ensure all pages are filled with badges
  const emptyBadgesFill =
    badgesPerPage -
    ((validTickets.length + emptyBadges + emptyOrgBadges) % badgesPerPage);
  return validTickets
    .map(i => ({
      firstName: i["Ticket First Name"],
      lastName: i["Ticket Last Name"],
      company:
        i["Ticket Company Name"] &&
        (!i["Ticket Full Name"].includes(i["Ticket Company Name"]) &&
          !i["Ticket Company Name"].includes(i["Ticket Full Name"]))
          ? i["Ticket Company Name"]
          : null, // Remove company if it's same as the name
      type: getType(i["Ticket"]),
      twitter: i["Tags"] ? `@${i["Tags"]}` : null
    }))
    .concat(Array(emptyOrgBadges).fill(getEmptyData("Volunteer")))
    .concat(
      Array(emptyBadges + emptyBadgesFill).fill(getEmptyData("Attendee"))
    );
  /*.map((ticket, idx) => ({
      ...ticket,
      ...passwords[idx]
    }))*/
};

// To render badges from 2 sides we need to change the order of them on pages
const SplitPage = ({ tickets }) => {
  const pairs = chunk(tickets, 2);
  const reverse = flatten(pairs.map(pair => [pair[1], pair[0]]));

  return (
    <div>
      <section className={"sheet " + styles.page}>
        {tickets.map((ticket, idx) => (
          <Badge {...ticket} key={"front-" + idx} />
        ))}
      </section>
      <section className={"sheet " + styles.page}>
        {reverse.map((ticket, idx) => (
          <Badge {...ticket} key={"back-" + idx} />
        ))}
      </section>
    </div>
  );
};

const readFileContents = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      resolve(reader.result);
    };
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.readAsText(file, "utf-8");
  });
};

class Badges extends React.Component {
  state = {
    tickets: [],
    passwords: []
  };

  handleTicketsDrop = async acceptedFiles => {
    const csv = acceptedFiles[0];
    const content = await readFileContents(csv);
    const { data: tickets } = await Papa.parse(content, { header: true });
    this.setState({
      tickets
    });
  };

  handlePasswordsDrop = async acceptedFiles => {
    const csv = acceptedFiles[0];
    const content = await readFileContents(csv);
    const { data: passwords } = Papa.parse(content, { header: true });
    this.setState({
      passwords
    });
  };

  renderBadges(tickets, passwords) {
    const all = convertData(tickets, passwords);
    const pages = chunk(all, badgesPerPage);
    return (
      <div className={styles.grid}>
        {pages.map((pageTickets, idx) => (
          <SplitPage tickets={pageTickets} key={idx} />
        ))}
      </div>
    );
  }

  render() {
    const { tickets, passwords } = this.state;
    return (
      <section>
        {(tickets.length === 0 || passwords.length === 0) && (
          <div className="container container_centered">
            <h2>ReasonConf Badges Generator</h2>
            <Dropzone
              name="tickets"
              multiple={false}
              disablePreview
              onDrop={this.handleTicketsDrop}
              className={styles.dropzone}
              activeClassName={styles.dropzoneHover}
            >
              {tickets.length === 0 ? (
                <p>Drop ti.to CSV file here...</p>
              ) : (
                <p>Found {tickets.length} tickets!</p>
              )}
            </Dropzone>
            {/*
            Commented out for now since passwords may be added later.
            <Dropzone
              name="passwords"
              multiple={false}
              disablePreview
              onDrop={this.handlePasswordsDrop}
              className={styles.dropzone}
              activeClassName={styles.dropzoneHover}
            >
              {passwords.length === 0 ? (
                <p>Drop passwords CSV file here...</p>
              ) : (
                <p>Found {passwords.length} passwords!</p>
              )}
            </Dropzone>
              */}
          </div>
        )}
        {tickets.length > 0 ? this.renderBadges(tickets, []) : <DummyBadge />}
      </section>
    );
  }
}

export default Badges;
