let buffer = "0";
let runningTotal = 0;
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    //Call the function that handle things that are not numbers
    handleSymbol(value);
  } else {
    handleNumbers(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        //You need 2 numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      //screen.innerText = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
      handleMath(symbol);
      break;
    case "−":
      handleMath(symbol);
      break;
    case "×":
      handleMath(symbol);
      break;
    case "÷":
      handleMath(symbol);
      break;
  }
  // console.log(symbol);
}

function handleMath(symbol) {
  if (buffer === "0") {
    //Do nothing
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    default:
      runningTotal /= intBuffer;
      break;
  }
  // console.log(runningTotal);
}

function handleNumbers(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

//This function is being called automatically anytime the
//script is run. It sets everything up
function init() {
  document.querySelector(".calc-btns").addEventListener("click", function (e) {
    //console.log(e);
    if (e.target.tagName === "BUTTON") {
      buttonClick(e.target.innerText);
    }
  });
}
init();