module.exports = class Question {
    #questionID = "";
    #timer;
    #timeOut;
    #reamingTime;
    #io;
    #room;

    #questionObject = {
        questionid: this.#questionID,
        timer: this.#timer,
        room: this.#room,
    };

    constructor(io, room) {
        console.log("constructed");
        this.#io = io;
        this.#room = room;
    }

    timerForEachQuestion(timePeriod = 30) {
        timePeriod += 1;
        this.#reamingTime = 1;

        this.#timer = setInterval(() => {
            this.#io
                .to(this.#room)
                .emit(`${this.#room}-timer`, this.#reamingTime);
            console.log(this.#reamingTime);
            this.#reamingTime++;
        }, 1000);

        this.#timeOut = setTimeout(() => {
            console.log("Clearing");
            clearInterval(this.#timer);
            clearTimeout(this.#timeOut);
        }, timePeriod * 1000);
    }

    deleteTimers() {
        clearInterval(this.#timer);
        clearTimeout(this.#timeOut);
    }
};
