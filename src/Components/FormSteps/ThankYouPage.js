import React from "react";
import { ReactComponent as ThankYou } from "../../Assets/icon-thank-you.svg";
import styles from "./ThankYouPage.module.css";

const ThankYouPage = () => {
  return (
    <>
      <div className={styles.thankYouWrapper}>
        <ThankYou />
        <h1>Thank you!</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
    </>
  );
};

export default ThankYouPage;
