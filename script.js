document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  const result = document.getElementById("result");
  const equal = document.getElementById("equal");
  const clear = document.getElementById("clear");
  const back = document.getElementById("backspace");

  let lastInput = "";
  let hasDot = false;
  const operators = ["+", "-", "*", "/"];
  let isNegativeStart = false;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      inputValue(button.textContent);
    });
  });

  equal.addEventListener("click", () => {
    if (result.value === "" || operators.includes(lastInput)) {
      result.value = "Error";
    } else {
      calculate();
    }
    lastInput = "";
    hasDot = false;
  });

  clear.addEventListener("click", () => clearDisplay());

  back.addEventListener("click", () => backspace());

  function inputValue(value) {
    if (result.value === "0" && value === "-") {
      result.value = "-";
      isNegativeStart = true;
      return;
    }

    if (!isNaN(value)) {
      if (result.value === "0") {
        if (value !== "0") result.value = value;
      } else {
        result.value += value;
      }
      lastInput = value;

    } else if (value === ".") {
      if (!hasDot) {
        if (operators.includes(lastInput) || result.value === "") {
          result.value += "0.";
        } else {
          result.value += ".";
        }
        hasDot = true;
        lastInput = ".";
      }

    } else if (operators.includes(value)) {
      if (result.value !== "" && !operators.includes(lastInput)) {
        result.value += value;
        lastInput = value;
        hasDot = false;
      }
    }
  }

  function clearDisplay() {
    result.value = "0";
    lastInput = "";
    hasDot = false;
  }

  function backspace() {
    if (result.value !== "") {
      let removed = result.value.slice(-1);
      result.value = result.value.slice(0, -1);
      if (removed === ".") hasDot = false;
      lastInput = result.value.slice(-1) || "";
    }
  }

  function calculate() {
    if (result.value === "" || operators.includes(lastInput)) {
      result.value = "Error";
      return;
    }
    try {
      result.value = eval(result.value);
    } catch {
      result.value = "Error";
    }
    lastInput = "";
    hasDot = false;
  }
});
