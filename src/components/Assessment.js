import React, { useState, useEffect, useRef } from 'react';
import './styles/styles.css';
import translate from "translate";

const Assessment = () => {

    const [spanishVoice, setSpanishVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [questions, setQuestions] = useState([]);

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
                setQuestions(data);
                //console.log(data);
            });
        


        
    }, []);

    function sendUserInfo() {
        const name = document.getElementById("nameInput").value;
        const id = document.getElementById("idInput").value;
        console.log(name, id);
        fetch("http://localhost:9000/api/user"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, id }),
    })
            .then((res) => res.json())
            .then((data) => {
                alert(data.info);
            });


            document.getElementById("nameInput").value = "";
            document.getElementById("idInput").value = "";

    }

    function submitQuestions() {
        sendUserInfo();
        const answers = [];
        for (let i = 0; i < 3; i++) {
            answers.push(document.getElementById(`answer${i}`).value);
        }
        fetch("http://localhost:9000/api/answers"
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers}),
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

            </div>


            <div>
                <h2>Question</h2>
                {/* display the first question and answer*/}
                <h3>{questions.length > 0 ? questions[0].question : "Loading..."}</h3>
                <input type="text" id="answer0" placeholder="Answer" />
                <h3>{questions.length > 0 ? questions[1].question : "Loading..."}</h3>
                <input type="text" id="answer1" placeholder="Answer" />
                <h3>{questions.length > 0 ? questions[2].question : "Loading..."}</h3>
                <input type="text" id="answer2" placeholder="Answer" />
                <br />

                <button onClick={submitQuestions}>Submit</button>

            </div>
            
            

        </div>

    );

};

export default Assessment;
