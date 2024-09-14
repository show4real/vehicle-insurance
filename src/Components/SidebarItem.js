import React from "react";
import { GlobalContext } from "../Hooks/GlobalContext";
import useMobile from "../Hooks/useMobile";
import styles from "./SidebarItem.module.css";

const SidebarItem = ({ index, stepInfo }) => {
  const { step } = React.useContext(GlobalContext);
  const mobile = useMobile("(max-width: 940px)");

  function active(step, index) {
    if (step === index) return true;
  }
  const isActive = active(step, index);

  return (
    <div
      className={
        mobile ? `${styles.itemWrapper} ${styles.mobile}` : styles.itemWrapper
      }
      style={{
        marginTop: step === 1 ? "20px" : "0px",
      }}
    >
      <span
        className={isActive ? `${styles.index} ${styles.active}` : styles.index}
      >
        {index}
      </span>
      <div className={styles.stepWrapper}>
        <span>{mobile ? "" : `Step ${index}`}</span>
        <span>{mobile ? "" : stepInfo}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
