const billInput = document.getElementById("billInput");
const tipButtons = document.querySelectorAll(".tipButton");
const customTipInput = document.getElementById("customTipInput");
const peopleInput = document.getElementById("peopleInput");
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const error = document.querySelectorAll(".error");
const reset = document.querySelector(".reset");

let billValue;
let tipValue;
let peopleValue;
let totalAmount;
let tipAmount;

const calculate = () => {
  tipAmount = billValue * tipValue / peopleValue;
  totalAmount = isNaN(tipAmount) ? billValue / peopleValue : tipAmount + billValue / peopleValue;

  tip.textContent = isNaN(tipAmount) || !isFinite(tipAmount) ? "0.00" : tipAmount.toFixed(2);
  total.textContent = isNaN(totalAmount) || !isFinite(totalAmount) ? "0.00" : totalAmount.toFixed(2);

  billInput.classList.toggle("input-error", billValue == 0);
  error[0].style.display = billValue == 0 ? "block" : "none";

  peopleInput.classList.toggle("input-error", peopleValue == 0);
  error[1].style.display = peopleValue == 0 ? "block" : "none";

  reset.classList.toggle("btn-active", !isNaN(billValue) || !isNaN(tipValue) || !isNaN(peopleValue));
};

const resetForm = () => {
  billValue = "";
  tipValue = "";
  peopleValue = "";
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";
  tip.textContent = "0.00";
  total.textContent = "0.00";
  reset.classList.remove("btn-active");
  billInput.classList.remove("input-error");
  peopleInput.classList.remove("input-error");
  error[0].style.display = "none";
  error[1].style.display = "none";
};

billInput.addEventListener("input", () => {
  billValue = billInput.value;
  calculate();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((otherButton) => {
      otherButton.classList.toggle("btn-active", otherButton === button);
    });
    customTipInput.value = "";
    tipValue = button.textContent.slice(0, -1) / 100;
    calculate();
  });
});

customTipInput.addEventListener("input", () => {
  tipValue = customTipInput.value / 100;
  tipButtons.forEach((button) => {
    button.classList.remove("btn-active");
  });
  calculate();
});

peopleInput.addEventListener("input", () => {
  peopleValue = peopleInput.value;
  calculate();
});

reset.addEventListener("click", resetForm);