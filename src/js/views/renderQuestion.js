import { elements, functionName, globalData } from "./elements";

export const renderQuestion = (data) => {
    clearInterval(globalData.timer);
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
        <input id="${option}" name="radio" value='${option}' questionid="${data.questionId}" type="radio" />
        <label for="${option}">${data.options[option]}</label>
    </div>`;
        document
            .querySelector("#question_form")
            .insertAdjacentHTML("beforebegin", optionsHTML);
    }

    globalData.lastSelected = undefined;
    document.querySelector("#send").addEventListener("click", () => {
        functionName.sendAnswer(123123);
        return;
    });

    startTimer(data.remainingtime);
};

let startTimer = (remainingTimeInSec) => {
    let timer = document.querySelector(".timer");
    let currentTime = remainingTimeInSec;

    //alert(currentTime);
    if (remainingTimeInSec > 0) {
        globalData.timer = setInterval(() => {
            if (currentTime == 0) {
                clearInterval(globalData.timer);
                //clearTimeout(globalData.timeOut);
                document.querySelector("#send").disabled = true;
                document.querySelector("#send").style.background = "#ccc";
                document.querySelector("#send").style.color = "#00000066";
                timer.innerHTML = `${currentTime} sec`;
                return;
            }
            currentTime--;
            timer.innerHTML = `${currentTime} sec`;
        }, 1000);

        return;
    }

    document.querySelector("#send").disabled = true;
    document.querySelector("#send").style.background = "#ccc";
    document.querySelector("#send").style.color = "#00000066";
    // globalData.timeOut = setTimeout(() => {}, remainingTimeInSec * 1000);
};
