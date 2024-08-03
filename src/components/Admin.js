import React, { useState, useEffect, useRef } from 'react';
import './styles/styles.css';
import './styles/assessment.css';
import translate from "translate";

const Admin = () => {

    const [verified, setVerified] = useState(false);
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
                    // remove submit button
                    document.getElementById("loginButton").style.display = "none";
                }
                else {
                    alert("Login failed");
                }
                
            });


            document.getElementById("usernameInput").value = "";
            document.getElementById("passwordInput").value = "";


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
            
            

        </div>

    );

};

export default Admin;
