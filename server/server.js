const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 9000;  

app.use(cors());    
app.use(express.static('public'));

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


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});