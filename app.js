//Get Click Animation to all Buttons
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //Add Animation class
        e.target.classList.add("click");

        //Remove Animation class after animation ends
        e.target.addEventListener("animationend", (e) => {
            e.target.classList.remove("click");
        });
    });
});

// Calculator Stuff
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equals]");
const previousNumber = document.querySelector("[data-previous-number]");
const currentNumber = document.querySelector("[data-current-number]");

class Calculator {
    constructor(previousNumber, currentNumber) {
        this.prevNumberTextElement = previousNumber;
        this.currentNumberTextElement = currentNumber;
        this.clear();
    }

    clear() {
        this.currentNumber = "";
        this.prevNumber = "";
        this.operation = undefined;
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    addNumber(num) {
        if (num === "." && this.currentNumber.includes(".")) return;
        this.currentNumber = this.currentNumber.toString() + num.toString();
    }

    chooseOperation(operation) {
        if (this.currentNumber === "") return;
        if (this.prevNumber !== "") {
            compute();
        }
        this.prevNumber = this.currentNumber;
        this.currentNumber = "";
        this.operation = operation;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevNumber);
        const current = parseFloat(this.currentNumber);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
        }
        this.currentNumber = computation;
        this.prevNumber = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentNumberTextElement.innerHTML = this.currentNumber;

        if (this.operation != null) {
            this.prevNumberTextElement.innerHTML = `${this.prevNumber}${this.operation}`;
        } else {
            this.prevNumberTextElement.innerHTML = "&nbsp;";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const calc = new Calculator(previousNumber, currentNumber);

    // Buttons EventListeners

    //numberButtons
    numberButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            calc.addNumber(btn.children[1].innerHTML);
            calc.updateDisplay();
        });
    });

    //operationButtons
    operationButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            calc.chooseOperation(btn.children[1].innerHTML);
            calc.updateDisplay();
        });
    });

    //deleteButton
    deleteButton.addEventListener("click", () => {
        calc.delete();
        calc.updateDisplay();
    });

    //allClearButton
    allClearButton.addEventListener("click", () => {
        calc.clear();
        calc.updateDisplay();
    });

    //equalButton
    equalButton.addEventListener("click", () => {
        calc.compute();
        calc.updateDisplay();
    });
});
