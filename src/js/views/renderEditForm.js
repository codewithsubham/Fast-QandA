import { elements, globalData, functionName } from "./elements";

export const renderEditSlideForm = (questionId) => {
    console.log(questionId, "from edit form");
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

    <div class="option_container">
        ${mediaSourceElement}
        <div class="inputGroup-toolbar">
            <input type="text" name="A" id="A"  value="${globalData.addSlidesJsonData[questionId].A}"
            />
        </div>
        <div class="inputGroup-toolbar">
            <input type="text" name="B" id="B"  value="${globalData.addSlidesJsonData[questionId].B}"/>
        </div>
        <div class="inputGroup-toolbar">
            <input type="text" name="C" id="C" value="${globalData.addSlidesJsonData[questionId].C}" />
        </div>

        <div class="inputGroup-toolbar">
            <input type="text" name="D" id="D" value="${globalData.addSlidesJsonData[questionId].D}" />
        </div>
    </div>
    <div class="button_container">
        <button id="send" >
            <svg  class="create_icon location_icon">
                <use xlink:href="img/svg/sprite.svg#icon-send" ></use>
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
    functionName.publishQuestion(questionId);
};

let update = (questionId) => {
    let allInputs = [
        ...document.querySelectorAll(
            ".question_action--container input , textarea"
        ),
    ];

    allInputs.map((element) => {
        if (element.name === "question") {
            document.querySelector(
                `.slide_question_id-${questionId}`
            ).innerHTML = element.value;
        }
        globalData.addSlidesJsonData[questionId][
            element.name
        ] = element.value.trim();
    });
};
