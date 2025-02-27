import React from "react";


const ButtonGrid = ({
    getValuesOnButtonClick,
    handleCancelClick,
    handleOkClick,
    handlePassClick,
    handleDirectionClick,
    handleToggleClick,
    handleCalculate,
    activeButton,
    clubs, // Receive clubs image as prop
    diamonds, // Receive diamonds image as prop
    hearts, // Receive hearts image as prop
    spades, // Receive spades image as prop
    showResult,
}) => {
  return (
    <div className="button-grid">
              <button
                onClick={() => getValuesOnButtonClick("CLUB")}
                className="grid-button"
              >
                <center>
                  <img src={clubs} height={20} width={20} alt="" />
                </center>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("DIAMOND")}
                className="grid-button"
              >
                <center>
                  <img src={diamonds} height={20} width={20} alt="" />
                </center>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("HEART")}
                className="grid-button"
              >
                <center>
                  <img src={hearts} height={25} width={25} alt="" />
                </center>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("SPADE")}
                className="grid-button"
              >
                <center>
                  <img src={spades} height={20} width={20} alt="" />
                </center>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("NT")}
                value="NT"
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                NT
              </button>
              <button
                onClick={() => getValuesOnButtonClick("1")}
                value="1"
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                1
              </button>
              <button
                onClick={() => getValuesOnButtonClick("2")}
                value="2"
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                2
              </button>
              <button
                onClick={() => getValuesOnButtonClick("3")}
                value="3"
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                3
              </button>
              <button className="grid-button">
                <span>J</span>
              </button>
              <button className="grid-button">
                <span>Q</span>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("4")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                4
              </button>
              <button
                onClick={() => getValuesOnButtonClick("5")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                5
              </button>
              <button
                onClick={() => getValuesOnButtonClick("6")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                6
              </button>
              <button className="grid-button">
                <span>K</span>
              </button>
              <button className="grid-button">
                <span>A</span>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("7")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                7
              </button>
              <button
                onClick={() => getValuesOnButtonClick("8")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                8
              </button>
              <button
                onClick={() => getValuesOnButtonClick("9")}
                className="grid-button"
                style={{ fontWeight: "bold" }}
              >
                9
              </button>
              <button
                onClick={() => getValuesOnButtonClick("X")}
                className="grid-button"
                style={{ color: "red" }}
              >
                X
              </button>
              <button
                onClick={() => getValuesOnButtonClick("XX")}
                className="grid-button"
                style={{ color: "blue" }}
              >
                XX
              </button>
              <button
                className="grid-button"
                onClick={() => handleDirectionClick("North")}
              >
                <span>North</span>
              </button>
              <button
                onClick={() => getValuesOnButtonClick("0")}
                className="grid-button"
                style={{ fontWeight: "bold" }}>
                {/* <span style={{ fontSize: "11px" }}>1</span> */}
                <span>0</span>
              </button>
              <button
                className="grid-button"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => handleDirectionClick("East")}
              >
                <span>East</span>
              </button>
              <button onClick={() => handleCancelClick()} className="grid-button">
                CAN
              </button>
              <button onClick={() => handleOkClick()} className="grid-button">
                OK
              </button>
              <button
                className="grid-button"
                onClick={() => handleDirectionClick("South")}
              >
                <span>South</span>
              </button>
    
              <button
                className="grid-button"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => handlePassClick("PASS")}
              >
                <span
                  style={{
                    color: "green",
                    width: "100%",
                    fontSize: "20px",
                  }}
                >
                  PASS
                </span>
              </button>
              {showResult && result && (
                <div
                  style={{
                    position: "absolute",
                    left: "550px",
                    top: "-160px",
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
              )}
    
              <button
                className="grid-button"
                onClick={() => handleDirectionClick("West")}
              >
                <span>West</span>
              </button>
    
              <button
                className="grid-button"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => getValuesOnButtonClick("+")}
              >
                <span
                  style={{
                    color: "red",
                    width: "100%",
                    fontSize: "20px",
                  }}
                >
                  +
                </span>
              </button>
              <button
                className="grid-button"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => getValuesOnButtonClick("-")}
              >
                <span
                  style={{
                    color: "red",
                    width: "100%",
                    fontSize: "20px",
                  }}
                >
                  -
                </span>
              </button>
              <button
                onClick={() => handleToggleClick("green")}
                style={{
                  backgroundColor: activeButton === "green" ? "green" : "#cacaca",
                  width: "80px",
                  height: "45px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              ></button>
              <button
                onClick={() => handleToggleClick("red")}
                style={{
                  backgroundColor: activeButton === "red" ? "red" : "#cacaca",
                  width: "80px",
                  height: "45px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              ></button>
              <button
                className="grid-button"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => getValuesOnButtonClick("=")}
              >
                <span
                  style={{
                    color: "red",
                    width: "100%",
                    fontSize: "20px",
                  }}
                >
                  =
                </span>
              </button>
    
              <button onClick={handleCalculate} id="calculate-button">
                CALCULATE
              </button>
            </div>
  );
};

export default ButtonGrid;  