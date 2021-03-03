const app = require("express")();
const jwt = require("jsonwebtoken");
const { text } = require("express");
const Question = require("./model/Question");
const server = require("http").createServer(app);

// token shoud be changed every week or day but for now it is hardcoded
const SECRET_KEY = "VISION_SECRET_KEY_(@_@)";

let questionObject = {};

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["*"],
    },
});

/**
 * use a caching server or db or inMemory storage
 * to last quesion
 */

io.use(function (socket, next) {
    if (socket.handshake.query.details) {
        jwt.verify(
            socket.handshake.query.details,
            SECRET_KEY,
            (err, decoded) => {
                console.log("code expired");
                if (err) return next(new Error("Authentication failed"));
                //socket decoded stores decoded data from jwt token
                socket.decoded = decoded;
                next();
            }
        );
        return;
    } else {
        next(new Error("authentication token missing"));
    }
    next(new Error("Authentication failed"));
});

io.on("connection", (socket, err) => {
    // get the room name  and other details
    let room = socket.handshake.query.room;

    // either it can be student or teacher
    let userType = socket.handshake.query.userType;
    // join inside a room
    socket.join(room);

    // if user type is admin (teacher) then broadcast to all student that teacher is online
    if (userType === "admin") {
        socket.broadcast.to(room).emit(room, "teacher is online");
    }

    //io.to(room).emit(room, "teacher is online");
    // send question to all student

    socket.on(`${room}-postQuestion`, (data) => {
        questionObject[room] = new Question(io, room, data);
        io.to(room).emit(
            `${room}-receiveQuestion`,
            questionObject[room].getQuestionObject()
        );
    });

    // ${room}-receiveAnswer receive answer from all students
    socket.on(`${room}-receiveAnsWer`, (data) => {
        // total all the number answer and broadcast to every on
        //store the data
        // console.log(data + "from students from room" + room);
        // if any question has been posted the
        // then delete that previous object and also delete timer
        if (room in questionObject) {
            questionObject.room.deleteTimers();
            delete questionObject.room;
        }
        questionObject.room = new Question(io, room);
        questionObject.room.timerForEachQuestion();
    });

    // ${room}-postAnswerWithPoll will  answer the last question's with students poll
    /**
     * a :40% , b:30% , c:10% ,d:20%
     */

    socket.on(`${room}-postAnswerWithPoll`, (data) => {
        io.to(room).emit(`${room}-receiveAnswerWithPoll`, data);
    });

    socket.on(`${room}-clearPreviousQuestion`, (data) => {
        if (room in questionObject) {
            questionObject.room.deleteTimers();
            delete questionObject.room;
        }
    });

    // handle disconnect users
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(3000, () => {
    console.log("running on 3000");
});

app.post("/vision-fastQ&A/webtoken", (req, res) => {
    let userDetails = {
        username: "subham",
        password: "asdasd",
        email: "subhamprasad552@gmail.com",
        phone: "9205546173",
    };

    jwt.sign(userDetails, SECRET_KEY, { expiresIn: "30d" }, (err, token) => {
        if (err) res.sendStatus(501);
        res.json({
            token,
        });
    });
});
