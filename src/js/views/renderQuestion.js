import { elements, functionName } from "./elements";

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
};
