import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

import Menu from "../Menu";
import MenuItem from "../MenuItem";
import Order from "../Order";
import Inventory from "../Inventory";
import sampleData from "../../sample-data";

import css from "./App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      order: {}
    };
  }

  loadSampleData = () => {
    this.setState(state => ({
      stock: { ...state.stock, ...sampleData }
    }));
  };

  addNewItem = item => {
    this.setState(state => ({
      stock: { ...state.stock, [`item${Date.now()}`]: item }
    }));
  };

  addToOrder = key => {
    this.setState(state => ({
      order: { ...state.order, [key]: state.order[key] + 1 || 1 }
    }));
  };

  removeFromOrder = key => {
    this.setState(state => {
      const order = { ...state.order };
      if (!order[key] || order[key] < 2) {
        delete order[key];
      } else {
        order[key] = order[key] - 1;
      }
      return {
        order
      };
    });
  };

  setRating = (key, rating) => {
    this.setState(state => {
      return {
        stock: {
          ...state.stock,
          [key]: {
            ...state.stock[key],
            rating
          }
        }
      };
    });
  };

  deleteFromOrder = key => {
    this.setState(state => {
      const order = { ...state.order };
      delete order[key];
      return {
        order
      };
    });
  };

  render() {
    // We are storing the match handed down from the Route above
    const { match } = this.props;
    let place = "No Location";
    if (match) {
      place = match.params.place;
    }
    return (
      <div className={css.container}>
        <h1 className={css.headline}>My Smart Eatery</h1>
        <h2 className={css.location}>Store Location: {place}</h2>
        <Route
          path={`${match.path}/:item`}
          // We are using the render prop for Route, which means we hand it a function and receive the new props (match, history, state) from this sub-route
          render={renderProps => {
            const { item: itemKey } = renderProps.match.params;
            const menuItem = this.state.stock[itemKey];
            if (!menuItem) {
              return <Redirect to={match.url} />;
            }
            return (
              <>
                {/* We want to link to the old url, so we set Link to match.url */}
                <Link to={match.url}>
                  <span
                    role="img"
                    aria-label="home button"
                    className={css.homeButton}
                  >
                    🏠
                  </span>
                </Link>
                <MenuItem
                  id={itemKey}
                  onClick={() => this.addToOrder(itemKey)}
                  {...this.state.stock[itemKey]}
                  setRating={this.setRating}
                  // When we click the image in the description, we will go back home
                  url={match.url}
                />
              </>
            );
          }}
        />
        <div className={css.content}>
          <Route
            path={match.path}
            render={renderProps => (
              <>
                {/* We want to hand down the url from the sub-router, which captures the full url */}
                {/* try printing out the renderProps and the this.props to compare them */}
                <Menu
                  baseUrl={renderProps.match.url}
                  items={this.state.stock}
                  addToOrder={this.addToOrder}
                  setRating={this.setRating}
                />
                <div className={css.panel}>
                  <Order
                    order={this.state.order}
                    stock={this.state.stock}
                    addToOrder={this.addToOrder}
                    removeFromOrder={this.removeFromOrder}
                    deleteFromOrder={this.deleteFromOrder}
                  />
                  <Inventory
                    onLoadClick={this.loadSampleData}
                    onSubmit={this.addNewItem}
                  />
                </div>
              </>
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
