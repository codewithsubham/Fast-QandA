module.exports = class Question {
    #questionID = "123123";
    #timer;
    #timeOut;
    #remainingTime;
    #io;
    #room;

    constructor(io, room) {
        this.#io = io;
        this.#room = room;
        this.timerForEachQuestion();
    }
    getQuestionObject() {
        return {
            questionid: this.#questionID,
            remainingtime: this.#remainingTime,
            room: this.#room,
            question:
                "Which of the following is not a correct statement about Bitumen?",
            options: {
                a:
                    "It’s a mixture of highly condensed polycyclic aromatic compounds",
                b: "Its is soluble in Carbon Disulphide",
                c: "SARA analysis is used to determine bitumen chemistry",
                d: "All of above are correct statements",
            },
        };
    }
    timerForEachQuestion(timePeriod = 50) {
        this.#remainingTime = timePeriod;

        this.#timer = setInterval(() => {
            console.log(this.#remainingTime);
            this.#remainingTime--;
        }, 1000);

        this.#timeOut = setTimeout(() => {
            console.log("Clearing");
            this.#remainingTime = 0;
            clearInterval(this.#timer);
            clearTimeout(this.#timeOut);
        }, timePeriod * 1000);
    }

    deleteTimers() {
        clearInterval(this.#timer);
        clearTimeout(this.#timeOut);
    }
};
