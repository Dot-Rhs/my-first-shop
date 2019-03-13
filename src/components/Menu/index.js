import React from "react";
import PropTypes from "prop-types";

import Heading from "../Heading";
import MenuItem from "../MenuItem";

import css from "./Menu.module.css";

const Menu = ({ items, addToOrder, setRating, baseUrl }) => (
  <div>
    <Heading>Menu</Heading>
    <ul className={css.list}>
      {Object.keys(items).map(key => (
        <MenuItem
          key={key}
          id={key}
          onClick={() => addToOrder(key)}
          {...items[key]}
          setRating={setRating}
          url={`${baseUrl}/${key}`}
        />
      ))}
    </ul>
  </div>
);

Menu.propTypes = {
  items: PropTypes.object,
  addToOrder: PropTypes.func,
  setRating: PropTypes.func
};

export default Menu;
