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
    }
    getQuestionObject() {
        return {
            questionid: this.#questionid,
            remainingtime: this.#remainingTime,
            room: this.#room,
            question: this.#publishedData.question,
            options: this.#publishedData.options,
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
    }

    deleteTimers() {
        clearInterval(this.#timer);
    }
};
