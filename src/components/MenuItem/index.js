import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatPrice } from "../../utils";
import css from "./MenuItem.module.css";

const MenuItem = ({
  id,
  imageUrl,
  name,
  price,
  description,
  rating,
  onClick,
  setRating,
  url
}) => (
  <li className={css.itemContainer}>
    <Link
      to={url}
      className={css.image}
      style={{
        color: "red",
        backgroundImage: `url(${imageUrl})`
      }}
      alt={name}
    />
    <div className={css.content}>
      <div className={css.itemHeader}>
        <h3 className={css.title}>{name}</h3>
        <p className={css.price}>{formatPrice(price)}</p>
      </div>
      <p className={css.text}>{description}</p>
      <p>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span
              key={idx}
              role="img"
              aria-label="star"
              onClick={() => setRating(id, idx)}
              className={`${css.star} ${
                idx <= rating ? css.rating : css.unrated
              }`}
            >
              ⭐
            </span>
          ))}
      </p>
      <button className={`button ${css.button}`} onClick={onClick}>
        Add To Order
      </button>
    </div>
  </li>
);

MenuItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  onClick: PropTypes.func,
  setRating: PropTypes.func
};

export default MenuItem;
