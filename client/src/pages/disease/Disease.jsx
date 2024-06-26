import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../Navbar.jsx';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Disease = () => {
  const [transcription, setTranscription] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognitionRef.current = recognition;
  }, []);

  const startSpeechRecognition = () => {
    const recognition = recognitionRef.current;
    const lang = getTranslateLang(); // Get the language set by Google Translate
    recognition.lang = lang;
    recognition.start();

    recognition.onresult = (e) => {
      const transcriptionText = e.results[0][0].transcript;
      setTranscription(transcriptionText);
      setSymptoms(transcriptionText); // Set symptoms to transcribed text
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const symptomsList = symptoms.split(',').map(symptom => symptom.trim());
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({ symptoms: symptomsList, severity, duration }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigate('/predict', { state: { data: { ...data, symptoms: symptomsList } } });
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setMessage(error.message === 'Network response was not ok' ? 'Error connecting to the server' : error.message);
    }
  };

  const getTranslateLang = () => {
    // Get the language set by Google Translate
    const translateElement = document.querySelector('.goog-te-combo');
    if (translateElement) {
      const lang = translateElement.value;
      if (lang === 'en') {
        return 'en-US';
      } else if (lang === 'gu') {
        return 'gu-IN';
      } else if (lang === 'hi') {
        return 'hi-IN';
      }
    }
    // Default to English if language is not detected
    return 'en-US';
  };

  const handleBack = () => {
    navigate(-1);// Navigate back to the previous page
  };


  return (
    <div>
      <Navbar />
      <div className="mt-4 flex justify-between">
<button
    onClick={handleBack}
    className="bg-[#2D9596] font-bold text-lg text- py-2 w-40 rounded-3xl px-6 ml-24 text-white  hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
  >
    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
    Back
  </button>    
</div>


      <div className="container mx-auto my-4 p-10 border-collapse border border-black bg-[#CDF0EA] w-3/4 mt-24 shadow-sm rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className='text-black font-semibold text-2xl mb-5 mt-6' htmlFor="symptoms">Enter Symptoms:</label>
            <input
              type="text"
              className="form-control border-2 border-black text-xl w-full mt-7 h-16 p-2 rounded text-black"
              id="symptoms"
              name="symptoms"
              placeholder="type symptoms such as itching, sleeping, aching etc"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>

          <button
            type="button"
            id="startSpeechRecognition"
            className="btn text-white px-4 py-2 rounded mb-4"
            onClick={startSpeechRecognition}
          >
            <FontAwesomeIcon className="w-14 h-14" icon={faMicrophone} style={{ color: 'black' }} />
          </button>

          {message && (
            <div className="alert bg-red-500 text-white p-4 rounded mb-4">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn bg-[#303841] text-white text-2xl font-semibold w-full py-3 hover:text-[#303841] hover:border-[#303841] hover:bg-white border rounded"
          >
            Predict Result
          </button>
        </form>
      </div>
    </div>
  );
}

export default Disease;
