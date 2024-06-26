import React from 'react';
import Navbar from './Navbar';
import home from '../assets/home.jpeg';
import { Link } from 'react-router-dom';
import leaf from '../assets/leaf.png'
import { IoIosArrowDroprightCircle } from "react-icons/io";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="relative h-[600px] flex flex-col gap-6 w-full bg-cover bg-center bg-opacity-20" style={{ backgroundImage: `url(${home})` }}>
        <div className="absolute inset-0 opacity-0"></div>
        <div className="flex items-center mt-48 relative z-10">
          <div className="flex-1 mb-5 ml-14 bg-opacity-20 p-6 rounded">
            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl mb-7">
              Discover your <span className="text-slate-500">optimal</span>
              <br />
              healthcare solutions
            </h1>
            <div className="text-gray-500 text-xs sm:text-sm mb-4">
              Medico is dedicated to helping you find the best medical care
              suited to your needs.
              <br />
              We offer a wide range of healthcare services and recommendations
              to ensure you receive the best treatment.
            </div>

<Link to="/disease">

          <button
            className="btn btn-outline-success shadow-md shadow-[#7EAA92] w-52  bg-[#86C8BC] text-slate-700 font-medium text-2xl px-4 py-1.5 rounded"
            type="button"
          >
            Let's Predict
          </button>
</Link>


          </div>
        </div>
        <div className='mt-24 mb-24'>
    <h1 className='text-black text-6xl font-bold text-center'>Our Services</h1>



    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-44 mt-10'>


      
        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex justify-start items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Predict Disease using AI</h1>
                <p className='text-base ml-8 mr-8 text-justify mt-3'>Using the power of artificial intelligence, our healthcare platform accurately forecasts potential diseases based on comprehensive data analysis, and early intervention for improved patient outcomes.</p>
            </div>
            <Link to="/disease">  <IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' />
            </Link>
        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex justify-start items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Doctor Recommandation System</h1>
                <p className='text-base ml-8 mr-8 text-justify mt-3'>The Doctor Recommendation System utilizes advanced algorithms to analyze Doctor data and give all doctor details. </p>
            </div>
            <Link to="/doctor"><IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /></Link>
        </div>

    <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Medical Report Summarization</h1>
                <p className='text-base ml-8 text-justify mt-3 '>The Medical Report Summarization System condenses complex medical reports into concise and easily understandable summaries, patients and healthcare professionals in quickly grasping key information. </p>
            </div>
            <Link to="/medicalReport"><IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 justify-end text-green-950' /> </Link>
        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex justify-start items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Diabetes Prediction</h1>
                <p className='text-base ml-8 mr-8 text-justify mt-3'>Diabetes Prediction system used for predicting whether you have diabetes or not based on your inputs.</p>
            </div>
            <Link to="/diabetes"><IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /> </Link>
        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex justify-start items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Breast Cancer Prediction</h1>
                <p className='text-base ml-8 mr-8 text-justify mt-3'>Breast Cancer Prediction system used for predicting whether you have Breast Cancer or not based on your inputs.</p>
            </div>
            <Link to="/breast-cancer"> <IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /></Link>        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Chronic Kidney Disease Prediction</h1>
                <p className='text-base ml-8 text-justify mt-3 '>Chronic Kidney Disease Prediction system marked by the gradual loss of kidney function. It can result from factors like diabetes, high blood pressure, infections, and certain medications.</p>
            </div>
            <Link to="/kidney"> <IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /> </Link>        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex justify-start items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'>
                <h1 className='text-2xl font-semibold ml-8'>Heart Disease Prediction</h1>
                <p className='text-base ml-8 mr-8 text-justify mt-3'>Heart disease encompasses conditions affecting the heart and blood vessels, such as coronary artery disease, heart failure, arrhythmias, and heart valve disorders. </p>
            </div>
            <Link to="/heart"> <IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /> </Link>        </div>

        <div className='transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 transform shadow-slate-200 shadow-lg rounded-lg p-1 flex items-center gap-4 relative border-2 border-green-950'>
            <div className='w-4/5'> 
                <h1 className='text-2xl font-semibold ml-8'>Liver Disease Prediction</h1>
                <p className='text-base ml-8 text-justify mt-3 '>Liver disease encompasses various conditions affecting the liver's structure and function, impairing its vital roles such as filtering toxins, metabolizing nutrients, and producing essential proteins.</p>
            </div>
            <Link to="/liver"><IoIosArrowDroprightCircle className='h-12 w-12 md:h-24 md:w-24 text-green-950' /></Link>        </div>

       

    </div>
</div>



<div style={{ paddingBottom: '1rem' }}></div>
      </div>
    </div>
  );
};
