import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ outputUpdater, answer }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => outputUpdater((answer || "") + transcript), [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition. Make sure that you are using Google Chrome</span>;
  }

  return (
    <div>
      <p className="bg-blue-500 text-white text-bold rounded-lg my-2 px-2 py-1">Microphone: {listening ? 'on' : 'off'}</p>
      <div className="flex flex-row gap-1">
        <button className="bg-orange-600 text-white text-bold px-2 py-1 rounded-lg" onClick={() => SpeechRecognition.startListening()}>Start</button>
        <button className="bg-orange-600 text-white text-bold px-2 py-1 rounded-lg" onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className="bg-orange-600 text-white text-bold px-2 py-1 rounded-lg" onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  );
};
export default Dictaphone;