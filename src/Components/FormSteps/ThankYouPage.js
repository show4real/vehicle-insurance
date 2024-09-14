import React from "react";
import { ReactComponent as ThankYou } from "../../Assets/icon-thank-you.svg";
import styles from "./ThankYouPage.module.css";

const ThankYouPage = () => {
  return (
    <>
      <div className={styles.thankYouWrapper}>
        <ThankYou />
        <div>
          <h1>Thanks for Requesting for Quote</h1>
          <p>Your Quote will be sent to you via Email</p>
          <p>
            <a href="/">click here to continue</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
