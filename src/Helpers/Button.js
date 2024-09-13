import React from "react";
import styles from "./Button.module.css";

const Button = ({ buttonInfo, id, ...props }) => {
  return (
    <button id={id} className={styles.button} {...props}>
      {buttonInfo}
    </button>
  );
};

export default Button;
