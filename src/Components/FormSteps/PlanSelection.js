import React, { useState, useEffect } from "react";
import FormHeader from "./FormHeader";
import styles from "./PlanSelection.module.css";
import { GlobalContext } from "../../Hooks/GlobalContext";
import Button from "../../Helpers/Button";

const PlanSelection = () => {
  const { formData, setFormData, setStep, step } =
    React.useContext(GlobalContext);

  const [useVin, setUseVin] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors

  const [vehicleDetails, setVehicleDetails] = useState({
    year: formData.vehicleDetails?.year || "",
    make: formData.vehicleDetails?.make || "",
    model: formData.vehicleDetails?.model || "",
    submodel: formData.vehicleDetails?.submodel || "",
    vin: formData.vehicleDetails?.vin || "",
  });

  useEffect(() => {
    if (formData.vehicleDetails?.vin) {
      setUseVin(true);
    }
  }, [formData.vehicleDetails]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setVehicleDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // Clear errors when the input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateFields = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!useVin) {
      if (!vehicleDetails.year) {
        formIsValid = false;
        newErrors.year = "Year is required";
      }
      if (!vehicleDetails.make) {
        formIsValid = false;
        newErrors.make = "Make is required";
      }
      if (!vehicleDetails.model) {
        formIsValid = false;
        newErrors.model = "Model is required";
      }
    } else if (!vehicleDetails.vin) {
      formIsValid = false;
      newErrors.vin = "VIN is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      setFormData({
        ...formData,
        vehicleDetails: useVin
          ? { vin: vehicleDetails.vin }
          : {
              year: vehicleDetails.year,
              make: vehicleDetails.make,
              model: vehicleDetails.model,
              submodel: vehicleDetails.submodel,
            },
      });

      setStep(step + 1);
    }
  };

  return (
    <>
      <FormHeader
        title="Add Vehicle Details"
        info="You have the option of using VIN or filling in the vehicle's Make, Model, Year"
      />

      <form onSubmit={handleSubmit}>
        <div className={styles.toggleWrapper}>
          <div className={styles.switchContainer}>
            <span className={styles.switchLabel}>Make/Model/Year</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={useVin}
                onChange={() => setUseVin(!useVin)}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.switchLabel}>VIN</span>
          </div>
        </div>

        {!useVin && (
          <div className={styles.formWrapper}>
            <div className={styles.formGroup}>
              <label htmlFor="year">Year</label>
              <select
                id="year"
                value={vehicleDetails.year}
                onChange={handleInputChange}
                className={errors.year ? styles.errorField : ""}
              >
                <option value="">Select Year</option>
                {[...Array(30)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.year && (
                <span className={styles.errorMessage}>{errors.year}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="make">Make</label>
              <input
                type="text"
                id="make"
                value={vehicleDetails.make}
                onChange={handleInputChange}
                placeholder="Enter Make"
                className={errors.make ? styles.errorField : ""}
              />
              {errors.make && (
                <span className={styles.errorMessage}>{errors.make}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                value={vehicleDetails.model}
                onChange={handleInputChange}
                placeholder="Enter Model"
                className={errors.model ? styles.errorField : ""}
              />
              {errors.model && (
                <span className={styles.errorMessage}>{errors.model}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="submodel">Submodel</label>
              <input
                type="text"
                id="submodel"
                value={vehicleDetails.submodel}
                onChange={handleInputChange}
                placeholder="Enter Submodel"
              />
            </div>
          </div>
        )}

        {useVin && (
          <div className={styles.formGroup}>
            <label htmlFor="vin">VIN</label>
            <input
              type="text"
              id="vin"
              value={vehicleDetails.vin}
              onChange={handleInputChange}
              placeholder="Enter VIN"
              className={errors.vin ? styles.errorField : ""}
            />
            {errors.vin && (
              <span className={styles.errorMessage}>{errors.vin}</span>
            )}
          </div>
        )}

        <div className={styles.flexParent}>
          <div
            className={styles.buttonWrapper}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => setStep(step - 1)}
              id="back"
              buttonInfo="Go Back"
              style={{ backgroundColor: "gray", color: "white" }}
            />
            <Button type="submit" id="next" buttonInfo="Next Step" />
          </div>
        </div>
      </form>
    </>
  );
};

export default PlanSelection;
