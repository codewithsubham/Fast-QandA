module.exports = class Question {
    #questionid;
    #timer;
    #timeOut;
    #remainingTime;
    #io;
    #room;
    #publishedData;
    #answerPoll = {};
    #isCompleted = false;

    constructor(io, room, data) {
        this.#io = io;
        this.#room = room;
        this.#questionid = data.questionid;
        this.#timeOut = data.timeout;
        this.#publishedData = data;
        this.timerForEachQuestion(this.#timeOut);
    }

    getFinalPollWithAnswer() {
        /**
         * this function returns finalPoll
         */

        return {
            poll: this.#answerPoll,
            answer: this.#publishedData.answer,
            options: this.#publishedData.options,
            question: this.#publishedData.question,
        };
    }

    getQuestionObject() {
        //if (!this.#isCompleted) {
        return {
            isCompleted: this.#isCompleted,
            questionid: this.#questionid,
            remainingtime: this.#remainingTime,
            room: this.#room,
            question: this.#publishedData.question,
            options: this.#publishedData.options,
        };
        // }
        //return (this.#answerPoll["isCompleted"] = this.#isCompleted);
    }
    setpublishedData(answer) {
        if (this.#isCompleted) {
            return;
        }
        if (answer["decrement"]) {
            this.#answerPoll[answer["decrement"]]--;
        }
        if (!this.#answerPoll[answer["increment"]]) {
            this.#answerPoll[answer["increment"]] = 1;
            this.#io
                .to(this.#room)
                .emit(`${this.#room}-livePolling`, this.#answerPoll);
            return;
        }

        this.#answerPoll[answer["increment"]]++;
        this.#io
            .to(this.#room)
            .emit(`${this.#room}-livePolling`, this.#answerPoll);
    }
    timerForEachQuestion(timePeriod = 30) {
        this.#remainingTime = timePeriod;

        this.#timer = setInterval(() => {
            console.log(this.#remainingTime);
            this.#remainingTime--;
            if (this.#remainingTime == 0) {
                this.deleteTimers();
            }
        }, 1000);
    }

    deleteTimers() {
        this.#remainingTime = 0;
        this.#isCompleted = true;
        clearInterval(this.#timer);
    }
};
