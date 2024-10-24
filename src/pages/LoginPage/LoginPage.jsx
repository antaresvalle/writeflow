import './LoginPage.scss';
import { useState, useEffect } from "react";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import  { useNavigate } from 'react-router-dom';
import wfIcon from '../../assets/wf-icon.svg';

function LoginPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [credential, setCredential] = useState('')
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getToken = async (response) => {
    const data = await axios.post(`${API_URL}/verify-token`, {
        response
    });
    window.location = data.data.authUrl;
  }

  const responseMessageHandler =  (response) => {
      const { credential } = response;
      setCredential(credential);
      getToken(response);
  };

  const errorMessage = (error) => {
      console.log('Error', error)
  }

  useEffect(() => {
    if(token){
      navigate('/dashboard');
    }
  }, []);

  return (
    <main className='login'>
      <div className='login__wrapper'>
        <img className='login__image' src={wfIcon} alt="WriteFlow" />
        <h2 className='login__title'>Welcome to WriteFlow</h2>
        <p className='login__intro-text'>Looking to track your writing progress effortlessly?</p>
        <p className='login__about-text'><span className='login__wf-text'>WriteFlow</span> is a lightweight app designed to help writers stay focused on their word count and boost productivity.</p>
        <p className='login__cta-text'>Start your writing journey today!</p>
        <GoogleLogin onSuccess={responseMessageHandler} onError={errorMessage} />
      </div>
    </main>
  )
}

export default LoginPage