const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.DB_URI;


const app = express();

const PORT = process.env.PORT || 9000;  

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected");
    }
});

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})

const studentSchema = new mongoose.Schema({
    name: String,
    id: Number,
});

const Student = mongoose.model('Student', studentSchema);

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

const Question = mongoose.model('Question', questionSchema);

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

app.use(cors());    
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get("/api/questions", (req, res) => {
    res.send(questions);
});

app.post("/api/user", (req, res) => {
    console.log(req.body);
    


});


app.post("/api/addStudent", (req, res) => {
    let studentName = req.body.studentName;
    let studentID = req.body.studentID;
    let student = new Student({name: studentName, id: studentID});

    // see if the student already exists
    let query = Student.find({id: studentID});
    query.exec(function(err, students) {
        if (err) {
            res.send({info: "Error", status: "failed"});
        } else {
            if (students.length > 0) {
                res.send({info: "Student already exists", status: "failed"});
            } else {
                student.save(function(err) {
                    if (err) {
                        res.send({info: "Error", status: "failed"});
                    } else {
                        res.send({info: "Student added", status: "success"});
                    }
                });
            }
        }
    });

});


app.post("/api/addAdmin", (req, res) => {
    let username = req.body.adminName;
    let password = req.body.adminPassword;

    let admin = new Admin({username: username, password: password});

    // see if the student already exists
    let query = Admin.find({username});
    query.exec(function(err, admins) {
        if (err) {
            res.send({info: "Error", status: "failed"});
        } else {
            if (admins.length > 0) {
                res.send({info: "Admin already exists", status: "failed"});
            } else {
                admin.save(function(err) {
                    if (err) {
                        res.send({info: "Error", status: "failed"});
                    } else {
                        res.send({info: "Admin added", status: "success"});
                    }
                });
            }
        }
    });

});

app.post("/api/addQuestion", (req, res) => {
    let question = req.body.question;
    let answer = req.body.answer;

    let questionAndAnswer = new Question({question, answer});
    // see if the student already exists
    let query = Question.find({question});
    query.exec(function(err, questions) {
        if (err) {
            res.send({info: "Error", status: "failed"});
        } else {
            if (questions.length > 0) {
                res.send({info: "question already exists", status: "failed"});
            } else {
                questionAndAnswer.save(function(err) {
                    if (err) {
                        res.send({info: "Error", status: "failed"});
                    } else {
                        res.send({info: "question added", status: "success"});
                    }
                });
            }
        }
    });

});

app.post("/api/auth", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    // Query to find admin with given username and password
    let query = Admin.find({username, password});
    
    query.exec(function(err, admins) {
        if (err) {
            res.send({info: "Error", status: "failed"});
        } else {
            if (admins.length > 0) {
                // If admin is found, retrieve all questions
                Question.find({}, function(err, questions) {
                    if (err) {
                        res.send({info: "Error retrieving questions", status: "failed"});
                    } else {
                        res.send({
                            info: "Login successful", 
                            status: "success", 
                            questions: questions.length > 0 ? questions : []
                        });
                    }
                });
            } else {
                res.send({info: "Login failed", status: "failed"});
            }
        }
    });
});



app.post("/api/answers", (req, res) => {
    console.log(req.body);
    res.send({info: "Answers received"});
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});