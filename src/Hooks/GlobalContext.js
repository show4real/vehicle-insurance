import React from "react";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [plan, setPlan] = React.useState("Arcade");
  const [duration, setDuration] = React.useState("");
  const [addOns, setAddOns] = React.useState([]);

  return (
    <GlobalContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData,
        duration,
        setDuration,
        plan,
        setPlan,
        addOns,
        setAddOns,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
