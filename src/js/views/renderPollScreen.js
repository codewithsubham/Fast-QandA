import { elements, globalData, functionName } from "./elements";

let renderOptions = (option) => {
    let optionElement = ` <div class="option_progress">
<div class="option_container" id="${option}_percent">${option}</div>
<div class="progress-container">
    <div id="${option}_bar"
        class="progress"
      ></div>
</div>
</div>`;

    return optionElement;
};

export const renderPollScreen = (questionId) => {
    console.log(
        globalData.addSlidesJsonData[questionId],
        "from polling screen"
    );

    let element = `       <div class="last_question_poll">
    <div class="header_holder">
       ${globalData.addSlidesJsonData[questionId].question}
    </div>
    <div class="progess_option_container">    
   
    </div>

    <div class="publish_result">
        <button id="publish_result">publish</button>
    </div>
</div>
</div>`;
    elements.poll_holder.innerHTML = element;
    for (let option in globalData.addSlidesJsonData[questionId].options) {
        document
            .querySelector(".progess_option_container")
            .insertAdjacentHTML("beforeend", renderOptions(option));
    }

    return;
};
