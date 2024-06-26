import { BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react'
import SignIn from './pages/auth/SignIn.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Disease from './pages/disease/Disease.jsx'
import Chatbot from './pages/chatbot.jsx'
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from './pages/HomePage.jsx'
import Predict from './pages/disease/Predict.jsx';
import Doctor from './pages/Doctor/Doctor.jsx'
import RecommendedDoctors from './pages/Doctor/RecommendedDoctors.jsx'
import MedicalReport from './pages/Report/MedicalReport.jsx'
import Diabetes from './pages/diabetes/Diabetes.jsx'
import HeartDisease from './pages/heart/HeartDisease.jsx'
import Kidney from './pages/kidny/Kidney.jsx'
import BreastCancer from './pages/cancer/BreastCancer.jsx'
import LiverDisease from './pages/liver/LiverDisease.jsx'



function App() {
  return (
        <>
      <ToastContainer />
      <BrowserRouter>
      <Routes> 

      <Route path = "/home-page" element={<HomePage/>}/>
      <Route path = "/" element={< SignIn />}/>
      <Route path = "/sign-up" element={<SignUp />}/>
      <Route path = "/disease" element={<Disease/>}/>
      <Route path = "/chatbot" element={<Chatbot/>}/>
      <Route path = "/predict" element={<Predict />} />

      <Route path = "/doctor" element={<Doctor/>} />
      <Route path = "/recommendations"  element={<RecommendedDoctors/>} />

      <Route path = "/medicalReport"  element={<MedicalReport/>} />

      <Route path = "/diabetes" element={<Diabetes/>} />

      <Route path = "/heart" element={<HeartDisease/>} />

      <Route path = "/kidney" element={<Kidney/>} />

      <Route path = "/breast-cancer" element={<BreastCancer/>} />

      <Route path = "/liver" element={<LiverDisease/>} />

      </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App;
