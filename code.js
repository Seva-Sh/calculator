let display = document.querySelector('#display');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let calculate = document.querySelector('.equals');
let clearButton = document.querySelector('.clearFull');
let signChange = document.querySelector('.sign');

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
    return parseFloat(num1) + parseFloat(num2);
}

function subtract() {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply() {
    return parseFloat(num1) * parseFloat(num2);
}

function divide() {
    return parseFloat(num1) / parseFloat(num2);
}

function power() {
    return parseFloat(num1) ** parseFloat(num2)
}

// Perform operation, assign the result to num1

function operate() {
    if (op == '+') {
        display.textContent = `${add()}`;
        num1 = add().toString();
    } else if (op == '-') {
        display.textContent = `${subtract()}`;
        num1 = subtract().toString();
    } else if (op == '*') {
        display.textContent = `${multiply()}`;
        num1 = multiply().toString();
    } else if (op == '/') {
        if (num2 === '0') {
            display.textContent = 'TIAB';
            num1 = undefined;
        } else {
            display.textContent = `${divide()}`;
            num1 = divide().toString();
        }
    } else if (op == '**') {
        display.textContent = `${power()}`;
        num1 = power().toString();
    }
}

// Listen for number clicks, then assign and display values of numbers

numbers.forEach(number => {
    number.addEventListener('click', function(event) {
        if (num1 === undefined) {
            num1 = event.target.textContent;
            display.textContent = num1;
        } else if (op === undefined) {
            num1 += event.target.textContent;
            display.textContent += event.target.textContent;
        } else if (num2 === undefined) {
            num2 = event.target.textContent;
            display.textContent += event.target.textContent;
        } else {
            num2 += event.target.textContent;
            display.textContent += event.target.textContent;
        }
        console.log(num1, num2);
    })
});

// Listen for operator clicks, then assign and display operators

operators.forEach(operator => {
    operator.addEventListener('click', function(event) {
        if (num1 != undefined) {
            op = event.target.textContent;
            display.textContent += op;
            console.log(op);
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
    display.textContent = 'CLEARED';
})

// Listen for sign change button press

signChange.addEventListener('click', () => {
    if (num2 === undefined && num1 != undefined) {
        if (num1.includes('-')) {
            num1 = num1.substring(1);
            display.textContent = num1;
        } else {
            num1 = '-' + num1;
            display.textContent = num1;
        }
    } else {
        if (num2.includes('-')) {
            num2 = num2.substring(1);
            display.textContent = num1 + op + num2;
        } else {
            num2 = '-' + num2;
            display.textContent = num1 + op + num2;
        }
    }
})

