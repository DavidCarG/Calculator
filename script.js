let h = "hello I made it here";
//Math functions
function add(a,b){
    return Math.floor((a+b)*1000)/1000;
}

function substract(a,b){
    return Math.floor((a-b)*1000)/1000;
}

function multiply(a,b){
    return Math.floor((a*b)*1000)/1000;
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
let decimalBool = false;
let operator = "";
let result = "";

const upperScreen = document.querySelector('.screen-upper');
const lowerScreen = document.querySelector('.screen-lower');

function updateDisplay(e){
    let c = e.target.textContent;

    if(lowerScreen.textContent.includes('.') && c==='.')
        return;

    if(isNaN(c) && c!=='.'){
        operatorBool=true;
        decimalBool=false;
        if(upperScreen.textContent===""){
            upperScreen.textContent = lowerValue + " " + c;
            upperValue = lowerValue;
            operator = c;
        }else{
            if(c==='='){
                upperScreen.textContent = `${upperValue} ${operator} ${lowerValue} = ${operate(operator,upperValue,lowerValue)}`;

                lowerScreen.textContent = operate(operator,upperValue,lowerValue);
                result = lowerScreen.textContent;
                operatorBool = false;
                decimalBool = false;

            }else{
                if(result!=lowerScreen.textContent && result!=="")
                    upperValue = Number(lowerScreen.textContent);
                else
                    upperValue = operate(operator,upperValue,lowerValue);

                result = "";
                lowerValue = upperValue;
                upperScreen.textContent = upperValue +" "+c;
                lowerScreen.textContent = lowerValue;

                operator = c;
            }
        }

    }else{
        if((lowerValue<1 && c!=="0") || operatorBool)
            if(c==='.'){
                lowerScreen.textContent = "0."
                decimalBool = true;
            }else if(decimalBool){
                lowerScreen.textContent += c;
            }else{
                lowerScreen.textContent = c;
            }
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
