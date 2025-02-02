// CALCULATOR PROGRAM

const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        test = eval(display.value);
        logt = 8-Math.floor(Math.log10( test));
        corr = Math.pow(10,logt);
        display.value = Math.round(test*corr)/corr;
    }
    catch(error){
        display.value = "Error";
    }
}