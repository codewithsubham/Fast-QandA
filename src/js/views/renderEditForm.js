import { elements, globalData, functionName } from "./elements";
import { renderSelectAnswer } from "./renderSelectAnswer";

export const renderEditSlideForm = (questionId) => {
    let mediaSourceElement = "";
    if (globalData.addSlidesJsonData[questionId].media_source !== "") {
        mediaSourceElement = `<div class="inputGroup-toolbar">
        <input type="text" name="media_source" id="media_source" value="${globalData.addSlidesJsonData[questionId].media_source}"/> </div>  `;
    }

    let element = `<div class="question_action--container">
    <div class="question_container-wrapper">
        <div class="question_container">
            <textarea name="question" rows="6">${globalData.addSlidesJsonData[questionId].question}</textarea>

            <input type="number" name="timeout" min="30" max="90" class="timer" value="${globalData.addSlidesJsonData[questionId].timeout}"
            />
        </div>
    </div>

    <div class="option_container ">
        ${mediaSourceElement}
        <select id="answer_selector">
        <option value="" selected disabled>Update answer</option>
        </select>  
    </div>

    
    <div class="button_container">
        <button id="send" >
            <svg  class="create_icon location_icon">
                <use xlink:href="img/svg/sprite.svg#icon-send" ></use>
            </svg>
        </button>
        <button id="addoptions" >
        <svg class="create_icon location_icon">
            <use xlink:href="img/svg/sprite.svg#icon-add"></use>
        </svg>
    </button>
        <button id="update" >
            <svg class="create_icon location_icon">
                <use xlink:href="img/svg/sprite.svg#icon-update"></use>
            </svg>
        </button>
        <button id="delete" >
            <svg class="create_icon location_icon">
                <use xlink:href="img/svg/sprite.svg#icon-delete"></use>
            </svg>
        </button>
        <button id="close" >
            <svg class="create_icon location_icon">
                <use xlink:href="img/svg/sprite.svg#icon-close"></use>
            </svg>
        </button>
      
    </div>
</div>`;
    elements.edit_form.innerHTML = element;
    for (let option in globalData.addSlidesJsonData[questionId].options) {
        let optionHtml = `<div class="inputGroup-toolbar">
            <input type="textoption" name="${option}" id="${option}" value="${globalData.addSlidesJsonData[questionId].options[option]}" />
        </div>`;

        let optionElement;
        document
            .querySelector(".question_action--container .option_container")
            .insertAdjacentHTML("beforeend", optionHtml);

        if (option === globalData.addSlidesJsonData[questionId].answer) {
            optionElement = `<option value="${option}" selected >${option} is the answer</option>`;
        } else {
            optionElement = `<option value="${option}" >${option} is the answer</option>`;
        }
        document
            .querySelector("#answer_selector")
            .insertAdjacentHTML("beforeend", optionElement);
    }

    document
        .querySelector("#answer_selector")
        .addEventListener("focus", (e) => {
            renderSelectAnswer(
                e,
                ".question_action--container input[type=textoption]",
                globalData.addSlidesJsonData[questionId].answer
            );
        });

    document
        .querySelector("#delete")
        .addEventListener("click", deleteSlide.bind(null, questionId), {
            once: true,
        });

    document
        .querySelector("#send")
        .addEventListener("click", send.bind(this, questionId));
    document
        .querySelector("#update")
        .addEventListener("click", update.bind(this, questionId));
    document
        .querySelector("#close")
        .addEventListener("click", close, { once: true });
    document.querySelector("#addoptions").addEventListener("click", addoption);
    return;
};

let deleteSlide = (questionId, e) => {
    document.querySelector(`.slide-${questionId}`).remove();
    document.querySelector(".question_action--container").remove();
};
let close = () => {
    document.querySelector(".question_action--container").remove();
};
let send = (questionId, e) => {
    update(questionId);
    renderEditSlideForm(questionId);
    functionName.publishQuestion(questionId);
};

let update = (questionId) => {
    let inputFeilds = [
        ...document.querySelectorAll(
            ".question_action--container textarea , input[type=number] , input[type=text]"
        ),
    ];
    let options = [
        ...document.querySelectorAll(
            ".question_action--container input[type=textoption]"
        ),
    ];

    inputFeilds.map((element) => {
        if (element.name === "question") {
            document.querySelector(
                `.slide_question_id-${questionId}`
            ).innerHTML = element.value;
        }
        globalData.addSlidesJsonData[questionId][
            element.name
        ] = element.value.trim();
    });

    let index = 0;
    let optionsObj = {};

    for (let element of options) {
        if (index > 25) {
            return;
        }
        if (element.value.trim() == "") {
            continue;
        }
        optionsObj[String.fromCharCode(index + 65)] = element.value.trim();
        ++index;
    }
    globalData.addSlidesJsonData[questionId].options = optionsObj;
    globalData.addSlidesJsonData[questionId].answer = document.querySelector(
        ".option_container select"
    ).value;

    console.log(globalData.addSlidesJsonData[questionId], "from update");
    renderEditSlideForm(questionId);
};

let addoption = () => {
    let inputHtml = `<div class="inputGroup-toolbar">
    <input type="textoption"  value="" />
</div>`;
    document
        .querySelector(".question_action--container .option_container")
        .insertAdjacentHTML("beforeend", inputHtml);
};
