let resultDisplay = document.querySelector('#resultDisplay');
let operationDisplay = document.querySelector('#operationDisplay');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let calculate = document.querySelector('.equals');
let clearButton = document.querySelector('.clearFull');
let undoButton = document.querySelector('.undo');
let signChange = document.querySelector('.sign');
let dotButton = document.querySelector('.dot');

let num1 = undefined;
let num2 = undefined;
let op = undefined;
let result = undefined;

function resetVars(keepNum1) {
    if (!keepNum1) num1 = undefined;
    num2 = undefined;
    op = undefined;
}

// Four available operations

function add() {
    return (parseFloat(num1) + parseFloat(num2)).toFixed(2);
}

function subtract() {
    return (parseFloat(num1) - parseFloat(num2)).toFixed(2);
}

function multiply() {
    return (parseFloat(num1) * parseFloat(num2)).toFixed(2);
}

function divide() {
    return (parseFloat(num1) / parseFloat(num2)).toFixed(2);
}

function power() {
    return (parseFloat(num1) ** parseFloat(num2)).toFixed(2);
}

// Perform operation, assign the result to num1

function operate() {
    if (op == '+') {
        resultDisplay.textContent = `${add()}`;
        num1 = add();
    } else if (op == '-') {
        resultDisplay.textContent = `${subtract()}`;
        num1 = subtract();
    } else if (op == '*') {
        resultDisplay.textContent = `${multiply()}`;
        num1 = multiply();
    } else if (op == '/') {
        if (num2 === '0') {
            resultDisplay.textContent = 'TIAB';
            num1 = undefined;
        } else {
            resultDisplay.textContent = `${divide()}`;
            num1 = divide();
        }
    } else if (op == '**') {
        resultDisplay.textContent = `${power()}`;
        num1 = power();
    }
}

// Listen for number clicks, then assign and display values of numbers

numbers.forEach(number => {
    number.addEventListener('click', function(event) {
        if (num1 === undefined) {
            num1 = event.target.textContent;
            operationDisplay.textContent = num1;
        } else if (op === undefined) {
            num1 += event.target.textContent;
            operationDisplay.textContent += event.target.textContent;
        } else if (num2 === undefined) {
            num2 = event.target.textContent;
            operationDisplay.textContent += event.target.textContent;
        } else {
            num2 += event.target.textContent;
            operationDisplay.textContent += event.target.textContent;
        }
        console.log(num1, num2);
    })
});

// Listen for operator clicks, then assign and display operators

operators.forEach(operator => {
    operator.addEventListener('click', function(event) {
        if (num1 != undefined) {
            op = event.target.textContent;
            operationDisplay.textContent = num1 + op;
        }
    })
});

// Listen for equal sign click, then perform operation and reset num and operator vars

calculate.addEventListener('click', () => {
    if (num1 && op && num2) {
        operate();
        resetVars(true);
    };
});

// Listen for clear full button press

clearButton.addEventListener('click', () => {
    resetVars(false);
    operationDisplay.textContent = '0000'
    resultDisplay.textContent = 'CLEARED';
})

// Listen for sign change button press

signChange.addEventListener('click', () => {
    if (num2 === undefined && num1 != undefined) {
        if (num1.includes('-')) {
            num1 = num1.substring(1);
            operationDisplay.textContent = num1;
        } else {
            num1 = '-' + num1;
            operationDisplay.textContent = num1;
        }
    } else {
        if (num2.includes('-')) {
            num2 = num2.substring(1);
            operationDisplay.textContent = num1 + op + num2;
        } else {
            num2 = '-' + num2;
            operationDisplay.textContent = num1 + op + num2;
        }
    }
})

// Listen for dot button press

dotButton.addEventListener('click', () => {
    if (num2 === undefined && num1 != undefined) {
        if (!num1.includes('.')) {
            num1 += '.';
            operationDisplay.textContent = num1;
        } 
    } else {
        if (!num2.includes('.')) {
            num2 += '.';
            operationDisplay.textContent = num1 + op + num2;
        } 
    }
})

// Listen for undo button press

undoButton.addEventListener('click', () => {
    if (num2 === undefined && op === undefined && num1 === undefined) {
    } else if (num2 === undefined && op === undefined && num1 != undefined) {
        num1 = num1.slice(0, -1);
        if (num1 === '') {
            num1 = undefined;
            operationDisplay.textContent = '0000';
        } else {
            operationDisplay.textContent = num1;
        }
    } else if (num2 === undefined && op != undefined) {
        op = undefined;
        operationDisplay.textContent = num1;
    } else {
        num2 = num2.slice(0, -1);
        if (num2 === '') {
            num2 = undefined;
            operationDisplay.textContent = num1 + op;
        } else {
            operationDisplay.textContent = num1 + op + num2;
        }
    }
})