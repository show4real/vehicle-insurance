import React from "react";

const Slider = ({ options, value, setValue }) => {
  function handleChange({ target }) {
    if (target.checked) {
      setValue([...value, target.value]);
    } else {
      setValue(value.filter((cor) => cor !== target.value));
    }
  }

  return (
    <>
      {options.map((option) => (
        <label className="switch" htmlFor="toggle-button" key={option}>
          <input
            type="checkbox"
            value={option}
            checked={value.includes(option)}
            onChange={handleChange}
            id="toggle-button"
            name="toggle-button"
          />
          <span className="slider"></span>
        </label>
      ))}
    </>
  );
};
export default Slider;
