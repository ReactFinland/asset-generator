import React from "react";
import { chunk } from "lodash";
import styles from "./badges.scss";
import BadgeFront from "./BadgeFront.jsx";
import SplitPage from "./SplitPage.jsx";

// TODO: Add a toggle for this
//import BadgeBack from "./BadgeBack.jsx";

function getBadgeData(tickets, badgesPerPage) {
  let ret = tickets
    .concat(Array(10).fill(getEmptyData("organizer")))
    .concat(Array(15).fill(getEmptyData("sponsor")))
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

const badgesPerPage = 4;
const Badges = ({ tickets }) => (
  <section>
    {tickets && tickets.length > 0 ? (
      <div className={styles.grid}>
        {chunk(getBadgeData(tickets, badgesPerPage), badgesPerPage).map(
          (pageTickets, idx) => (
            <SplitPage tickets={pageTickets} key={idx} />
          )
        )}
      </div>
    ) : (
      <div className={styles.dummyBadges}>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
      </div>
    )}
  </section>
);

export default Badges;
