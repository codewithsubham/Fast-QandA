import { elements, functionName, globalData } from "./elements";
import { renderEditSlideForm } from "./renderEditForm";
import { HttpConnect } from "../models/Api";

import toastr from "toastr";

export const renderSlide = (questionId) => {
    if (globalData.addSlidesJsonData[questionId].question.trim() === "") {
        toastr.error("question was not provided");
        return false;
    }
    //https://www.youtube.com/watch?v=5FndZ_hoeGU
    let src = `https://www.youtube.com/embed/${globalData.addSlidesJsonData[
        questionId
    ].media_source.trim()}?rel=0&showinfo=0&autohide=1&modestbranding=0&controls=0&frameborder=0&autoplay=false&controls=0&fullscreen=0&Settings=0`;
    //frameborder = "0";
    let iframe = "";
    if (globalData.addSlidesJsonData[questionId].media_source.trim() !== "") {
        iframe = `<iframe
        width="100%"
        src="${src}"
        frameborder="0"
    ></iframe>`;
    }

    let htmlElement = ` <div class="slides slide-${questionId}">
                        <div class="content">
                                ${iframe}
                        </div>
                        <div class="question">
                        <p class="slide_question_id-${questionId}">
                            ${globalData.addSlidesJsonData[
                                questionId
                            ].question.trim()}
                            </p>
                            <button id="play_slides">
                                <svg
                                    class="create_icon location_icon"
                                    data-item="embedcode"
                                >
                                    <use
                                        xlink:href="img/svg/sprite.svg#icon-send"
                                        data-item="embedcode"
                                    ></use>
                                </svg>
                            </button>
                            <button id="edit_slides">
                                <svg
                                    class="create_icon location_icon"
                                    data-item="embedcode"
                                >
                                    <use
                                        xlink:href="img/svg/sprite.svg#icon-edit"
                                        data-item="embedcode"
                                    ></use>
                                </svg>
                            </button>
                        </div></div>`;

    elements.slides_holder.insertAdjacentHTML("afterbegin", htmlElement);

    document.querySelector("#play_slides").addEventListener("click", () => {
        functionName.publishQuestion(questionId);
    });
    document.querySelector("#edit_slides").addEventListener("click", () => {
        renderEditSlideForm(questionId);
    });
    return true;
};
