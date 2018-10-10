import React from "react";

const Contacts = ({ items = [], render, renderProps = {} }) => (
  <>
    {items.map((contact, key) =>
      React.createElement(render, {
        ...contact,
        ...renderProps,
        key
      })
    )}
  </>
);

export default Contacts;
