import "@babel/polyfill"; // Needed for interactive bit to work
import React from "react";
import { chunk } from "lodash";
import styles from "./css/badges.scss";
import BadgeFront from "./BadgeFront.jsx";
import SplitPage from "./SplitPage.jsx";

// TODO: Add a toggle for this
//import BadgeBack from "./BadgeBack.jsx";

function getBadgeData(tickets, badgesPerPage) {
  const ret = chunk(tickets, badgesPerPage)
    .concat(Array(10).fill(getEmptyData("organizer")))
    .concat(Array(20).fill(getEmptyData("sponsor")))
    .concat(Array(30).fill(getEmptyData("attendee")));

  // Ensure all pages are filled with badges
  return ret.concat(
    Array(badgesPerPage - (ret.length % badgesPerPage)).fill(
      getEmptyData("attendee")
    )
  );
}

function getEmptyData(type) {
  return {
    firstName: null,
    lastName: null,
    company: null,
    type,
    twitter: null
  };
}

const Badges = ({ tickets }) => (
  <section>
    {tickets.length > 0 ? (
      <div className={styles.grid}>
        {getBadgeData(tickets, 4).map((pageTickets, idx) => (
          <SplitPage tickets={pageTickets} key={idx} />
        ))}
      </div>
    ) : (
      <div className={styles.dummyBadges}>
        <BadgeFront
          type="Attendee"
          firstName="John"
          lastName="Longsurname-Anotherlongone"
          twitter="johndoe"
          company="John Doe Enterprises"
          username="johnno"
          password="swordfish"
          type="speaker"
        />
        <BadgeFront
          type="Attendee"
          firstName="John"
          lastName="Doe"
          twitter="johndoe"
          company="John Doe Enterprises"
          username="johnno"
          password="swordfish"
          type="organizer"
        />
        <BadgeFront
          type="Attendee"
          firstName="John"
          lastName="Doe"
          twitter="johndoe"
          company="John Doe Enterprises"
          username="johnno"
          password="swordfish"
          type="attendee"
        />
        <BadgeFront
          type="Attendee"
          firstName="John"
          lastName="Doe"
          twitter="johndoe"
          company="John Doe Enterprises"
          username="johnno"
          password="swordfish"
          type="sponsor"
        />
      </div>
    )}
  </section>
);

export default Badges;
