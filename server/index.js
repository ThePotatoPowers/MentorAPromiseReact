const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.MONGODB_URI;


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

const gradeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    grade: Number,
});

const Grade = mongoose.model('Grade', gradeSchema);


app.use(cors());    
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/api/questions", (req, res) => {
    Question.find({}, function(err, questions) {
        if (err) {
            res.send({info: "Error retrieving questions", status: "failed"});
        } else {
            res.send({info: "Questions retrieved", status: "success", questions: questions});
        }
    });
});

app.post("/api/user", (req, res) => {
    let name = req.body.name;
    let id = req.body.id;
    
    // Query to find admin with given username and password
    let query = Student.find({name, id});
    
    query.exec(function(err, students) {
        if (err) {
            res.send({info: "Error", status: "failed"});
        } else {
            if (students.length > 0) {
                res.send({info: "Login successful", status: "success", student: students[0]});
            } else {
                res.send({info: "Login failed", status: "failed", student: {name: "", id: ""}});
            }
        }
    });
    


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
                        Grade.find({}, function(err, grades) {
                            if (err) {
                                res.send({info: "Error retrieving grades", status: "failed"});
                            } else {
                                console.log(grades);
                                res.send({
                                    info: "Login successful", 
                                    status: "success", 
                                    questions: questions.length > 0 ? questions : [],
                                    grades: grades
                                });
                            }
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
    let answers = req.body.answers;
    let name = req.body.user.name;
    let studentID = req.body.user.id;
    
    let correctAnswers = 0;
    let totalQuestions = answers.length;

    // Create an array of promises for all the queries
    let queryPromises = answers.map((answer) => {
        return Question.findOne({ question: answer.question }).exec()
            .then((question) => {
                if (question && question.answer.toLowerCase().trim() === answer.answer.toLowerCase().trim()) {
                    correctAnswers++;
                }
            })
            .catch((err) => {
                console.log("Error fetching question:", err);
            });
    });

    // Wait for all queries to complete
    Promise.all(queryPromises)
        .then(() => {
            res.send({ info: `You got ${correctAnswers} out of ${totalQuestions} correct`, status: "success" });

            let grade = new Grade({ name, id: studentID, grade: correctAnswers / totalQuestions * 100 });

            // Update or insert grade
            Grade.findOneAndUpdate(
                { id: studentID },
                { name: name, id: studentID, grade: correctAnswers / totalQuestions * 100 },
                { upsert: true, new: true, setDefaultsOnInsert: true },
                function(err, result) {
                    if (err) {
                        console.log("Error saving grade:", err);
                    } else {
                        console.log("Grade saved:", result);
                    }
                }
            );
        })
        .catch((err) => {
            res.send({ info: "Error processing answers", status: "failed" });
        });
    });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});