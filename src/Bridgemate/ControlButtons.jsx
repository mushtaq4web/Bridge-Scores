import React from "react";

const ControlButtons = ({ handleSendScore, handleCancelAll }) => {
  return (
    <div>
      <button className="score-button" onClick={handleSendScore}>
        Send Score
      </button>
      <div className="cancel-button" onClick={handleCancelAll}>
        Clear All
      </div>
    </div>
  );
};

export default ControlButtons;