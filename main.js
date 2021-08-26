class Calculator{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(num){
        if(num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseOperation(op){
        if(this.currentOperand === '') return;
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = op;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplay(num){
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split('.')[0]);
        const decimalDigits = strNum.split('.')[1];
        let integerDisplay;
        if(isNaN(intDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentText.innerText = this.getDisplay(this.currentOperand);
        if(this.operation != null){
            this.previousText.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`;
        }
        else{
            this.previousText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const currentText = document.querySelector('[data-current-operand]');
const previousText = document.querySelector('[data-previous-operand]');

const calc = new Calculator(previousText, currentText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        // console.log(button.innerText);
        calc.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});