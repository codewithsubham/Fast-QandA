import { elements, globalData, functionName } from "./elements";

let renderOptions = (option, color = "var(--svg-color)") => {
    let optionElement = ` <div class="option_progress">
<div class="option_container" id="${option}_percent">0%</div>
<div class="progress-container">
    <div id="${option}_bar" style="
    background-color:${color};
" class="progress"></div>
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
        if (option === globalData.addSlidesJsonData[questionId].answer) {
            document
                .querySelector(".progess_option_container")
                .insertAdjacentHTML(
                    "beforeend",
                    renderOptions(option, "var(--secondary-color)")
                );
            continue;
        }
        document
            .querySelector(".progess_option_container")
            .insertAdjacentHTML("beforeend", renderOptions(option));
    }

    return;
};
