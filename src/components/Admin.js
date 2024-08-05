import React, { useState} from 'react';
import './styles/styles.css';
import './styles/assessment.css';

const Admin = () => {

    const [user, setUser] = useState({ name: "", id: "" });
    const [admin, setAdmin] = useState({ username: "", password: "" });
   

    function sendUserInfo() {
        const username = document.getElementById("usernameInput").value.trim();;
        const password = document.getElementById("passwordInput").value.trim();;
        setAdmin({ username, password });

        fetch("http://localhost:9000/api/auth"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username , password}),
    })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    document.querySelector(".addStudent").style.display = "block";
                    document.querySelector(".addAdmin").style.display = "block";
                    document.querySelector(".addQuestion").style.display = "block";

                    let questionList = document.querySelector(".questionList");
                    questionList.innerHTML = "<h3>Questions</h3>";
                    data.questions.forEach((question) => {
                        console.log(question);
                        questionList.innerHTML += `<p>${question.question}</p>`;
                        questionList.innerHTML += `<p><b>${question.answer}<b></p>`;
                    });

                    let studentList = document.querySelector(".studentList");
                    studentList.innerHTML = "<h3>Students</h3>";
                    data.grades.forEach((grade) => {
                        console.log(grade);
                        studentList.innerHTML += `<p>Name: ${grade.name}</p>`;
                        studentList.innerHTML += `<p>ID: <b>${grade.id}<b></p>`;
                        studentList.innerHTML += `<p>Grade: <b>${grade.grade}<b></p>`;
                    });


                    // remove submit button
                    document.querySelector(".userInfo").style.display = "none";
                    alert("Login successful");
                }
                else {
                    alert("Login failed");
                }
                
            });


            


    }

    function sendStudentInfo() {
        const studentName = document.getElementById("studentName").value.trim();;
        const studentID = document.getElementById("studentID").value.trim();;
        fetch("http://localhost:9000/api/addStudent"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({studentName , studentID}),
    })
            .then((res) => res.json())
            .then((data) => {
                alert(data.info);
            });

            document.getElementById("studentName").value = "";
            document.getElementById("studentID").value = "";
            

    }

    function sendAdminInfo() {
        const adminName = document.getElementById("adminName").value.trim();;
        const adminPassword = document.getElementById("adminPassword").value.trim();;
        alert(adminName + " " + adminPassword);
        fetch("http://localhost:9000/api/addAdmin"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({adminName , adminPassword}),
    })
            .then((res) => res.json())
            .then((data) => {
                alert(data.info);
            });

            document.getElementById("adminName").value = "";
            document.getElementById("adminPassword").value = "";
            

    }
    
    function sendQuestionInfo() {
        const question = document.getElementById("question").value.trim();;
        const answer = document.getElementById("answer").value.trim();;
        alert(question + " " + answer);
        fetch("http://localhost:9000/api/addQuestion"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question , answer}),
    })
            .then((res) => res.json())
            .then((data) => {
                alert(data.info);
            });

            document.getElementById("question").value = "";
            document.getElementById("answer").value = "";
            

    }





    return (
        <div className="admin">
            <center>
                <h1><u>Admin Panel (WIP)</u></h1>
            </center>
            
            <div className="userInfo">
                <input type="text" id="usernameInput" placeholder="Enter your username" />
                <br />
                <input type="text" id="passwordInput" placeholder="Enter your password" />
                <br />
                <button id="loginButton" onClick={sendUserInfo}>Submit</button>

            </div>


            <div className="addStudent">
                <input type="text" id="studentName" placeholder="Enter student's name" />
                <br />
                <input type="text" id="studentID" placeholder="Enter student's id" />
                <br />
                <button onClick={sendStudentInfo}>Submit</button>

            </div>

            <div className="addAdmin">
                <input type="text" id="adminName" placeholder="Enter admin's username" />
                <br />
                <input type="text" id="adminPassword" placeholder="Enter admin's password" />
                <br />
                <button onClick={sendAdminInfo}>Submit</button>
            </div>
            
            <div className="addQuestion">
                <input type="text" id="question" placeholder="Enter question" />
                <br />
                <input type="text" id="answer" placeholder="Enter answer" />
                <br />
                <button onClick={sendQuestionInfo}>Submit</button>
            </div>


            <div className="questionList">

            </div>

            <div className="studentList">

            </div>
            

        </div>

    );

};

export default Admin;
