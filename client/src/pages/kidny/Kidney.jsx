import React, { useState } from 'react';
import Navbar from '../Navbar'; // Assuming Navbar is a separate component
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Kidney = () => {
  const [formData, setFormData] = useState({
    bp: '',
    sg: '',
    al: '',
    su: '',
    rbc: '',
    pc: ''
  });

  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict_k', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPrediction(data.prediction);
      console.log('Prediction:', data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };
  

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };


  return (
    <div>
    <Navbar />

    <div className="mt-4 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-[#2D9596] font-bold text-lg text- py-2 w-40 rounded-3xl px-6 ml-24 text-white  hover:bg-white border-2-2 hover:border-2-[#2D9596] hover:text-[#2D9596]"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>
    </div>

    <div className="container mx-auto p-1 flex justify-center items-center">
      <div className="w-full ml-40 mr-40">
        <h1 className="text-4xl font-bold text-center mb-8">Chronic Kidney Disease Prediction</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Blood Pressure', name: 'bp', placeholder: 'Blood Pressure' },
            { label: 'Specific Gravity', name: 'sg', placeholder: 'Specific Gravity' },
            { label: 'Albumin', name: 'al', placeholder: 'Albumin' },
            { label: 'Blood Sugar Level', name: 'su', placeholder: 'Blood Sugar Level' },
            { label: 'Red Blood Cells Count', name: 'rbc', placeholder: 'Red Blood Cells Count' },
            { label: 'Pus Cell Count', name: 'pc', placeholder: 'Pus Cell Count' }
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 font-medium">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className=" p-2 rounded-md w-full border-2 border-black"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-center mt-5 col-span-2">

        <input type="submit" value="Predict" className="btn bg-[#303841] text-white text-2xl font-semibold w-56 py-1.5 hover:text-[#303841] hover:border-2-[#303841] hover:bg-white border-2 rounded-md"/>
</div>
        </form>
        {prediction !== null && (
          <div className="text-2xl font-bold justify-center text-center mt-4">
            {prediction === 1 ? (
              <p className="text-red-600">Oops! You may have Chronic Kidney Disease. Please contact a doctor immediately.</p>
            ) : (
              <p className="text-green-600">Great! You DON'T have Chronic Kidney Disease.</p>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Kidney;
