//Math functions
function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    //Returns a maximum of three decimal numbers
    return Math.floor((a/b)*1000)/1000;
}

//Operate function
function operate(operator,a,b){

    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return substract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
        default:
            return "Invalid elements."
    }

}

//Button functions
let lowerValue = 0;
let upperValue = 0;
let operatorBool = false;
let delBool = false;
let operator = "";

const upperScreen = document.querySelector('.screen-upper');
const lowerScreen = document.querySelector('.screen-lower');

function updateDisplay(e){
    let c = e.target.textContent;
    if(isNaN(c)){
        operatorBool=true;
        if(upperScreen.textContent===""){
            upperScreen.textContent = lowerValue + " " + c;
            upperValue = lowerValue;
            operator = c;
        }else{
            if(c==='='){
                upperScreen.textContent = `${upperValue} ${operator} ${lowerValue} = ${operate(operator,upperValue,lowerValue)}`;

                lowerScreen.textContent = operate(operator,upperValue,lowerValue);
                operatorBool = false;

            }else{
                if(delBool)
                    upperValue = Number(lowerScreen.textContent);
                else
                    upperValue = operate(operator,upperValue,lowerValue);
                lowerValue = upperValue;

                upperScreen.textContent = upperValue +" "+c;
                lowerScreen.textContent = lowerValue;

                operator = c;
            }
        }

    }else{
        if((lowerValue===0 && c!=="0") || operatorBool)
            lowerScreen.textContent = c;
        else if(lowerValue>0)
            lowerScreen.textContent += c;
        
        lowerValue = Number(lowerScreen.textContent);
        operatorBool=false;
    }
}

const btnList = Array.from(document.querySelectorAll('.calc-keyboard .row .calc-button.number'));
btnList.forEach(btn => btn.addEventListener('click',updateDisplay));

//Delete function
function del(){

    let newValue = lowerScreen.textContent.slice(0,-1);
    lowerScreen.textContent = newValue;
    lowerValue = Number(newValue);
    delBool = true;

}

document.querySelector('.calc-button.del').addEventListener('click',del);

//Clear function
function acClear(){
    upperScreen.textContent = "";
    lowerScreen.textContent = "0";
    upperValue = 0;
    lowerValue = 0;
}

document.querySelector('.calc-button.ac').addEventListener('click',acClear);
