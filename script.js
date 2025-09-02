//変数取得
const buttons = document.querySelectorAll(".button");
const result = document.getElementById("result");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");

let lastInput = "";
let hasOperator = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            if (value === ".") {

                const parts = result.value.split(/[\+\-\*\/]/);
                const currentNumber = parts[parts.length - 1];
                if (currentNumber.includes(".")) {
                    return;
                }

                if (result.value === "" || /[\+\-\*\/]$/.test(result.value)) {
                    result.value += "0.";
                } else {
                    result.value += ".";
                }
            } else if (result.value === "0") {

                result.value = value;
            } else {
                result.value += value;
            }
            hasOperator = false;
        }

        // 演算子
        else if (["＋", "－", "×", "÷"].includes(value)) {
            if (!hasOperator && result.value !== "") {
                let operator = value;
                if (value === "＋") operator = "+";
                else if (value === "－") operator = "-";
                else if (value === "×") operator = "*";
                else if (value === "÷") operator = "/";

                result.value += operator;
                hasOperator = true;
            }
        }
        lastInput = value;
    });
});

//クリア
clear.addEventListener("click", () => {
    result.value = "";
    hasOperator = false;
});

//イコール
equal.addEventListener("click", () => {
    try {
        result.value = eval(result.value);
    } catch (e) {
        result.value = "エラー";
    }
});