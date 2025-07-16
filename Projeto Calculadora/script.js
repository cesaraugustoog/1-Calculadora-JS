const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons button'); //cria uma node list do #buttons com todos os "button"
let currentExpression = '';
let firstOperand = null; // o null aqui é pra deixar em "branco" o segundo numero
let operador = null;
let waitingForSecondOperand = false;

function calculate(num1, op, num2){
    num1 = parseFloat(num1); // Converte para número (pode vir como string)
    num2 = parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) return 'Erro: não é número.'

    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '÷': 
            if (num2 === 0) return 'Divisão por ZER0!';
            return num1 / num2;
        case '%': return num1 * (num2 / 100);
        default: return "Erro default";
            
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent; //texto do botao clicado

        // botão limpar (apaga tudo)
        if (buttonText === 'Limpar') {
            currentExpression ='';
            firstOperand = null;
            operador = null;
            waitingForSecondOperand = false;
            display.value = ''; //limpa o display
            return; // para a execução da função
        }

        if (buttonText === 'Delete') {
           currentExpression = currentExpression.slice(0, -1);
           display.value = currentExpression;
        }
        

        if (buttonText === '') {
            (currentExpression === '') 
            firstOperand = null;
            operador = null;
            waitingForSecondOperand = false
        
        return;
     }

        // botões númericos 0 a 9
        if (buttonText >= '0' && buttonText <= '9') {
            if (waitingForSecondOperand) {
                currentExpression = buttonText;
                waitingForSecondOperand = false
            } else {
                // se o numero é só 0 e digitou outro numero (não ponto) subtstiui o 0
                if (currentExpression === '0' && buttonText !== '.') {
                    currentExpression = buttonText;
                } else {
                    currentExpression += buttonText; // add numero ao final
                }
                
            }
            display.value = currentExpression;
                return;
        }
        
        // virgula e ponto tratar como ponto p/ calculo..
        if (buttonText === '.' || buttonText === ',') {
            // se ja em ponto, não add outro
            if (!currentExpression.includes('.')) {
                // se a expressão é vazia começa com 0
                if (currentExpression === '') {
                    currentExpression = '0.'
                } else {
                    currentExpression += '.';
                }
            }
            display.value = currentExpression;
            return;
        }
       
        // botões operadores + - * / etc
        
        if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '÷' || buttonText === '%') {
            if (firstOperand !== null && operador !== null && !waitingForSecondOperand) {
             const result = calculate(firstOperand, operador, currentExpression);
             display.value = result;
             firstOperand = result;
             currentExpression = String(result);

            } else if (currentExpression !== '') {
                firstOperand = parseFloat(currentExpression);
            } else {
            
                return;
            }

            operador = buttonText;
            waitingForSecondOperand = true;
            return;
        }

        // botão resolver =
        if (buttonText === '=') {
            if (firstOperand !== null && operador !== null && currentExpression !== '') {
                const result = calculate(firstOperand, operador, currentExpression);
                display.value = result;
                currentExpression = String(result);
                firstOperand = null;
                operador = null;
                waitingForSecondOperand= false;
            }
            return;
        }
    });
});


