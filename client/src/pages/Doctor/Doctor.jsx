import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Doctor = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disease, setDisease] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, state, disease }),
      });

      const data = await response.json();
      navigate('/recommendations', { state: { doctors: data.doctors } });
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);// Navigate back to the previous page
  };


  return (
    <div>    
         <Navbar/>

         <div className="mt-4 flex justify-between">
<button
    onClick={handleBack}
    className="bg-[#2D9596] font-bold text-lg text- py-2 w-40 rounded-3xl px-6 ml-24 text-white  hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
  >
    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
    Back
  </button>    
</div>

         <div className="container mx-auto p-4 flex justify-center items-center peer-has-[]:">
      <div className="w-full ml-56 mr-56">
        <h1 className="text-4xl font-bold text-center mt-5 mb-10">Doctor Recommendation</h1>
        <form onSubmit={handleSubmit} className="bg-[#CDF0EA] shadow-md shadow-slate-200 w-full rounded px-8 pt-6 pb-8 mb-4 border-collapse border border-black">
          <label htmlFor="city" className="block mb-2">
            <b>City:</b>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="block mb-4 p-2  w-full  border-2 border-black"
          />

          <label htmlFor="state" className="block mb-2">
            <b>State:</b>
          </label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="block mb-4 p-2 w-full  border-2 border-black"
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <label htmlFor="disease" className="block mb-2">
            <b>Disease:</b>
          </label>
          <input
            type="text"
            id="disease"
            name="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
            className="block mb-4 p-2 w-full border-2 border-black"
          />

          <div className="flex items-center justify-center">
            <input type="submit" value="Submit" className="btn bg-[#303841] text-white text-2xl font-semibold w-56 py-2 hover:text-[#303841] hover:border-[#303841] hover:bg-white border rounded-md"/>

          </div>
        </form>
      </div>
    </div>
     </div>

     );
   };

   export default Doctor;

