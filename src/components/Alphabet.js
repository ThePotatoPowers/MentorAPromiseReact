import React, { useState, useEffect, useRef } from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import './styles/alphabet.css';
import translate from "translate";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Letter from './Letter';
import { generate, count } from "random-words";
import deleteImg from './assets/delete.png';
import check from './assets/check.svg';

const Alphabet = () => {
    const { width, height } = useWindowSize()
    const [letters, setLetters] = useState([]);
    const [targetLetter, setTargetLetter] = useState('');
    const [voices, setVoices] = useState([]);
    const [spanishVoice, setSpanishVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const initialLoad = useRef(true);
    const [word, setWord] = useState('_ _ _');
    

   const loadVoices = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        setVoices(voices);
        
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

        setVoicesLoaded(true);
    };


    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        const alphabet = [];
        for (let i = 65; i < 91; i++) {
            alphabet.push(String.fromCharCode(i));
        }
        setLetters(alphabet); 
        console.log(alphabet);




    }, []);



    const handleClick = (e, letter) => { // speaks the letter in English and Spanish
        e.preventDefault();
        setTargetLetter(letter);
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(letter);
        utterThis.voice = englishVoice;
        synth.speak(utterThis);

        translate(letter, { from: 'en', to: 'es' }).then((res) => {
            const utterThis = new SpeechSynthesisUtterance(res);
            utterThis.voice = spanishVoice;
            synth.speak(utterThis);
        });
        let newWord = word + letter;
        if (newWord[0] === '_') {
            newWord = newWord.substring(1);
            newWord = newWord.substring(newWord.indexOf('_'));
        }

        setWord(newWord);
    }

    const checkWord = () => {
        const synth = window.speechSynthesis;
        if (!word.includes('_')) {
            const utterThis = new SpeechSynthesisUtterance(word);
            utterThis.voice = englishVoice;
            synth.speak(utterThis);

            translate(word, { from: 'en', to: 'es' }).then((res) => {
                const utterThis = new SpeechSynthesisUtterance(res);
                utterThis.voice = spanishVoice;
                synth.speak(utterThis);
            });
        }
        else {
            document.getElementsByClassName('alphabet')[0].classList.add('shake');
            setTimeout(() => {
                document.getElementsByClassName('alphabet')[0].classList.remove('shake');
            }, 1000);
        }
    }



    return (
        <div className="alphabet">
            <center>
                <h1><u>Alphabet (WIP)</u></h1>
            </center>
            <div className="letters">
                {letters.map((letter, i) => (
                    <Letter
                        key={i}
                        letter={letter}
                        onClick={handleClick}

                    />
                ))}
            </div>
            
            <div className="wordbuilder">
                <h1>Word Builder</h1>

                <center>
                    <div
                    className="target"
                    onDrop={(e) => setTargetLetter(e.dataTransfer.getData('text/plain'))} >
                        
                    {word}
                </div>
                
                

                <button className="checkButtons" onClick={() => setWord('_ _ _')}>
                    <img className="checkButtonsImg" src={deleteImg} alt="delete" />
                </button>

                <button className="checkButtons" onClick={() => checkWord()} >
                    <img className="checkButtonsImg" src={check} alt="submit" />
                </button>
                </center>
            </div>

        </div>

    );

};

export default Alphabet;
