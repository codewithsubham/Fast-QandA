import * as renderQuestion from "./views/renderQuestion";
import { elements, functionName, globalData } from "./views/elements";
import * as renderAddSlideForm from "./views/renderAddSlides";
import { renderPollScreen } from "./views/renderPollScreen";

let socket;

window.addEventListener("load", () => {
    initConnection();
    if (typeof userType != undefined) {
        if (userType === "responder") {
            // render for responder

            document.querySelector(".main_container").style.display = "initial";
            document.querySelector(".teacher_maincontainer-holder").remove();
            document.querySelector("nav").style.display = "flex";
            initResponder();
            return;
        }
        document.querySelector("nav").remove();
        document.querySelector(".main_container").remove();

        initTeacherPanel();

        //render for teacher
    }
});

let initConnection = () => {
    let st =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1YmhhbSIsInBhc3N3b3JkIjoiYXNkYXNkIiwiZW1haWwiOiJzdWJoYW1wcmFzYWQ1NTJAZ21haWwuY29tIiwicGhvbmUiOiI5MjA1NTQ2MTczIiwiaWF0IjoxNjE0MzIwNTA4LCJleHAiOjE2MTY5MTI1MDh9.2yi2VY_itNL-yS0m70oioB4IzFjDjUvIG1b-gQGZTXo";

    socket = io(`${window.location.hostname}:3000`, {
        query: { room: room, userType: userType, details: st },
    });

    socket.on("connect", () => {
        console.log("connected");
    });

    socket.on(`${room}-timer`, (data) => {
        console.log(data, " seconds");
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
        console.log(data, "live polling");
    });
};

// render slides which was added using renderAddSlides
// send answer for last question

functionName.publishQuestion = (questionId) => {
    console.log("from publish function", questionId);
    socket.emit("room-postQuestion", globalData.addSlidesJsonData[questionId]);
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

let startQuestion = (data) => {
    renderQuestion.renderQuestion(data, socket);
};

let clear = (value) => {
    socket.emit(`${room}-clearPreviousQuestion`, { id: value });
};
