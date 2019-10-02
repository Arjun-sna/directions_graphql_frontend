import React from "react";

import styles from "./styles.scss";

export const MenuButton = ({ children }) => (
  <div className={styles["menu-btn"]}>{children}</div>
);

export const MenuContent = ({ children }) => (
  <div className={styles["menu-content"]}>{children}</div>
);

export const Menu = ({ children }) => (
  <div className={styles["menu-container"]}>{children}</div>
);
