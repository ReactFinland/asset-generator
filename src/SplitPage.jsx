import React from "react";
import { flatten, chunk } from "lodash";
import BadgeFront from "./BadgeFront.jsx";
import styles from "./css/badges.scss";

// To render badges from 2 sides we need to change the order of them on pages
const SplitPage = ({ tickets = [] }) => {
  const pairs = chunk(tickets, 2);
  const reverse = flatten(pairs.map(pair => [pair[1], pair[0]]));

  return (
    <div>
      <section className={"sheet " + styles.page}>
        {tickets.map((ticket, idx) => (
          <BadgeFront {...ticket} key={"front-" + idx} />
        ))}
      </section>
      <section className={"sheet " + styles.page}>
        {reverse.map((ticket, idx) => (
          <BadgeFront {...ticket} key={"back-" + idx} />
        ))}
      </section>
    </div>
  );
};

export default SplitPage;
