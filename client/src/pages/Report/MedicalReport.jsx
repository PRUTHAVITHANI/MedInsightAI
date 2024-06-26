import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FaFileUpload } from 'react-icons/fa'; // Changed to FaFileUpload

const MedicalReport = () => {
    const navigate = useNavigate();
    const [pdfFile, setPdfFile] = useState(null);
    const [summarizedText, setSummarizedText] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
        setSelectedFileName(e.target.files[0].name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pdf_file', pdfFile);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/summary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Check if the response data is an array before setting the state
            if (Array.isArray(response.data.summarized_text)) {
                setSummarizedText(response.data.summarized_text);
            } else {
                console.error('Invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error summarizing the report:', error);
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

            <div className="container mx-auto p-4 flex justify-center items-center peer-has-[]:">
                <div className="w-full ml-72 mr-72 p-4 px-9">
                    <h1 className="text-4xl font-bold mb-8 text-center">Medical Report Summarization</h1>
                    <form onSubmit={handleSubmit} className="bg-[#CDF0EA] shadow-md shadow-slate-200 w-full rounded px-14 pt-6 pb-6 mb-4 border-collapse border border-black">
                        <div className="flex justify-center items-center mb-4">
                            <label htmlFor="pdf_upload" className="flex justify-center items-center cursor-pointer">
                                <FaFileUpload required className="text-5xl mb-4 w-60 h-60 text-[#79B4B7]" />
                                <input
                                    type="file"
                                    id="pdf_upload"
                                    name="pdf_file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    required
                                    className="hidden"
                                />
                            </label>
                            <input type="submit" value="Submit" className="btn bg-[#219F94] text-white text-2xl font-semibold w-48 py-2 ml-4 hover:text-[#219F94] hover:border-[#219F94] hover:bg-white border rounded-md" />
                            {selectedFileName && <div className="ml-4 text-xl">{selectedFileName}</div>}
                        </div>
                  
                    {summarizedText.length > 0 && (
                        <div className="summary bg-gray-100 p-4 rounded mt-4">
                            <h2 className="text-xl font-semibold mb-2">Summarized Report:</h2>
                            <ul className="list-disc pl-5">
                                {summarizedText.map((sentence, index) => (
                                    <li key={index} className="mb-1">{sentence}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                      </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalReport;
