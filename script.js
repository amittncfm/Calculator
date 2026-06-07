let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    if (num === '.' && expression.includes('.')) {
        return;
    }
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    if (expression === '') {
        return;
    }
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }
    expression += op;
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    display.value = '0';
}

function toggleNegative() {
    if (expression === '' || expression === '0') {
        return;
    }
    // Get the last number in the expression
    let lastOperatorIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );

    if (lastOperatorIndex === -1) {
        expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
    } else {
        let lastNumber = expression.slice(lastOperatorIndex + 1);
        if (lastNumber) {
            lastNumber = lastNumber.startsWith('-') ? lastNumber.slice(1) : '-' + lastNumber;
            expression = expression.slice(0, lastOperatorIndex + 1) + lastNumber;
        }
    }
    display.value = expression;
}

function calculate() {
    if (expression === '') {
        return;
    }

    try {
        // Replace % with /100 for percentage calculation
        let result = expression.replace(/%/g, '/100');
        result = eval(result);
        display.value = parseFloat(result.toFixed(10));
        expression = display.value;
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        expression = expression.slice(0, -1);
        display.value = expression || '0';
    }
});

// Initialize display
display.value = '0';