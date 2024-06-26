import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Diabetes = () => {
    const [formData, setFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodpressure: '',
        skinthickness: '',
        insulin: '',
        bmi: '',
        dpf: '',
        age: ''
    });
    const navigate = useNavigate();
    const [prediction, setPrediction] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict_diab', {
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
                    className="bg-[#2D9596] font-bold text-lg text- py-2 w-40 rounded-3xl px-6 ml-24 text-white  hover:bg-white border-2 border-black-2 hover:border-[#2D9596] hover:text-[#2D9596]"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </button>
            </div>

            <div className="container mx-auto p-1 flex justify-center items-center peer-has-[]:">
                <div className="w-full ml-40 mr-40">
                    <h1 className="text-4xl font-bold text-center mb-5">Diabetes Prediction</h1>
                    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-2 gap-5">
                            <label className="block w-full">
                                Number of Pregnancies
                                <input
                                    type="number"
                                    name="pregnancies"
                                    value={formData.pregnancies}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border-2 border-black rounded w-full"
                                    placeholder="Eg.0 for male"
                                    required    
                                />
                            </label>

                            <label className="block w-full">
                                Glucose Level (mg/dL)
                                <input
                                    type="number"
                                    name="glucose"
                                    value={formData.glucose}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border-2 border-black rounded w-full"
                                    placeholder="Eg.90"
                                    required
                                />
                            </label>

                            <label className="block w-full">
                                Blood Pressure (mmHg)
                                <input
                                    type="number"
                                    name="bloodpressure"
                                    value={formData.bloodpressure}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border-2 border-black rounded w-full"
                                    placeholder="Eg.90"
                                    required
                                />
                            </label>

                            <label className="block w-full">
                                Skin Thickness (mm)
                                <input
                                    type="number"
                                    name="skinthickness"
                                    value={formData.skinthickness}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border-2 border-black rounded w-full"
                                    placeholder="Eg.20"
                                    required
                                />
                            </label>

                            <label className="block w-full">
                                Insulin Level (IU/mL)
                                <input
                                    type="number"
                                    name="insulin"
                                    value={formData.insulin}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border-2 border-black rounded w-full"
                                    placeholder="Eg.80"
                                    required
                                />
                            </label>

                            <label className="block w-full">
                            BMI (kg/m²)
                            <input
                                type="number"
                                name="bmi"
                                value={formData.bmi}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border-2 border-black rounded w-full"
                                placeholder="Eg.26.1"
                                required
                            />
                        </label>
                   
                    
                            <label className="block w-full">
                                Diabetes Pedigree Function
                                <input
                                    type="number"
                                    name="dpf"
                                    value={formData.dpf}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2  border-2 border-black rounded w-full"
                                    placeholder="Eg.0.52"
                                    required
                                />
                            </label>

                            <label className="block w-full">
                            Age
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="mt-1 p-2 rounded w-full border-2 border-black"
                                placeholder="Eg.60"
                                required
                            />
                        </label>
                 

                        <div className="flex items-center justify-center col-span-2">
            <input type="submit" value="Predict" className="btn bg-[#303841] text-white text-2xl font-semibold w-56 py-2 hover:text-[#303841] hover:border-[#303841] hover:bg-white border-2 border-black rounded-md"/>

          </div>
                    </form>
                    {prediction !== null && (
                        <div className=" p-4 rounded">
                            <h2 className="text-2xl font-bold justify-center text-center">
                                {prediction === 1 ? (
                                    <span className="text-red-600 ">Oops! You have DIABETES.</span>
                                ) : (
                                    <span className="text-green-600 ">Great! You DON'T have diabetes.</span>
                                )}
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Diabetes;
