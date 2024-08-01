import React, { useState, useEffect, useRef } from 'react';
import './styles/styles.css';
import translate from "translate";


const Assessment = () => {

    const [spanishVoice, setSpanishVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [word, setWord] = useState('_ _ _');
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
                console.log(data);
            });
        


        
    }, []);






    return (
        <div className="assessment">
            <center>
                <h1><u>Test (WIP)</u></h1>
            </center>
            
            <div className="userInfo">
                <input type="text" placeholder="Enter your full name" />
                <br />
                <input type="text" placeholder="Enter your id number" />
                <br />
                <button>Submit</button>

            </div>


            <div>
                <h2>Question</h2>
                {/* display the first question and answer*/}
                <h3>{questions[0].question}</h3>
                <h3>Answer: {questions[0].answer}</h3>

            
            </div>
            
            

        </div>

    );

};

export default Assessment;
