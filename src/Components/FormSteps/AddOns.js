import React from "react";
import FormHeader from "./FormHeader";
import styles from "./AddOns.module.css";
import Checkbox from "../../Helpers/Checkbox";
import { GlobalContext } from "../../Hooks/GlobalContext";
import Button from "../../Helpers/Button";

export const options = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    pricePerMonth: 1,
    pricePerYear: 10,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    pricePerMonth: 2,
    pricePerYear: 20,
  },
  {
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    pricePerMonth: 2,
    pricePerYear: 20,
  },
];

const AddOns = () => {
  const { addOns, setAddOns, step, setStep, formData } =
    React.useContext(GlobalContext);

  return (
    <>
      <FormHeader
        title="Pick add-ons"
        info="Add-ons help enhance your gaming experience."
      />
      <Checkbox options={options} value={addOns} setValue={setAddOns} />
      {formData.name}
      <div className={styles.flexParent}>
        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => setStep(step - 1)}
            id="back"
            buttonInfo="Go Back"
          />
          <Button
            onClick={() => {
              setStep(step + 1);
            }}
            id="next"
            buttonInfo="Next Step"
          />
        </div>
      </div>
    </>
  );
};

export default AddOns;
