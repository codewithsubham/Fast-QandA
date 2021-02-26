import * as renderQuestion from "./views/renderQuestion";
import { elements, functionName } from "./views/elements";

let socket;

window.addEventListener("load", () => {
    console.log("window loaded");
    initConnection();
    if (userType === "responder") {
        // render for responder

        return;
    }

    // render for poster
});

let initConnection = () => {
    let st =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1YmhhbSIsInBhc3N3b3JkIjoiYXNkYXNkIiwiZW1haWwiOiJzdWJoYW1wcmFzYWQ1NTJAZ21haWwuY29tIiwicGhvbmUiOiI5MjA1NTQ2MTczIiwiaWF0IjoxNjE0MzIwNTA4LCJleHAiOjE2MTY5MTI1MDh9.2yi2VY_itNL-yS0m70oioB4IzFjDjUvIG1b-gQGZTXo";
    let room = "room";

    socket = io(`${window.location.hostname}:3000`, {
        query: { room: room, userType: "admin", details: st },
    });

    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("test", (data) => {
        startQuestion(data);
    });
    socket.on(`${room}-timer`, (data) => {
        console.log(data, " seconds");
    });
    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });
};

// send answer for last question

functionName.sendAnswer = (value) => {
    console.log(
        document
            .querySelector("input[name=radio]:checked")
            .getAttribute("questionid")
    );
    return;
    document.querySelector(".container").innerHTML = `
    <iframe
    width="600"
    src="https://www.youtube.com/embed/QmdZmUoM6GQ?rel=0&showinfo=0&controls=1&autoplay=true&fullscreen=0&Settings=0"
    frameborder="0"
></iframe>`;

    // socket.emit(`${room}-receiveAnsWer`, { id: value });
};

let startQuestion = (data) => {
    renderQuestion.renderQuestion(data, socket);
};

let clear = (value) => {
    socket.emit(`${room}-clearPreviousQuestion`, { id: value });
};
