import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const LiverDisease = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Total_Bilirubin: '',
    Direct_Bilirubin: '',
    Alkaline_Phosphotase: '',
    Alamine_Aminotransferase: '',
    Aspartate_Aminotransferase: '',
    Total_Proteins: '',
    Albumin: '',
    Albumin_and_Globulin_Ratio: '',
  });

  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/predict_l', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setPrediction(result.prediction);
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

    <div className="container mx-auto flex justify-center items-center">
      <div className="w-full ml-40 mr-40">
        <h1 className="text-4xl font-bold text-center mb-3">Liver Disease Prediction</h1>
    
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block mb-2 font-semibold" htmlFor={field}>
                {field.replace(/_/g, ' ')}
              </label>
              <input
                className="w-full p-2 border-2 border-black rounded"
                type="number"
                name={field}
                step="any"
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                required
              />
            </div>
          ))}
         <div className="flex items-center justify-center col-span-2">
            <input type="submit" value="Predict" className="btn bg-[#303841] mt-2 text-white text-2xl font-semibold w-56 py-1.5 hover:text-[#303841] hover:border-[#303841] hover:bg-white border rounded-md"/>

          </div>
        </form>
        {prediction !== null && (
          <div className="mt-8 p-6 rounded-lg bg-gray-100 text-center">
            <h2 className="text-xl font-bold mb-4">Prediction Result:</h2>
            {prediction === 1 ? (
              <div>
                <h1 className="text-red-600 font-bold">Oops! You may have Liver Disease. Please contact a doctor immediately.</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-green-600 font-bold">Great! You DON'T have Liver Disease.</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default LiverDisease
