import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HeartDisease = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    ChestPainType: '',
    RestingBP: '',
    Cholesterol: '',
    FastingBS: '',
    RestingECG: '',
    MaxHR: '',
    ExerciseAngina: '',
    Oldpeak: '',
    ST_Slope: ''
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict_h', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data.prediction);
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
          className="bg-[#2D9596] font-bold text-lg text- py-2 w-40 rounded-3xl px-6 ml-24 text-white  hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>
      </div>

      <div className="container mx-auto p-1 flex justify-center items-center">
        <div className="w-full ml-40 mr-40">
          <h1 className="text-4xl font-bold text-center mb-8">Heart Disease Prediction</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Age', name: 'Age', placeholder: 'Eg.60' },
              { label: 'Sex', name: 'Sex', placeholder: 'Eg.1 for M, 0 for F' },
              { label: 'Chest Pain Type', name: 'ChestPainType', placeholder: 'Eg.0 to 3' },
              { label: 'Resting Blood Pressure', name: 'RestingBP', placeholder: 'Eg.120' },
              { label: 'Cholesterol', name: 'Cholesterol', placeholder: 'Eg.180' },
              { label: 'Fasting Blood Sugar', name: 'FastingBS', placeholder: 'Eg.0 or 1' },
              { label: 'Resting ECG', name: 'RestingECG', placeholder: 'Eg.0 for Normal, 1 for ST and 2 for LVH' },
              { label: 'Max Heart Rate', name: 'MaxHR', placeholder: 'Eg.120' },
              { label: 'Exercise Angina', name: 'ExerciseAngina', placeholder: 'Eg.0 or 1' },
              { label: 'Oldpeak', name: 'Oldpeak', placeholder: 'Eg.0 to 3' },
              { label: 'ST Slope', name: 'ST_Slope', placeholder: 'Eg.0 or 1' },
            ].map((field) => (
              <div className="flex items-center" key={field.name}>
                <label htmlFor={field.name} className="w-1/3 mb-2 font-medium">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-2/3  border-2 border-black p-2 rounded-md mr-10"
                  placeholder={field.placeholder}
                  required
                />
              </div>
            ))}
           
           <div className="flex items-center justify-center col-span-2">
            <input type="submit" value="Predict" className="btn bg-[#303841] text-white text-2xl font-semibold w-56 py-1.5 hover:text-[#303841] hover:border-[#303841] hover:bg-white border rounded-md"/>

          </div>
          </form>
          {result !== null && (
            <div className="text-2xl font-bold justify-center text-center mt-4">
              {result === 1 ? (
                <p className="text-red-600">
                  Oops! You may have heart disease. Contact a doctor immediately.
                </p>
              ) : (
                <p className="text-green-600">Great! You DON'T have heart disease.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartDisease;
