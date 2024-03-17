/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";

import { useEffect } from "react";

const SentenceComparison = ({ correctSentence, transcribedSentence }) => {


    useEffect(() => {
        const playAudio = (audioFile) => {
            const audio = new Audio(audioFile);
            audio.play();
        }
        // Audio playing logic
        // const areTextsEqual = (correctSentence === transcribedSentence);
        // console.log("are texts equal: " + areTextsEqual)
        if (correctSentence !== (undefined || null || "")) {
            // console.log(correctSentence)
        //    console.log(transcribedSentence)
            if (correctSentence === transcribedSentence) {
                playAudio('goed-gedaan.mp3');
            }
            else {
                playAudio('probeer-opnieuw.mp3');
            }
        }
    }
        , [correctSentence, transcribedSentence])


    // Function to compare two sentences word by word and then letter by letter
    const compareSentences = () => {
        const correctWords = correctSentence.split(" ");
        const transcribedWords = transcribedSentence.split(" ");

        const comparedSentence = correctWords.map((correctWord, index) => {
            const transcribedWord = transcribedWords[index] || ""; // Handle case where transcribedWords is shorter
            const correctLetters = correctWord.split("");
            const transcribedLetters = transcribedWord.split("");

            const comparedWord = (
                <span key={`word_${index}`}>
                    {transcribedLetters.map((letter, letterIndex) => (
                        <span
                            key={`letter_${index}_${letterIndex}`}
                            style={{
                                color: letter === correctLetters[letterIndex] ? "rgb(34 197 94)" : "red",
                            }}
                        >
                            {letter}
                        </span>
                    ))}{" "}
                </span>
            );

            return comparedWord;
        });

        return (
            <div>
                {/* {console.log(phoneme)} */}
                <div className="pt-4 pb-4 pl-6">
                    <h3 className="pb-4 text-3xl">Juiste woord/zin:</h3>
                    <div className="px-4 text-lg text-green-500 bg-gray-800 rounded-md min-h-6 min-w-64 w-fit">
                        {/* {correct-sentences} */}
                        {correctSentence && correctSentence}
                    </div>
                </div>
                <div>
                    <div className="pl-6">
                        <h3 className="pb-4 text-3xl">Correcties:</h3>
                        <div className="px-4 text-lg bg-gray-800 rounded-md w-fit min-h-6 min-w-64 ">
                            {/* {correct-sentences} */}
                            {comparedSentence && comparedSentence}
                        </div>
                        {/* <div className="pt-4">
                            <h3 className="pb-4 text-3xl">Ontbrekende fonemen:</h3>
                            <div className="px-4 text-lg text-green-500 bg-gray-800 rounded-md w-fit min-h-6 min-w-64 "> */}
                                {/* missing phonemes*/}
                                {/* {phoneme &&
                                    phoneme.map((item) => {
                                        return (
                                            <div key={( Math.random())}>
                                                {item}
                                            </div>
                                        )
                                    })} */}
                            {/* </div>
                        </div> */}
                    </div>
                </div>
                {/* <div>{comparedSentence}</div> */}
            </div>
        );
    };

    return <div>{compareSentences()}</div>;
};

export default SentenceComparison;