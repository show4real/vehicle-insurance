import React from "react";
import { GlobalContext } from "../Hooks/GlobalContext";
import styles from "./Forms.module.css";
import PersonalInfo from "./FormSteps/PersonalInfo";
import PlanSelection from "./FormSteps/PlanSelection";
// import AddOns from "./FormSteps/AddOns";
import Summary from "./FormSteps/Summary";
import ThankYouPage from "./FormSteps/ThankYouPage";
import useMobile from "../Hooks/useMobile";

const Form = () => {
  const { step } = React.useContext(GlobalContext);
  const mobile = useMobile("(max-width: 940px)");

  switch (step) {
    case 1:
      return (
        <section
          className={
            mobile
              ? `${styles.formWrapper} ${styles.mobile}`
              : styles.formWrapper
          }
        >
          <PersonalInfo />
        </section>
      );

    case 2:
      return (
        <section
          className={
            mobile
              ? `${styles.formWrapper} ${styles.mobile}`
              : styles.formWrapper
          }
        >
          <PlanSelection />
        </section>
      );

    // case 3:
    //   return (
    //     <section
    //       className={
    //         mobile
    //           ? `${styles.formWrapper} ${styles.mobile}`
    //           : styles.formWrapper
    //       }
    //     >
    //       <AddOns />
    //     </section>
    //   );

    case 3:
      return (
        <section
          className={
            mobile
              ? `${styles.formWrapper} ${styles.mobile}`
              : styles.formWrapper
          }
        >
          <Summary />
        </section>
      );

    case 4:
      return (
        <section
          className={
            mobile
              ? `${styles.formWrapper} ${styles.mobile}`
              : styles.formWrapper
          }
        >
          <ThankYouPage />
        </section>
      );

    default:
      break;
  }
};

export default Form;
