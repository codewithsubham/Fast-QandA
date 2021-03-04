import { elements, functionName, globalData } from "./elements";

export const renderQuestion = (data) => {
    console.log(data, "from renderQuestion");
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
        <input id="${option}" name="radio" value='${option}' questionid="${data.questionid}" type="radio" />
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
    console.log(remainingTimeInSec, "time was given");
    let timer = document.querySelector(".timer");
    let currentTime = remainingTimeInSec;

    //alert(currentTime);
    globalData.timer = setInterval(() => {
        currentTime--;
        timer.innerHTML = `${currentTime} sec`;
        if (currentTime <= 0) {
            clearInterval(globalData.timer);
            //clearTimeout(globalData.timeOut);
            console.log(currentTime, "left time");
            document.querySelector("#send").disabled = true;
            document.querySelector("#send").style.background = "#ccc";
            document.querySelector("#send").style.color = "#00000066";
        }
    }, 1000);

    // globalData.timeOut = setTimeout(() => {}, remainingTimeInSec * 1000);
};
