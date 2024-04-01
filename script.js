let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');
const arrow = document.getElementById("arrow-button").innerText;
const add = document.getElementById("add-button").innerText;
const times = document.getElementById("multiply-button").innerText;
const divide = document.getElementById("divide-button").innerText;
const subtract = document.getElementById("subtract-button").innerText;

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case arrow:
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case add:
        case subtract:
        case times:
        case divide:
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);
    previousOperator = symbol;

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === add){
        runningTotal += intBuffer;
    }
    else if(previousOperator === subtract){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === times){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === divide){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();



//function handleValue()

/*const buttons = document.getElementsByClassName("calc-button");

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener(onclick, buttonClick(button[i].innerText));
}*/
