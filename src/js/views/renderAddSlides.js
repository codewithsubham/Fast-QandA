import { elements, globalData, functionName } from "./elements";
import { v4 as uuidv4 } from "uuid";

import { renderSlide } from "./renderSlide";

export const renderAddSlideForm = () => {
    let id = `${room}_${uuidv4()}`;
    let element = ` <div class="add_slides_form-container"><header>
    <p>Add Slide</p>
    <button id="save_slides" class="slides_botton-close">
        <svg class="create_icon location_icon">
            <use xlink:href="img/svg/sprite.svg#icon-close"></use>
        </svg>
    </button>
</header>
    <div class="add_slides-form">
        <div class="slides">
            <div class="form_slides-question-container">
                <textarea
                    type="text"
                    name="media_source"
                    id="media_source"
                    style="resize: none"
                    placeholder="Media source if available"
                ></textarea>
            </div>
            <div class="form_slides-question-container">
                <textarea
                    id="question_1"
                    name="question"
                    style="resize: none"
                    placeholder="write your question"
                ></textarea>
            </div>
            <div class="form_slides-option-container">
                <input
                    type="text"
                    name="A"
                    placeholder="option A"
                />
                <input
                    type="text"
                    name="B"
                    placeholder="option B"
                />
                <input
                    type="text"
                    name="C"
                    placeholder="option C"
                />
                <input
                    type="text"
                    name="D"
                    placeholder="option D"
                />
                <select id="options_selector">
                     <option value="" disabled selected>Please provide ans *</option>
                </select>
            </div>
        </div>
        <div class="form_button">
            <button id="save_slides" class="slides_botton-add" >Add</button>
            
        </div>
       
    </div>
</div>`;
    elements.section_1.insertAdjacentHTML("afterbegin", element);

    document
        .querySelector("#options_selector")
        .addEventListener("focus", (e) => {
            e.target.innerHTML = "";
            e.target.insertAdjacentHTML(
                "afterbegin",
                `<option value="false" disabled selected>Select your option</option>`
            );
            let index = 0;
            for (let element of e.target.parentNode.querySelectorAll(
                ".slides input"
            )) {
                if (index > 25) {
                    return;
                }
                if (element.value.trim() == "") {
                    continue;
                }

                e.target.insertAdjacentHTML(
                    "beforeend",
                    `<option value="${String.fromCharCode(
                        index + 65
                    )}">${String.fromCharCode(index + 65)}</option>`
                );

                ++index;
            }
        });

    document
        .querySelector(".slides_botton-add")
        .addEventListener("click", (e) => {
            let tempObj = { options: {} };
            let textAreaValue = [
                ...document
                    .querySelector(".add_slides_form-container")
                    .querySelectorAll(".slides textarea"),
            ];

            let options = [
                ...document
                    .querySelector(".add_slides_form-container")
                    .querySelectorAll(".slides input"),
            ];
            textAreaValue.map((element) => {
                tempObj[element.name] = element.value.trim();
            });
            let index = 0;
            for (let element of options) {
                if (index > 25) {
                    return;
                }
                if (element.value.trim() == "") {
                    continue;
                }
                tempObj.options[String.fromCharCode(index + 65)] =
                    element.value;
                ++index;
            }

            tempObj["timeout"] = 30;
            tempObj["questionid"] = id;
            tempObj["answer"] = document.querySelector(
                ".add_slides_form-container select"
            ).value;

            globalData.addSlidesJsonData[id] = tempObj;

            // renderSlide is function to add slides to page from addSlides Form
            if (renderSlide(id)) {
                console.log(globalData.addSlidesJsonData[id], "checking");
                e.target.parentNode.parentNode.parentNode.remove();
            }
        });

    document.querySelector(".slides_botton-close").addEventListener(
        "click",
        (e) => {
            console.log(e.target, e.target.parentNode.parentNode.parentNode);
            e.target.parentNode.parentNode.remove();
        },
        true
    );

    document.querySelector("input").addEventListener("change", (e) => {
        console.log(e.target);
    });
    return;
};
