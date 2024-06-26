import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const BreastCancer = () => {
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      radius_mean: formData.get('radius_mean'),
      texture_mean: formData.get('texture_mean'),
      perimeter_mean: formData.get('perimeter_mean'),
      area_mean: formData.get('area_mean'),
      smoothness_mean: formData.get('smoothness_mean'),
      compactness_mean: formData.get('compactness_mean'),
      concavity_mean: formData.get('concavity_mean'),
      concave_points_mean: formData.get('concave_points_mean'),
      symmetry_mean: formData.get('symmetry_mean'),
    };

    const response = await fetch('http://127.0.0.1:5000/predict_b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
        className="bg-[#2D9596] font-bold text-lg py-2 w-40 rounded-3xl px-6 ml-24 text-white hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>
    </div>

    <div className="container mx-auto flex justify-center items-center">
      <div className="w-full ml-32 mr-32">
        <h1 className="text-4xl font-bold text-center mb-8">Breast Cancer Prediction</h1>
   
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold" htmlFor="radius_mean">
                Mean Radius (Enter the average size of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="radius_mean"
                placeholder="e.g., 12.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="texture_mean">
                Mean Texture (Enter the average texture of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="texture_mean"
                placeholder="e.g., 17.3"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="perimeter_mean">
                Mean Perimeter (Enter the average perimeter of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="perimeter_mean"
                placeholder="e.g., 90.3"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="area_mean">
                Mean Area (Enter the average area of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="area_mean"
                placeholder="e.g., 600.2"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="smoothness_mean">
                Mean Smoothness (Enter the average smoothness of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="smoothness_mean"
                placeholder="e.g., 0.086"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="compactness_mean">
                Mean Compactness (Enter the average compactness of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="compactness_mean"
                placeholder="e.g., 0.125"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="concavity_mean">
                Mean Concavity (Enter the average concavity of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="concavity_mean"
                placeholder="e.g., 0.144"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="concave_points_mean">
                Mean Concave Points (Enter the average number of concave portions of the contour)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="concave_points_mean"
                placeholder="e.g., 0.05"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="symmetry_mean">
                Mean Symmetry (Enter the average symmetry of the cells)
              </label>
              <input
                className="w-full p-2  border-2 border-black rounded"
                type="number"
                step="any"
                name="symmetry_mean"
                placeholder="e.g., 0.198"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center col-span-2">
            <input type="submit" value="Predict" className="btn bg-[#303841] text-white text-2xl font-semibold w-56 mt-3 py-1.5 hover:text-[#303841] hover:border-[#303841] hover:bg-white border rounded-md"/>

          </div>
        </form>
        {prediction !== null && (
          <div className="mt-8 p-6 rounded-lg bg-gray-100 text-center">
            <h2 className="text-xl font-bold mb-4">Prediction Result:</h2>
            {prediction === 1 ? (
              <div>
                <h1 className="text-red-600 font-bold">Oops! You may have Breast Cancer. Contact your nearby doctor or hospital immediately.</h1>
             
              </div>
            ) : (
              <div>
                <h1 className="text-green-600 font-bold">Great! You DON'T have Breast Cancer.</h1>
      
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default BreastCancer;
