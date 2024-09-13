import React from "react";
import { GlobalContext } from "./GlobalContext";

const useForm = () => {
  const { formData, setFormData } = React.useContext(GlobalContext);
  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};
    for (let [field, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field === "email") {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors[field] = "Invalid email address";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, handleChange, errors, validate };
};

export default useForm;
