const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 9000;  

app.use(cors());    
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const questions = [
    {
        id: 1,
        question: "What is your name?",
        answer: "My name is John Doe"
    },
    {
        id: 2,
        question: "What is your age?",
        answer: "I am 25 years old"
    },
    {
        id: 3,
        question: "What is your location?",
        answer: "I am from New York"
    }
]


app.get("/api/questions", (req, res) => {
    res.send(questions);
});

app.post("/api/user", (req, res) => {
    console.log(req.body);
    res.send({info: "User data received"});

});

app.post("/api/answers", (req, res) => {
    console.log(req.body);
    res.send({info: "Answers received"});
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});