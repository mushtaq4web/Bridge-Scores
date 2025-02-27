import React from "react";

const ResultDisplay = ({
  showResult,
  result,
  rounds,
  nsPair,
  ewPair,
  SelectedBoard,
  selectedNumber,
  selectedSuitName,
  displayResult,
}) => {
  if (!showResult || !result) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "850px",
        top: "160px",
        transform: "translateX(-50%)",
        color: "black",
        padding: "10px",
      }}
    >
      <div>
        <strong>SCORE:</strong> {result}
      </div>
      {rounds && (
        <div>
          <strong>ROUND:</strong> {rounds}
        </div>
      )}
      {nsPair && (
        <div>
          <strong>N/S PAIR:</strong> {nsPair}
        </div>
      )}
      {ewPair && (
        <div>
          <strong>E/W PAIR:</strong> {ewPair}
        </div>
      )}
      {SelectedBoard && (
        <div>
          <strong>BOARD:</strong> {SelectedBoard}
        </div>
      )}
      {selectedNumber && selectedNumber[0] === "PASS" ? (
        <div>
          <strong>CONTRACT:</strong> PASS
        </div>
      ) : (
        <div>
          <strong>CONTRACT:</strong> {selectedNumber} {selectedSuitName}
        </div>
      )}
      {displayResult && (
        <div>
          <strong>RESULT:</strong> {displayResult}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;