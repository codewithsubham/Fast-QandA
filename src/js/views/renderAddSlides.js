import { elements, globalData, functionName } from "./elements";
import { v4 as uuidv4 } from "uuid";

import { renderSlide } from "./renderSlide";

export const renderAddSlideForm = () => {
    let element = ` <div class="add_slides_form-container">
    <div class="add_slides-form">
        <div class="slides">
            <div class="form_slides-question-container">
                <div class="label label_position">
                    <label for="question_1">media source</label>
                </div>
                <textarea
                    type="text"
                    name="media_source"
                    id="media_source"
                    style="resize: none"
                ></textarea>
            </div>
            <div class="form_slides-question-container">
                <div class="label label_position">
                    <label for="question_1">Question</label>
                </div>
                <textarea
                    id="question_1"
                    name="question"
                    style="resize: none"
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
                    name="d"
                    placeholder="option D"
                />
            </div>
        </div>
        <div class="form_button">
            <button id="save_slides" class="slides_botton-add">Add</button>
            <button id="save_slides" class="slides_botton-close">Close</button>
        </div>
       
    </div>
</div>`;
    elements.section_1.insertAdjacentHTML("afterbegin", element);
    document
        .querySelector(".slides_botton-add")
        .addEventListener("click", (e) => {
            let id = uuidv4();
            let tempObj = {};
            globalData.addSlidesJsonData[uuidv4()];
            let x = [
                ...e.target.parentNode.parentNode.parentNode.querySelectorAll(
                    ".slides input ,  textarea"
                ),
            ];
            x.map((element) => {
                tempObj[element.name] = element.value;
            });
            globalData.addSlidesJsonData[id] = tempObj;
            // renderSlide is function to add slides to page from addSlides Form
            renderSlide(id);
        });
    document
        .querySelector(".slides_botton-close")
        .addEventListener("click", (e) => {
            console.log(e.target.parentNode.parentNode.parentNode.remove());
        });
    return;
};