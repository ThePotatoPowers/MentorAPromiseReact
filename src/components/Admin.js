import React, { useState} from 'react';
import './styles/styles.css';
import './styles/assessment.css';

const Admin = () => {

    const [user, setUser] = useState({ name: "", id: "" });
    const [admin, setAdmin] = useState({ username: "", password: "" });
   

    function sendUserInfo() {
        const username = document.getElementById("usernameInput").value;
        const password = document.getElementById("passwordInput").value;
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
        const studentName = document.getElementById("studentName").value;
        const studentID = document.getElementById("studentID").value;
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
        const adminName = document.getElementById("adminName").value;
        const adminPassword = document.getElementById("adminPassword").value;
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
        const question = document.getElementById("question").value;
        const answer = document.getElementById("answer").value;
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
            

        </div>

    );

};

export default Admin;
