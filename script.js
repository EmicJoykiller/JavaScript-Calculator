// Get elements
const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByTagName('button'));

let currentInput = '0';
let prevInput = '';
let operator = null;
let resultDisplayed = false;

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Handle number input
function handleNumber(number) {
    if (currentInput === '0' || resultDisplayed) {
        currentInput = number;
        resultDisplayed = false;
    } else {
        currentInput += number;
    }
    updateDisplay(currentInput);
}

// Handle operator input
function handleOperator(op) {
    if (resultDisplayed) {
        prevInput = currentInput;
        resultDisplayed = false;
    } else {
        prevInput = currentInput;
    }
    operator = op;
    currentInput = '';
}

// Handle clear button
function handleClear() {
    currentInput = '0';
    prevInput = '';
    operator = null;
    updateDisplay(currentInput);
}

// Handle decimal button
function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

// Handle equals button
function handleEquals() {
    if (prevInput && operator && currentInput) {
        let result;
        const prev = parseFloat(prevInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
        }

        currentInput = result.toString();
        resultDisplayed = true;
        updateDisplay(currentInput);
    }
}

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;

        if (id === 'clear') {
            handleClear();
        } else if (id === 'equals') {
            handleEquals();
        } else if (id === 'decimal') {
            handleDecimal();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
            handleOperator(button.textContent);
        } else if (['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].includes(id)) {
            handleNumber(button.textContent);
        }
    });
});
