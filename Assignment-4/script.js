const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");

let currentInput = "0";
let previousInput = "";
let operator = "";
let expressionDisplay = "";
let isResult = false;

function updateDisplay() {
  if (isResult) {
    previousDisplay.textContent = expressionDisplay;
    previousDisplay.style.opacity = 0.5;
  } else {
    previousDisplay.textContent = previousInput + " " + operator;
    previousDisplay.style.opacity = 1;
  }

  currentDisplay.textContent = currentInput;
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      currentInput = "0";
      previousInput = "";
      operator = "";
      expressionDisplay = "";
      isResult = false;
    } else if (value === "+/-") {
      currentInput = currentInput.startsWith("-")
        ? currentInput.slice(1)
        : `-${currentInput}`;
    } else if (value === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === "=") {
      expressionDisplay = `${previousInput} ${operator} ${currentInput}`;
      try {
        // Evaluate the result
        currentInput = eval(expressionDisplay).toString();
      } catch {
        currentInput = "Error";
      }
      isResult = true;
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (previousInput !== "") {
        currentInput = eval(
          `${previousInput} ${operator} ${currentInput}`
        ).toString();
      }
      operator = value;
      previousInput = currentInput;
      currentInput = "0";
      isResult = false;
    } else {
      if (currentInput === "0" || isResult) {
        currentInput = value;
        isResult = false;
      } else {
        currentInput += value;
      }
    }

    updateDisplay();
  });
});

updateDisplay();
