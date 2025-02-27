import React from "react";

const DisplayScreen = ({
  rounds,
  nsPair,
  ewPair,
  SelectedBoard,
  selectedNumber,
  selectedSuit,
  selectedSuitName,
  selectedDoubling,
  direction,
  displayResult,
}) => {
  return (
    <div className="display-screen">
      <div>ROUND : {rounds}</div>
      <div>N/S PAIR : {nsPair}</div>
      <div>E/W PAIR : {ewPair}</div>
      <div>BOARD : {SelectedBoard}</div>
      <div>
        CONTRACT : {selectedNumber?.[0]}{" "}
        {selectedSuit === "NT" ? (
          <span style={{ fontWeight: "bold" }}>NT</span>
        ) : (
          selectedSuit && (
            <img src={selectedSuit} style={{ height: 20, width: 20 }} alt="suit" />
          )
        )}
        {selectedDoubling && (
          <span
            style={{
              color: selectedDoubling === "X" ? "red" : "blue",
              fontWeight: "bold",
            }}
          >
            {selectedDoubling}
          </span>
        )}
      </div>
      <div>DIRECTION : {direction}</div>
      <div>RESULT : {displayResult}</div>
    </div>
  );
};

export default DisplayScreen;