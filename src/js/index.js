import * as renderQuestion from "./views/renderQuestion";
import { elements, functionName, globalData } from "./views/elements";
import * as renderAddSlideForm from "./views/renderAddSlides";
import { renderPollScreen } from "./views/renderPollScreen";
import { renderActivePollResult } from "./views/renderActivePollResult";
import { renderPollScreenForResponder } from "./views/renderPollScreenResponder";
import { HttpConnect } from "./models/Api";
import { renderSlide } from "./views/renderSlide";

import toastr from "toastr";

let socket;

window.addEventListener("load", async () => {
    initConnection();

    if (typeof userType != undefined) {
        if (userType === "responder") {
            // render for responder
            
            document.querySelector("body").style.backgroundColor =
                "var(--student-background-color)";   #45a18c; 
            document.querySelector(".main_container").style.display = "initial";
            document.querySelector(".teacher_maincontainer-holder").remove();
            document.querySelector("nav").style.display = "flex";
            
            initResponder();
            return;
        }

        let response = await HttpConnect(
            "POST",
            `http://${endPoint}/getSlides`,
            {
                username: userName,
            }
        );
        /*
        let response = await HttpConnect("POST", endPoint, {
            getSlides: true,
            roomName: room,
        });
        */
        if (response) {
            for (let data of response) {
                globalData.addSlidesJsonData[data.questionId] = data;
                renderSlide(data.questionId);
            }
        } else {
            toastr.error("unable to get your slides from server");
        }
        /*
        document.querySelector("body").style.backgroundColor =
            "var(--main-background-color)";
        document.querySelector("nav").remove();
        document.querySelector(".main_container").remove();
        */
        initTeacherPanel();

        //render for teacher
    }
});

let initConnection = () => {
    let st = dt;
    socket = io(`${window.location.host}`, {
        query: { room: room, userType: userType, details: st },
    });

    socket.on("connect", () => {
        console.log("connected");
    });

    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });
};

let initResponder = () => {
    socket.on(`${room}-receiveQuestion`, (data) => {
        clearInterval(globalData.timer);
        clearTimeout(globalData.timeOut);
        startQuestion(data);
    });

    socket.on(`${room}-receiveAnswerWithPoll`, (poll) => {
        renderPollScreenForResponder(poll);
        renderActivePollResult(poll.poll);
    });

    return;
};

let initTeacherPanel = () => {
    elements.add_slides.addEventListener("click", () => {
        //render add slides form
        renderAddSlideForm.renderAddSlideForm();
        return;
        // open a model to add slides
    });

    socket.on(`${room}-livePolling`, (data) => {
        renderActivePollResult(data);
    });
    socket.on(`${room}-receiveAnswerWithPoll`, (poll) => {
        toastr.success("result was posted");

        // console.log(poll, "answer is received");
    });
    socket.on(`${room}-receiveQuestion`, (data) => {
        toastr.success("question was posted successfully");
    });
};

// render slides which was added using renderAddSlides
// send answer for last question

functionName.publishQuestion = (questionId) => {
    if (
        Object.keys(globalData.addSlidesJsonData[questionId].options).length < 2
    ) {
        toastr.warning("Atleast two options are required");
        return;
    }
    if (globalData.addSlidesJsonData[questionId].answer === "") {
        toastr.warning("No answer was selected");
        return;
    }
    //console.log("from publish function", questionId);
    socket.emit(
        `${room}-postQuestion`,
        globalData.addSlidesJsonData[questionId]
    );
    renderPollScreen(questionId);
};

functionName.sendAnswer = (questionId) => {
    if (document.querySelector("input[name=radio]:checked")) {
        if (globalData.lastSelected) {
            if (
                globalData.lastSelected ===
                document
                    .querySelector("input[name=radio]:checked")
                    .value.toUpperCase()
                    .trim()
            ) {
                return;
            }
        }
        let answerObj = {
            questionId,
            decrement: globalData.lastSelected
                ? globalData.lastSelected
                : false,
            increment: document
                .querySelector("input[name=radio]:checked")
                .value.toUpperCase()
                .trim(),
        };

        socket.emit(`${room}-receiveAnsWer`, answerObj);

        globalData.lastSelected = document
            .querySelector("input[name=radio]:checked")
            .value.toUpperCase()
            .trim();
        return;
    }

    return;
};

functionName.publishResult = () => {
    socket.emit(`${room}-postAnswerWithPoll`);
};

let startQuestion = (data) => {
    renderQuestion.renderQuestion(data, socket);
};

let clear = (value) => {
    socket.emit(`${room}-clearPreviousQuestion`, { id: value });
};
