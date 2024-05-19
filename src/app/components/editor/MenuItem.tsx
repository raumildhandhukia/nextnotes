import "./MenuItem.scss";
import "remixicon/fonts/remixicon.css";

import React from "react";
// import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";
// const remixiconUrl = "asdd";

interface Item {
  icon?: string;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
  type?: string;
}

const MenuItem: React.FC<Item> = ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
  >
    <i className={icon}></i>
  </button>
);

export default MenuItem;
