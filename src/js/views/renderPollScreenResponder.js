import { globalData, elements } from "./elements";
import { renderActivePollResult } from "./renderActivePollResult";

let progressResultElement = (option, options, color = "#D15A2A") => {
    let progress = `  <div class="option_progress--wrapper">
    <p>${options}</p>
    <div class="option_progress">
        <div class="option_container" id="${option}_percent" style="color:${color}">
            0%
        </div>
        <div class="progress-container">
            <div
                id="${option}_bar"
                style="background-color:${color};width:0%"
                class="progress"
            ></div>
        </div>
    </div>
</div>`;

    return progress;
};

export const renderPollScreenForResponder = (data) => {
    let studentPollScreen = `<div class="poll_holder">
    <div class="last_question_poll">
        <div class="progess_option_container">
            <div class="question_container">
                <p>
                   ${data.question}
                </p>
            </div>
         </div>
    </div>
</div>`;

    document.querySelector(".main_container").innerHTML = studentPollScreen;
    for (let option in data.options) {
        if (option === data.answer) {
            document
                .querySelector(".main_container .progess_option_container")
                .insertAdjacentHTML(
                    "beforeend",
                    progressResultElement(
                        option,
                        data.options[option],

                        "var(--student-secondary-color)"
                    )
                );
        } else {
            document
                .querySelector(".main_container .progess_option_container")
                .insertAdjacentHTML(
                    "beforeend",
                    progressResultElement(option, data.options[option])
                );
        }
    }

    renderActivePollResult(data.poll);
};
