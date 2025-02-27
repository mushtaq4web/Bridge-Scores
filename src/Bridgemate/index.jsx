import React, { useState, useEffect } from "react";
import "./index.css";
import clubs from "./images/clubs.png";
import diamonds from "./images/diamonds.png";
import hearts from "./images/hearts.png";
import spades from "./images/spades.png";
import Table from "./Table";
import DisplayScreen from "./DisplayScreen";
import ButtonGrid from "./GridButtons";
import AlertComponent from "./Alert";
import ControlButtons from "./ControlButtons";
import ResultDisplay from "./ResultDisplay";

const ButtonLayout = () => {
  // State variables
  const [selectedNumber, setSelectedNumber] = useState([]);
  const [selectedSuit, setSelectedSuit] = useState("");
  const [selectedSuitName, setSelectedSuitName] = useState(null);
  const [result, setResult] = useState("");
  const [activeButton, setActiveButton] = useState("green");
  const [direction, setDirection] = useState("");
  const [tableData, setTableData] = useState([]);
  const [displayResult, setDisplayResult] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [rounds, setRounds] = useState("");
  const [nsPair, setNsPair] = useState("");
  const [ewPair, setEwPair] = useState("");
  const [SelectedBoard, setSelectedBoard] = useState("");
  const [currentField, setCurrentField] = useState("ROUND");
  const [step, setStep] = useState(1);
  const [selectedDoubling, setSelectedDoubling] = useState(null);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    localStorage.removeItem('selectedNumber');
    localStorage.removeItem('selectedSuit');
    localStorage.removeItem('selectedSuitName');
    localStorage.removeItem('result');
    localStorage.removeItem('activeButton');
    localStorage.removeItem('direction');
    localStorage.removeItem('rounds');
    localStorage.removeItem('SelectedBoard');
  }, []);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem('selectedNumber', JSON.stringify(selectedNumber));
    localStorage.setItem('selectedSuit', selectedSuit);
    localStorage.setItem('selectedSuitName', selectedSuitName);
    localStorage.setItem('result', result);
    localStorage.setItem('activeButton', activeButton);
    localStorage.setItem('direction', direction);
    localStorage.setItem('rounds', rounds);
    localStorage.setItem('SelectedBoard', SelectedBoard);
  }, [selectedNumber, selectedSuit, selectedSuitName, result, activeButton, direction, rounds, SelectedBoard]);

  // Reset all fields and localStorage
  const resetAllFields = () => {
    setSelectedNumber('');
    setSelectedSuit('');
    setSelectedSuitName('');
    setSelectedDoubling('');
    setResult('');
    setDirection('');
    setRounds('');
    setNsPair('');
    setEwPair('');
    setSelectedBoard('');
    setDisplayResult('');
    setStep(1);
    setCurrentField('ROUND');
    setShowResult(false);

    // Clear localStorage
    localStorage.removeItem('selectedNumber');
    localStorage.removeItem('selectedSuit');
    localStorage.removeItem('selectedSuitName');
    localStorage.removeItem('result');
    localStorage.removeItem('activeButton');
    localStorage.removeItem('direction');
    localStorage.removeItem('rounds');
    localStorage.removeItem('SelectedBoard');
  };

  const handleCancelAll = resetAllFields;
  // Handle button clicks for input fields
  const getValuesOnButtonClick = (newValue) => {
    // Define valid inputs for CONTRACT field
  const validContractInputs = ["CLUB", "DIAMOND", "HEART", "SPADE", "NT", "X", "XX"];

  // Check if the input is a suit or doubling
  const isContractInput = validContractInputs.includes(newValue);

  // If the input is a suit or doubling, ensure it's only allowed in the CONTRACT field
  if (isContractInput && currentField !== "CONTRACT") {
    showAlert("Suit and doubling inputs are only allowed in the CONTRACT field.", "error");
    return; // Exit the function 
  }
    switch (currentField) {
      case "ROUND":
        if (rounds.length < 2) setRounds(rounds + newValue);
        else showAlert("Click OK to move to N/S PAIR.", "success");
        break;

      case "N/S PAIR":
        if (nsPair.length < 3) setNsPair(nsPair + newValue);
        else showAlert("Click OK to move to E/W PAIR.", "success");
        break;

      case "E/W PAIR":
        if (ewPair.length < 3) setEwPair(ewPair + newValue);
        else showAlert("Click OK to move to BOARD.", "success");
        break;

      case "BOARD":
        if (SelectedBoard.length < 3)
          setSelectedBoard(SelectedBoard + newValue);
        else showAlert("Click OK to move to CONTRACT.", "success");
        break;

      case "CONTRACT":
        const imageMap = {
          CLUB: clubs,
          DIAMOND: diamonds,
          HEART: hearts,
          SPADE: spades,
        };

        if (!selectedNumber || selectedNumber.length === 0) {
          if (newValue >= "1" && newValue <= "7") {
            setSelectedNumber(newValue);
            showAlert("Now select a suit.", "success");
          } else {
            showAlert("Please enter a number between 1 and 7 first.", "error");
          }
        } else if (!selectedSuit) {
          if (["CLUB", "DIAMOND", "HEART", "SPADE", "NT"].includes(newValue)) {
            setSelectedSuit(newValue === "NT" ? "NT" : imageMap[newValue]);
            setSelectedSuitName(newValue);
            showAlert(
              "You can now select X or XX, or click OK to proceed.", "success"
            );
          } else {
            showAlert("Please select a valid suit.", "error");
          }
        } else if (!selectedDoubling) {
          if (newValue === "X" || newValue === "XX") {
            setSelectedDoubling(newValue);
            showAlert("Click OK to move to RESULT.", "success");
          } else {
            showAlert("Please select X or XX to complete the CONTRACT.", "error");
          }
        } else {
          showAlert(
            "CONTRACT already filled. Click OK to move to RESULT.", "error"
          );
        }
        break;

      case "RESULT":
        if (newValue === "+" || newValue === "-") {
          // Allow + or - only if it's the first character
          setDisplayResult((prev) => (prev === "" ? newValue : prev));
        } else if (/^\d+$/.test(newValue)) {
          setDisplayResult((prev) => {
            if (prev === "" || prev === "+" || prev === "-") {
              return prev + newValue; // Allow first digit after + or -
            } else if (/^[+-]\d*$/.test(prev)) {
              return prev + newValue; // Allow appending numbers
            }
            return prev; // Ignore invalid input
          });
        } else if (newValue === "=") {
          setDisplayResult((prev) => prev + " =");

        } else {
          showAlert("Please enter a valid result. Start with + or - followed by numbers.", "error");
        }
        break;
      default:
        showAlert("All fields are filled.", "success");
        break;
    }
    setTimeout(() => showAlert(""), 2000);
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    if (displayResult) {
      setDisplayResult("");
    } else if (direction) {
      setDirection("");
    } else if (selectedDoubling) {
      setSelectedDoubling("");
      setCurrentField("CONTRACT");
    } else if (selectedSuit) {
      setSelectedSuit("");
      setSelectedSuitName("");
      setCurrentField("CONTRACT");
    } else if (selectedNumber) {
      setSelectedNumber(""); 
      setSelectedSuit(""); 
      setSelectedSuitName("");
      setSelectedDoubling(""); 
      setCurrentField("CONTRACT");
    } else if (SelectedBoard.length > 0) {
      setSelectedBoard(SelectedBoard.slice(0, -1));
      setCurrentField("BOARD");
    } else if (ewPair.length > 0) {
      setEwPair(ewPair.slice(0, -1));
      setCurrentField("E/W PAIR");
    } else if (nsPair.length > 0) {
      setNsPair(nsPair.slice(0, -1));
      setCurrentField("N/S PAIR");
    } else if (rounds.length > 0) {
      setRounds(rounds.slice(0, -1));
      setCurrentField("ROUND");
    }
  };

  // Handle OK button click
  const handleOkClick = () => {
    switch (currentField) {
      case "ROUND":
        if (rounds.length >= 1 && rounds.length <= 2) {
          setCurrentField("N/S PAIR");
          showAlert("Enter values for N/S PAIR.", "success");
        } else {
          showAlert("ROUND must have 1 or 2 digits before proceeding.", "error");
        }
        break;

      case "N/S PAIR":
        if (nsPair.length >= 1 && nsPair.length <= 3) {
          setCurrentField("E/W PAIR");
          showAlert("Enter values for E/W PAIR.", "success");
        } else {
          showAlert(
            "N/S PAIR must have 1 to 3 digits before proceeding.", "error"
          );
        }
        break;

      case "E/W PAIR":
        if (ewPair.length >= 1 && ewPair.length <= 3) {
          setCurrentField("BOARD");
          showAlert("Enter values for BOARD.", "success");
        } else {
          showAlert(
            "E/W PAIR must have 1 to 3 digits before proceeding.", "error"
          );
        }
        break;

      case "BOARD":
        if (SelectedBoard.length >= 1 && SelectedBoard.length <= 3) {
          setCurrentField("CONTRACT");
          showAlert("Enter values for CONTRACT.");
        } else {
          showAlert("BOARD must have 1 to 3 digits before proceeding.", "error");
        }
        break;

      case "CONTRACT":
        if (selectedNumber && (selectedSuit || selectedDoubling)) {
          setCurrentField("RESULT");
          showAlert("Enter calculation in RESULT.", "success");
        } else {
          showAlert(
            "Complete CONTRACT (number and suit or X/XX) before proceeding.", "error"
          );
        }
        break;

      case "RESULT":
        showAlert("You are in the RESULT field. Enter the calculation.", "success");
        break;

      default:
        showAlert("All fields completed.", "success");
        break;
    }
    setTimeout(() => showAlert(""), 2000);
  };

  // Handle PASS button click
  const handlePassClick = (value) => {
    if (
      !rounds ||
      !nsPair ||
      !ewPair ||
      !SelectedBoard
    ) {
      showAlert("Please select round, nsPair, ewPair, Board options before Pass!", "error");
      return;
    }
    setShowResult(true);
    if (value === "PASS") {
      setSelectedNumber(["PASS"]);
      setSelectedSuit(null);
      setResult("0");
      showAlert("Contract set to PASS.", "success");
      setTimeout(() => showAlert(""), 1000);
    } else if (selectedNumber && rounds && nsPair && ewPair && SelectedBoard) {
      let totalPoints = 0;
      setResult(`${totalPoints} points`);
    } else {
      showAlert("Please select all the options before calculating!", "error");
      setTimeout(() => showAlert(""), 1000);
    }
  };

  // Handle toggle button click
  const handleToggleClick = (button) => {
    setActiveButton(button);
  };

  // Handle direction button click
  const handleDirectionClick = (dir) => {
    setDirection(dir);
  };

  const handleCalculate = () => {
    setShowResult(false);
  
    if (
      !selectedNumber ||
      !selectedSuitName ||
      !rounds ||
      !nsPair ||
      !ewPair ||
      !SelectedBoard
    ) {
      showAlert("Please select all the options before calculating!", "error");
      return;
    }
  
    const contractNumber = parseInt(selectedNumber, 10);
    let resultValue = parseInt(displayResult, 10) || 0;
    let bonusPoints = 0;
  
    if (isNaN(contractNumber) || contractNumber < 1 || contractNumber > 7) {
      showAlert("CONTRACT accepts only numbers between 1 and 7.", "error");
      return;
    }
  
    if (displayResult.includes("=")) {
      resultValue = 0;
      if (activeButton === "green") bonusPoints += 50;
    }
    if (displayResult.includes("+") && activeButton === "green" && selectedDoubling ) {
      bonusPoints += 50;
  }
  
    if (isNaN(resultValue)) {
      showAlert("Please enter a valid RESULT starting with + or -.", "error");
      return;
    }
  
    const finalContract = contractNumber + resultValue;
    if (resultValue > 0 && finalContract > 7) {
      showAlert("CONTRACT + RESULT cannot be greater than 7.", "error");
      return;
    }
  
    if ((activeButton === "green" || activeButton === "red") && contractNumber >= 1 && contractNumber <= 7) {
      const minResult = -6 - contractNumber; // Dynamic calculation of minResult (-7 for 1, -8 for 2, ..., -13 for 7)
  
      if (resultValue < minResult) {
        showAlert(`RESULT cannot be less than ${minResult}.`, "error");
        return;
      }
  
      if (resultValue < 0) {
        let penaltyPoints = 0;
  
        if (selectedDoubling === "X" || selectedDoubling === "XX") {
          let basePenaltyGreen = [100, 300, 500, 800, 1100, 1400, 1700, 2000, 2300, 2600, 2900, 3200, 3500];
          let basePenaltyRed = [200, 500, 800, 1100, 1400, 1700, 2000, 2300, 2600, 2900, 3200, 3500, 3800];
  
          let adjustedResult = Math.abs(resultValue) - 1; // Index starts at 0
          if (adjustedResult >= 0 && adjustedResult < basePenaltyGreen.length) {
            penaltyPoints = activeButton === "red"
              ? basePenaltyRed[adjustedResult]
              : basePenaltyGreen[adjustedResult];
          }
          penaltyPoints *= selectedDoubling === "XX" ? 2 : 1;
        } else {
          penaltyPoints = Math.abs(resultValue) * (activeButton === "red" ? 100 : 50);
        }
  
        setResult(`${-penaltyPoints} `);
        setShowResult(true);
        showAlert("Points calculated successfully!", "success");
        return;
      }
    } else {
      if (finalContract < 1 || finalContract > 7) {
        showAlert("CONTRACT + RESULT must be between 1 and 7.", "error");
        return;
      }
    }
  
    setShowResult(true);
  
    let totalPoints = 0,
      suitPoints = 0;
  
    if (["CLUB", "DIAMOND"].includes(selectedSuitName)) suitPoints = 20;
    else if (["HEART", "SPADE"].includes(selectedSuitName)) suitPoints = 30;
    else if (selectedSuitName === "NT") {
      suitPoints = 30;
      bonusPoints += 10;
    }
    if (selectedDoubling === "X"){
      suitPoints *= 2;
      bonusPoints += 50;
    }
    if (selectedDoubling === "XX") {
      suitPoints *= 4;
      bonusPoints += 100;
    }
  
    totalPoints += finalContract * suitPoints;
  
    if (activeButton === "green" && resultValue !== 0 && !selectedDoubling) bonusPoints += 50;
  
    if (activeButton === "red") {
      if (resultValue < 0 && resultValue >= -7) {
        totalPoints = Math.abs(resultValue) * 100;
        bonusPoints = 0;
      } else if (resultValue >= 0 || displayResult.includes("=")) {
        bonusPoints += 50;
      }
    }
  
    const isGame =
      (contractNumber >= 5 && ["CLUB", "DIAMOND"].includes(selectedSuitName)) ||
      (contractNumber >= 4 && ["HEART", "SPADE"].includes(selectedSuitName)) ||
      (contractNumber >= 3 && selectedSuitName === "NT");
  
    if (isGame && resultValue >= 0) {
      if (activeButton === "green") bonusPoints += 250;
      if (activeButton === "red") bonusPoints += 450;
    }
  
    const extraBonus =
      (contractNumber >= 6 && ["CLUB", "DIAMOND", "HEART", "SPADE", "NT"].includes(selectedSuitName));
  
    if (extraBonus && resultValue >= 0) {
      if (activeButton === "green") bonusPoints += 500;
      if (activeButton === "red") bonusPoints += 750;
    }
  
    const extraBonusFro7 =
      (contractNumber >= 7 && ["CLUB", "DIAMOND", "HEART", "SPADE", "NT"].includes(selectedSuitName));
  
    if (extraBonusFro7 && resultValue >= 0) {
      if (activeButton === "green") bonusPoints += 500;
      if (activeButton === "red") bonusPoints += 750;
    }
  
    totalPoints += bonusPoints;
  
    setResult(`${totalPoints} `);
    showAlert("Points calculated successfully!", "success");
  };

  //function to show alerts
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 2000);
  };
  // Handle send score button click
  const handleSendScore = () => {
    if (!result) {
      showAlert(
        "Please click CALCULATE or PASS before sending the score.", "error"
      );
      setTimeout(() => showAlert(""), 2000);
      return;
    }

    setTableData((prevData) => [
      ...prevData,
      {
        rounds,
        SelectedBoard,
        nsPair,
        ewPair,
        contract: {
          number: selectedNumber ? selectedNumber[0] : "",
          suitImage: selectedSuit || "",
          doubling: selectedDoubling || "",
        },
        direction,
        displayResult,
        result,
      },
    ]);

    resetAllFields();
    showAlert("Scores sent successfully. Ready for next entry!", "success");
    setTimeout(() => showAlert(""), 2000);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        width: "50%",
      }}
    >
      <div className="main">
      <DisplayScreen
          rounds={rounds}
          nsPair={nsPair}
          ewPair={ewPair}
          SelectedBoard={SelectedBoard}
          selectedNumber={selectedNumber}
          selectedSuit={selectedSuit}
          selectedSuitName={selectedSuitName}
          selectedDoubling={selectedDoubling}
          direction={direction}
          displayResult={displayResult}
        />
       <ButtonGrid
          getValuesOnButtonClick={getValuesOnButtonClick}
          handleCancelClick={handleCancelClick}
          handleOkClick={handleOkClick}
          handlePassClick={handlePassClick}
          handleDirectionClick={handleDirectionClick}
          handleToggleClick={handleToggleClick}
          handleCalculate={handleCalculate}
          activeButton={activeButton}
          clubs={clubs} // Pass clubs image as prop
          diamonds={diamonds} // Pass diamonds image as prop
          hearts={hearts} // Pass hearts image as prop
          spades={spades} // Pass spades image as prop
        />
      </div>
      <AlertComponent alertMessage={alertMessage} alertType={alertType} />
      <ControlButtons handleSendScore={handleSendScore} handleCancelAll={handleCancelAll} />
      <ResultDisplay
          showResult={showResult}
          result={result}
          rounds={rounds}
          nsPair={nsPair}
          ewPair={ewPair}
          SelectedBoard={SelectedBoard}
          selectedNumber={selectedNumber}
          selectedSuitName={selectedSuitName}
          displayResult={displayResult}
        />
        <Table tableData={tableData} />
    </div>
  );
};
export default ButtonLayout;
