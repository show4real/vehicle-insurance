import React, { useState } from "react";
import FormHeader from "./FormHeader";
import styles from "./PersonalInfo.module.css";
import Input from "../../Helpers/Input";
import Button from "../../Helpers/Button";
import useMobile from "../../Hooks/useMobile";
import { GlobalContext } from "../../Hooks/GlobalContext";
import useForm from "../../Hooks/useForm";

const PersonalInfo = () => {
  const { step, setStep, formData, setFormData } =
    React.useContext(GlobalContext);
  const { errors, validate } = useForm();
  const mobile = useMobile("(max-width:940px)");

  const [movingViolations, setMovingViolations] = useState(
    formData.movingViolations || "No"
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      // Save marital status and violations to form data before submitting
      setFormData((prevData) => ({
        ...prevData,
        movingViolations,
      }));
      setStep(step + 1);
    }
  }

  return (
    <>
      <FormHeader
        title="Personal Info"
        info="Please provide your name, email address, and phone number."
      />
      <form
        className={mobile ? `${styles.form} ${styles.mobile}` : styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="e.g. Martin Scorsese"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="Email Address"
          placeholder="e.g. scorsesemarty@lorem.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="number"
          name="phone"
          id="phone"
          label="Phone Number"
          placeholder="e.g. +1 234 567 890"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <div className={styles.formGroup} style={{ marginTop: 20 }}>
          <label>
            Has this driver had any moving violations in the past five years?
          </label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="movingViolations"
                value="Yes"
                checked={movingViolations === "Yes"}
                onChange={() => setMovingViolations("Yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="movingViolations"
                value="No"
                checked={movingViolations === "No"}
                onChange={() => setMovingViolations("No")}
              />
              No
            </label>
          </div>
        </div>
        <div className={styles.flexParent}>
          <div className={styles.buttonWrapper}>
            <Button id="next" buttonInfo="Next Step" />
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
