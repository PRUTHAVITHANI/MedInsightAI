import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import img from '../../assets/medicine.png';

function Predict() {
  const location = useLocation();
  const navigate = useNavigate(); // Use the useHistory hook for navigation
  const { data } = location.state;

  const handleDownload = async () => {
    document.body.style.padding = '0';
    document.body.style.margin = '0';

    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const imageWidthWithSpacing = pdfWidth - 30; // Adjust as needed
    const imageHeightWithSpacing = (imgProps.height * imageWidthWithSpacing) / imgProps.width;
    const imageX = (pdfWidth - imageWidthWithSpacing) / 2;

    pdf.addImage(imgData, 'PNG', imageX, 10, imageWidthWithSpacing, imageHeightWithSpacing);

    document.body.style.padding = '';
    document.body.style.margin = '';

    pdf.save('prediction_results.pdf');
  };

  const handleBack = () => {
    navigate(-1);// Navigate back to the previous page
  };

  const parseList = (dataItem) => {
    if (typeof dataItem === 'string') {
      return dataItem
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(item => item.trim().replace(/^'|'$/g, ''));
    }
    return Array.isArray(dataItem) ? dataItem : [];
  };

  const medications = parseList(data.medications);
  const diet = parseList(data.diet);
  const precautions = parseList(data.precautions);
  const workout = parseList(data.workout);

  const limitedWorkout = workout.slice(0, 5); // Limiting the workout items to 5

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

        <button
          onClick={handleDownload}
          className="bg-[#2D9596] font-bold text-lg w-52 mr-16 rounded-3xl  text-white py-2 px-6 hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Download PDF
        </button>
      </div>

      <div className="flex flex-col items-center py-3 font-serif">
        <div className="w-3/5 relative">
          <div id="pdf-content" className="bg-white p-6 items-center justify-center rounded-lg shadow-gray-400 border-2 border-collapse border-slate-800">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${img})`, opacity: '0.2' }}></div>

            <h1 className="text-4xl font-bold text-black mb-6 text-center">Medico Prescription</h1>
            <hr className="border-b-2 border-[#43766C] mb-6" />

            <p className="text-xl mb-5 text-black flex"><strong className="w-32 mr-4">Disease</strong>: {data.disease}</p>
            <p className="text-xl mb-5 text-black flex"><strong className="w-32 mr-4">Symptoms</strong>: {data.symptoms.join(', ')}</p>

            <p className="text-xl mb-5 text-black flex"><strong className="w-32 mr-4">Description</strong>: {data.description}</p>

            <div className="flex flex-wrap mt-5">
              <div className="w-full md:w-1/2 mb-4">
                <p className="text-xl mb-5 text-black"><strong>Precautions</strong></p>
                <ul className="list-disc list-inside mb-4 text-black text-lg">
                  {precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 mb-4">
                <p className="text-xl mb-5 text-black"><strong>Medications</strong></p>
                <ul className="list-disc list-inside mb-4 text-black text-lg">
                  {medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 mb-4">
                <p className="text-xl mb-5 text-black"><strong>Diet</strong></p>
                <ul className="list-disc list-inside mb-4 text-black text-lg">
                  {diet.map((dietItem, index) => (
                    <li key={index}>{dietItem}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 mb-4">
                <p className="text-xl mb-5 text-black"><strong>WorkOut</strong></p>
                <ul className="list-disc list-inside mb-4 text-black text-lg">
                  {limitedWorkout.map((workoutItem, index) => (
                    <li key={index}>{workoutItem}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-2 justify-center items-start text-center">
              <p className="text-lg text-gray-600">Report generated by : {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;
