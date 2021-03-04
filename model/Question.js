module.exports = class Question {
    #questionid;
    #timer;
    #timeOut;
    #remainingTime;
    #io;
    #room;
    #publishedData;
    constructor(io, room, data) {
        this.#io = io;
        this.#room = room;
        this.#questionid = data.questionid;
        this.#timeOut = data.timeout;
        this.#publishedData = data;
        this.timerForEachQuestion(this.#timeOut);
        console.log(data, "from constructor");
    }
    getQuestionObject() {
        return {
            questionid: this.#questionid,
            remainingtime: this.#remainingTime,
            room: this.#room,
            question: this.#publishedData.question,
            options: {
                A: this.#publishedData.A,
                B: this.#publishedData.B,
                C: this.#publishedData.C,
                D: this.#publishedData.D,
            },
        };
    }
    timerForEachQuestion(timePeriod = 30) {
        this.#remainingTime = timePeriod;

        this.#timer = setInterval(() => {
            console.log(this.#remainingTime);
            this.#remainingTime--;
            if (this.#remainingTime <= 0) {
                console.log("Clearing", this.#remainingTime);
                this.#remainingTime = 0;
                clearInterval(this.#timer);
            }
        }, 1000);

        /* this.#timeOut = setTimeout(() => {
            clearTimeout(this.#timeOut);
        }, timePeriod * 1000);*/
    }

    deleteTimers() {
        clearInterval(this.#timer);
        // clearTimeout(this.#timeOut);
    }
};
