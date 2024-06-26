import React, { useState } from 'react';
import GoogleTranslate from './GoogleTranslate.jsx';
import { SignOutUserFailure, SignOutUserStart, SignOutUserSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdGTranslate } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (!data.success) {
        dispatch(SignOutUserFailure(data.message));
        toast(data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      dispatch(SignOutUserSuccess(data));
      toast("Signout successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    } catch (error) {
      dispatch(SignOutUserFailure(error.message));
    }
  };

  return (
    <nav className="bg-[#F9F9F9] shadow-lg shadow-slate-300 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <a className="text-black font-medium text-3xl ml-20" href="#">Medico</a>
      <div className="flex space-x-4">
        <Link to="/home-page">
          <button className='h-10 px-5 m-2 hover:bg-[#86C8BC] rounded relative group'>
            <span className="mr-2 hidden sm:inline text-slate-700 font-bold text-xl">Home</span>
          </button>
        </Link>
  
        <button className='h-10 px-5 m-2 hover:bg-[#86C8BC] rounded relative group'>
          <span className="mr-2 hidden sm:inline text-slate-700 font-bold text-xl">About</span>
        </button>
        <button className='h-10 px-5 m-2 hover:bg-[#86C8BC] rounded relative group'>
          <span className="mr-2 hidden sm:inline text-slate-700 font-bold text-xl">Contact</span>
        </button>
        
        {/* Services Dropdown */}
        <div className="relative group">
          
        <button
              className="h-10 px-5 m-2  hover:bg-[#86C8BC] rounded relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              style={{ zIndex: isServicesOpen ? 9999 : 'auto' }}
            >
              <span className="mr-2 hidden sm:inline text-slate-700 font-bold text-xl group-hover:block">Services</span>
            </button>
            <ul className="absolute hidden shadow-lg shadow-[#B5C0D0] bg-[#B7C9F2] border-1 rounded-md text-gray-700 pt-1 group-hover:block w-64">

<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/disease'>Predict Disease using AI</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/doctor'>Doctor Recommand</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/medicalReport'> Medical Report Summarization</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/diabetes'>  Diabetes Prediction</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/heart'>  Breast Cancer Prediction</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/kidney'> Chronic Kidney Disease Prediction</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/breast-cancer'>  Heart Disease Prediction</a></li>
<li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/liver'>  Liver Disease Prediction</a></li>
</ul>
             
          
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-20">
        <MdGTranslate className='mb-5 w-8 h-8' />
        <GoogleTranslate/>
        <button
          onClick={handleSignOut}
          className="btn btn-outline-success shadow-md shadow-[#86C8BC] w-32 ml-24 mr-20 bg-[#86C8BC] text-slate-700 font-medium text-2xl px-4 py-1.5 rounded"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
