document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
     
    for(let button of buttons){
        button.addEventListener("click", function(){
            if(this.getAttribute("data-type")=== "submit"){
                console.log(this.getAttribute("data-type"));
                //runGame(this.getAttribute("data-type"));
                alert("You Clicked Submit!");
                checkAnswer();
            }else{
                let gameType = this.getAttribute("data-type");
                console.log(`This is the type that user choose :${gameType}`);
                runGame(gameType);
            }
        });
    }
    document.getElementById("answer-box").addEventListener("keydown",function(event){
        if(event.key == "Enter"){
            checkAnswer();
        }
    });
});

/**
 * The main game "loop ", 
 * called when the script is first loaded 
 * and after the user's answer has been processed
 */
function runGame(gameType){
    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;

    document.getElementById("answer-box").value =" ";

    if(gameType === "addition") {
        displayAdditionQuestion (num1,num2);
    }else if(gameType === "substraction"){
        displaySubtractQuestion(num1,num2);
    }else if(gameType === "multiplication"){
        displayMultiplyQuestion(num1,num2);
    }else if(gameType === "division"){
        displayDivisionQuestion(num1,num2);
    }else{
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * checks the answer against the first Element in the returned CalculateCorrectAnswer function
 */
function checkAnswer(){
    let userAnswer  = parseInt(document.getElementById("answer-box").value);
    let correctAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === correctAnswer[0];
    if (isCorrect){
        alert ("Hey ! You got it right ");
        incrementScore();
    }else {
        console.log(correctAnswer[0]);
        alert (`You answer is ${userAnswer}.The correct answer was ${correctAnswer[0]}!`);
        incrementWrongAnswer();
    }
    runGame(correctAnswer[1]);
}

/**
 * Get the operands (the numbers) and the operator (plus,minus etc)
 * directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer(){
    let operand1 =  parseInt(document.getElementById('operand1').innerText);
    let operand2 =  parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById ('operator').innerText;

    if(operator === "+"){
        return [operand1 + operand2, "addition"]; 
    }else if(operator === "-"){
        return [operand1 - operand2, "substraction"];
    }else if(operator === "x"){
        return [operand1 * operand2, "multiplication"];
    }else if(operator === "/"){
        result = [operand1 / operand2, "division"];
        return result;
    }
    else{
        alert( "Unimplemented operator");
        alert( `Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore(){
    let correctScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText =  ++correctScore;
}

function incrementWrongAnswer(){
    let incorrectScore = parseInt(document.getElementById("incorrect").innerText);
        document.getElementById("incorrect").innerText = ++incorrectScore;
    
}

function displayAdditionQuestion(operand1,operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1,operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1,operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1,operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}