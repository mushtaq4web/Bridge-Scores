import React from "react";

const AlertComponent = ({ alertMessage, alertType }) => {
  if (!alertMessage) return null;

  return (
    <div
      className="alert"
      style={{
        backgroundColor: alertType === "success" ? "#40e25b" : "#eb4956",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px 0",
      }}
    >
      {alertMessage}
    </div>
  );
};

export default AlertComponent;