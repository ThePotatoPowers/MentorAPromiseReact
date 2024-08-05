import React, { useState, useEffect, useRef } from 'react';
import './styles/styles.css';
import './styles/assessment.css';
import translate from "translate";

const Assessment = () => {

    const [spanishVoice, setSpanishVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({ name: "", id: "" });

   const loadVoices = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        
        const english = voices.find(voice => voice.name.includes('Google US English'));
        if (!english) {
            setEnglishVoice(voices.find(voice => voice.lang.includes('en')));
        }
        else {
            setEnglishVoice(english);

        }

        const spanishVoice = voices.find(voice => voice.name.includes('Google español'));
        if (!spanishVoice) {
            setSpanishVoice(voices.find(voice => voice.lang.includes('es')));
        }
        else{
            setSpanishVoice(spanishVoice);

        }
    };


    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        fetch("http://localhost:9000/api/questions")
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.questions);
                let questionList = document.querySelector(".questions")
                data.questions.forEach((question, index) => {
                    let questionDiv = document.createElement("div");
                    questionDiv.className = "questionDiv";
                    questionDiv.innerHTML = `<h2>${question.question}</h2>`;
                    let answerInput = document.createElement("input");
                    answerInput.id = `answer${index}`;
                    answerInput.placeholder = "Enter your answer here";
                    questionDiv.appendChild(answerInput);
                    questionList.appendChild(questionDiv);

                    //console.log(question);
                });
                //console.log(data);
            });
        


        
    }, []);

    function sendUserInfo() {
        const name = document.getElementById("nameInput").value.trim();
        const id = document.getElementById("idInput").value.trim();;
        setUser({ name, id });
        fetch("http://localhost:9000/api/user"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name , id}),
    })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "failed") {
                    alert("Student not found");
                    return;
                }
                document.getElementById("nameTitle").innerText = `Welcome ${data.student.name}`;
                document.querySelector(".questions").style.display = "block";
                document.getElementById("submitQuestions").style.display = "block";
            });


            document.getElementById("nameInput").value = "";
            document.getElementById("idInput").value = "";

    }

    function submitQuestions() {
        const answers = [];
        questions.forEach((question, index) => {
            const answer = document.getElementById(`answer${index}`).value.trim();;
            answers.push({ question: question.question, answer});
        });
        fetch("http://localhost:9000/api/answers"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers, user }),
    })
            .then((res) => res.json())
            .then((data) => {
                alert(data.info);
            });


    

    }





    return (
        <div className="assessment">
            <center>
                <h1><u>Test (WIP)</u></h1>
            </center>
            
            <div className="userInfo">
                <input type="text" id="nameInput" placeholder="Enter your full name" />
                <br />
                <input type="text" id="idInput" placeholder="Enter your id number" />
                <br />
                <button onClick={sendUserInfo}>Submit</button>

            </div>

            <h2 id="nameTitle"></h2>

            <div className="questions">
                
                <h2>Questions: </h2>
                {/* display the first question and answer*/}
                

                

                

            </div>
            <center>
                <button id="submitQuestions" onClick={submitQuestions}>Submit</button>

            </center>
            

        </div>

    );

};

export default Assessment;
