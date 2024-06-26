import React from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import img from '../../assets/medicine.png';


const RecommendedDoctors = () => {

  const navigate = useNavigate(); 

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

  const location = useLocation();
  const doctors = location.state?.doctors || [];

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

  <button
    onClick={handleDownload}
    className="bg-[#2D9596] font-bold text-lg w-52 mr-16 rounded-3xl  text-white py-2 px-6 hover:bg-white border-2 hover:border-[#2D9596] hover:text-[#2D9596]"
  >
    <FontAwesomeIcon icon={faDownload} className="mr-2" />
    Download PDF
  </button>
</div>


<div className="flex flex-col items-center py-3 font-serif">
        <div className="w-3/4 relative">

      <div id="pdf-content" className="w-full mr-60 mt-16 bg-white p-6 items-center justify-center rounded-lg shadow-gray-400 border-2 border-collapse border-slate-800">
       <h1 className="text-4xl font-bold text-center mt-5 mb-7">Recommended Doctors</h1>
       <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${img})`, opacity: '0.2' }}></div>
   
      <table className="min-w-full bg-white">
        <thead> 
          <tr>
            <th className="py-2 px-4 border-b text-2xl">Name</th>
            <th className="py-2 px-4 border-b text-2xl">State</th>
            <th className="py-2 px-4 border-b text-2xl">City</th>
            <th className="py-2 px-4 border-b text-2xl">Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 border-b justify-center text-center text-lg">{doctor['Name']}</td>
              <td className="py-2 px-4 border-b justify-center text-center text-lg">{doctor['State']}</td>
              <td className="py-2 px-4 border-b justify-center text-center text-lg">{doctor['City']}</td>
              <td className="py-2 px-4 border-b justify-center text-center text-lg">{doctor['Contact Info']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    

    </div>
    </div>

    </div>
   
  );
};

export default RecommendedDoctors;
