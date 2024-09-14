import React, { useState } from "react";
import FormHeader from "./FormHeader";
import { GlobalContext } from "../../Hooks/GlobalContext";
import styles from "./Summary.module.css";
import Button from "../../Helpers/Button";

const Summary = () => {
  const { step, setStep, formData } = React.useContext(GlobalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Function to handle form submission to API
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null); // Reset error state before submission

    try {
      const response = await fetch(
        "https://testapi.giantworkz.com/api/form/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send formData as JSON to the API
        }
      );

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Optionally, handle success case
      setStep(step + 1); // Move to the next step or show success page
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(error.message); // Display error message to the user
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <>
      <FormHeader
        title="Finishing up"
        info="Double check everything looks OK before confirming."
      />
      {console.log(formData)}
      <div className={styles.summaryWrapper} style={{ marginTop: 0 }}>
        {/* Displaying Personal Info */}
        <div className={styles.summaryItem}>
          <h3 className={styles.label}>Name</h3>
          <p className={styles.value}>{formData.name || "N/A"}</p>
        </div>
        <div className={styles.summaryItem}>
          <h3 className={styles.label}>Email Address</h3>
          <p className={styles.value}>{formData.email || "N/A"}</p>
        </div>
        <div className={styles.summaryItem}>
          <h3 className={styles.label}>Phone Number</h3>
          <p className={styles.value}>{formData.phone || "N/A"}</p>
        </div>

        <div
          className={styles.summaryItem}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h3 className={styles.label}>Covered By Auto Insurance</h3>
            <p className={styles.value}>{formData.coveredInsurance || "N/A"}</p>
          </div>
          <div>
            <h3 className={styles.label}>Moving Violations (last 5 years)</h3>
            <p className={styles.value}>{formData.movingViolations || "N/A"}</p>
          </div>
        </div>

        {/* Displaying Make/Model/Year or VIN */}
        {formData.vehicleDetails?.vin ? (
          <div className={styles.summaryItem}>
            <h3 className={styles.label}>Vehicle VIN</h3>
            <p className={styles.value}>
              {formData.vehicleDetails?.vin || "N/A"}
            </p>
          </div>
        ) : (
          <>
            <div
              className={styles.summaryItem}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h3 className={styles.label}>Vehicle Year</h3>
                <div className={styles.value}>
                  {formData.vehicleDetails?.year || "N/A"}
                </div>
              </div>
              <div>
                <h3 className={styles.label}>Vehicle Make</h3>
                <div className={styles.value}>
                  {formData.vehicleDetails?.make || "N/A"}
                </div>
              </div>
            </div>

            <div
              className={styles.summaryItem}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h3 className={styles.label}>Vehicle Model</h3>
                <div className={styles.value}>
                  {formData.vehicleDetails?.model || "N/A"}
                </div>
              </div>
              <div>
                <h3 className={styles.label}>Vehicle Submodel</h3>
                <div className={styles.value}>
                  {formData.vehicleDetails?.submodel || "N/A"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Error Message */}
      {submissionError && (
        <p className={styles.errorMessage}>Error: {submissionError}</p>
      )}

      <div className={styles.flexParent}>
        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => setStep(step - 1)}
            id="back"
            buttonInfo="Go Back"
          />
          <Button
            onClick={handleSubmit}
            id="next"
            buttonInfo={isSubmitting ? "Submitting..." : "Complete"}
            disabled={isSubmitting} // Disable the button while submitting
          />
        </div>
      </div>
    </>
  );
};

export default Summary;
