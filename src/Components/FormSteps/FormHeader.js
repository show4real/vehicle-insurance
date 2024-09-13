import React from "react";

const FormHeader = ({ title, info }) => {
  return (
    <div>
      <h1 className="formTitle">{title}</h1>
      <p className="formInfo">{info}</p>
    </div>
  );
};

export default FormHeader;
