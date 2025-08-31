document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  const result = document.getElementById("result");
  const equal = document.getElementById("equal");
  const clear = document.getElementById("clear");
  const back = document.getElementById("backspace");

  let lastInput = "";
  let hasDot = false;
  const operators = ["+", "-", "*", "/"];

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (!isNaN(value)) {
        result.value += value;
        lastInput = value;
      } else if (value === ".") {
        if (!hasDot) {
          result.value += value;
          hasDot = true;
          lastInput = value;
        }
      } else if (operators.includes(value)) {
        if (result.value !== "") {
          if (operators.includes(lastInput)) {
            // 演算子置き換え
            result.value = result.value.slice(0, -1) + value;
          } else {
            result.value += value;
          }
          lastInput = value;
          hasDot = false;
        }
      }
    });
  });

  equal.addEventListener("click", () => {
    try {
      result.value = eval(result.value);
      lastInput = "";
      hasDot = result.value.includes(".");
    } catch (e) {
      result.value = "Error";
      lastInput = "";
      hasDot = false;
    }
  });

  clear.addEventListener("click", () => {
    result.value = "";
    lastInput = "";
    hasDot = false;
  });

  back.addEventListener("click", () => {
    if (result.value.slice(-1) === ".") hasDot = false;
    result.value = result.value.slice(0, -1);
    lastInput = result.value.slice(-1);
  });
});
