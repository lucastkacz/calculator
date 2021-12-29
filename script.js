const buttons = document.querySelectorAll("button");
let down = "";
let up = "";

let ans;

const displayBottom = document.querySelector(".display-bottom");

const displayTop = document.querySelector(".display-top");

buttons.forEach((button) => {
  button.addEventListener("click", onClick);
});

function onClick() {
  switch (this.id) {
    case "clear":
      _clear();
      break;
    case "delete":
      _delete();
      break;
    case "x":
    case "+":
    case "-":
    case "÷":
      operator(this.id);
      break;
    case "=":
      equal();
      break;
    case ".":
      if (down.includes(".")) {
        break;
      }
    case "0":
      if (down[0] === "0" && down.length <= 1) {
        break;
      }
    default:
      down += this.id;
      displayBottom.textContent = down;
  }
}
function _clear() {
  down = "";
  displayBottom.textContent = down;
  up = "";
  displayTop.textContent = up;
}
function _delete() {
  if (down) {
    down = down.substring(0, down.length - 1);
  }
  displayBottom.textContent = down;
}
function operator(op) {
  up = down;
  if (up) {
    displayTop.textContent = `${up} ${op}`;
  }
  down = "";
  displayBottom.textContent = down;
}
function equal() {
  if (displayTop.textContent.includes("=")) {
    console.log("not doing anything");
  } else if (down) {
    displayTop.textContent += ` ${down} =`;
    stringToAnswer(displayTop.textContent);
    displayBottom.textContent = ans;
    down = ans;
  } else if (!down && !up) {
    displayBottom.textContent = "";
  } else {
    displayBottom.textContent = "Syntax ERROR";
  }
}

function stringToAnswer(topString) {
  const arr = topString.split(" ");
  let num1 = Number(arr[0]);
  let num2 = Number(arr[2]);
  let ope = arr[1];
  switch (ope) {
    case "+":
      ans = num1 + num2;
      break;
    case "-":
      ans = num1 - num2;
      break;
    case "÷":
      ans = Math.round((num1 / num2) * 100000) / 100000;
      break;
    case "x":
      ans = num1 * num2;
      break;
  }
}
