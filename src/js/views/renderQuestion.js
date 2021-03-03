import { elements, functionName, globalData } from "./elements";

export const renderQuestion = (data) => {
    let element = `<div class="question_container-wrapper">
    <div class="question_container">
        <p>
        ${data.question}
                    </p>
                    
        <div class="timer">${data.remainingtime} sec</div>
    </div>
</div>

<div class="option_container">
    <form id="question_form">
        
       
    </form>
</div>
<div class="button_container">
    <button id="send" >submit</button>
</div>`;

    document.querySelector(".main_container").innerHTML = element;

    for (let option in data.options) {
        let optionsHTML = ` <div class="inputGroup">
        <input id="${option}" name="radio" value='${option}' questionid="${data.questionid}" type="radio" />
        <label for="${option}">${data.options[option]}</label>
    </div>`;
        document
            .querySelector("#question_form")
            .insertAdjacentHTML("beforebegin", optionsHTML);
    }

    elements.timer = document.querySelector(".timer");
    document.querySelector("#send").addEventListener("click", () => {
        functionName.sendAnswer();
        return;
    });

    startTimer(data.remainingtime);
};

let startTimer = (remainingTimeInSec) => {
    let currentTime = remainingTimeInSec;

    //alert(currentTime);
    let timer = setInterval(() => {
        currentTime--;
        console.log(currentTime);
        console.log(elements.timer);
        elements.timer.innerHTML = `${currentTime} sec`;
    }, 1000);

    let timeOut = setTimeout(() => {
        document.querySelector("#send").disabled = true;
        document.querySelector("#send").style.background = "#ccc";
        document.querySelector("#send").style.color = "#00000066";
        clearInterval(timer);
        clearTimeout(timeOut);
    }, remainingTimeInSec * 1000);
};
