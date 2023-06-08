var changeMode = document.getElementById("changeModeBtn");
let result = "";
let result1 = "";
var display = document.getElementById("showResult");
const backSpaceBtn = document.getElementById("backSpace");
const clearAll = document.getElementById("clearAllBtn");
var buttons = Array.from(document.getElementsByClassName("btn-nmb"));
var operators = Array.from(document.getElementsByClassName("operator"));
const percntg = document.getElementById("percentage");
const isEqualBtn = document.getElementById("isEqual");
const displayExp = document.getElementById("output1");
let previousInput = "";

function darkMode() {
  var lightCont = document.getElementById("lightMode");
  var keysDiv = document.getElementById("keysDiv");
  var keys = document.getElementById("keysDiv");
  var output = document.getElementById("showResult");
  var inputDiv = document.getElementsByClassName("inputBox");
  var rows = document.getElementsByClassName("row");
  var inputExp = document.getElementById("output1");

  changeMode.classList.toggle("dark-keys-Div");
  lightCont.classList.toggle("dark-mode");
  keysDiv.classList.toggle("dark-keys-Div");
  output.classList.toggle("input-div");
  output.classList.toggle("whiteBtnD");
  inputExp.classList.toggle("outputExpDiv");

  for (var i = 0; i < rows.length; i++) {
    var buttons = rows[i].getElementsByClassName("myButton");
    var darkWhiteBtn = rows[i].getElementsByClassName("whiteBtn");

    for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.toggle("darkKeyStyle");
      buttons[j].style.border = "none";
    }

    for (var j = 0; j < darkWhiteBtn.length; j++) {
      darkWhiteBtn[j].classList.toggle("whiteBtnD");
    }
  }
}
changeMode.addEventListener("click", darkMode);

const handleClick = (value) => {
  const currentValue = display.value;
  if (isSign(previousInput) && isSign(value)) {
    // Replace the previous sign with the new sign
    display.value = currentValue.slice(0, -1) + value;
  } else {
    // Append the new input to the current value
    display.value = currentValue + value;
  }
  previousInput = value;
};

const handleDuplicate = (value) => {
  result = value;
  display.value = result;
};

const backSpace = (value) => {
  display.value = display.value.slice(0, -1);
  result = display.value;
};

const clearResult = (value) => {
  display.value = "";
  displayExp.innerText = "";
  result = display.value;
  result1 = displayExp.value;
};

const isSign = (value) => {
  return ["+", "-", "*", "/", "%"].includes(value);
};

function calculate(value) {
  displayExp.innerText = display.value;
  var expression = display.value;
  console.log(expression, typeof expression);

  expression = expression.replace(/\s/g, "");
  function performOperation(operator, operand1, operand2) {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      case "%":
        return (operand1 / operand2) * 100;
      default:
        throw new Error("Invalid operator");
    }
  }

  function getPrecedence(operator) {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  }
  var numbers = [];
  var operators = [];
  var number = "";
  for (var i = 0; i < expression.length; i++) {
    var char = expression[i];
    if (!isNaN(parseFloat(char))) {
      number += char;
      if (i === expression.length - 1 || isNaN(parseFloat(expression[i + 1]))) {
        numbers.push(parseFloat(number));
        number = "";
      }
    } else {
      while (
        operators.length > 0 &&
        getPrecedence(operators[operators.length - 1]) >= getPrecedence(char)
      ) {
        var operand2 = numbers.pop();
        var operand1 = numbers.pop();
        var operator = operators.pop();
        var result = performOperation(operator, operand1, operand2);
        numbers.push(result);
      }
      operators.push(char);
    }
  }

  while (operators.length > 0) {
    var operand2 = numbers.pop();
    var operand1 = numbers.pop();
    var operator = operators.pop();
    var result = performOperation(operator, operand1, operand2);
    numbers.push(result);
  }
  return numbers[0];
}

const finalCalculation = (value) => {
  var finalResult = calculate(value);
  display.value = finalResult;
};
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    handleClick(e.target.value);
  });
});
operators.forEach(function (operator) {
  operator.addEventListener("click", function (e) {
    handleClick(e.target.value);
  });
});
backSpaceBtn.addEventListener("click", function (e) {
  backSpace(e.target.value);
});
clearAll.addEventListener("click", function (e) {
  clearResult(e.target.value);
});
isEqualBtn.addEventListener("click", function (e) {
  finalCalculation();
});
