import { Box, Theme } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import  { useNavigate } from 'react-router-dom'

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
    <Box>
      <Theme >
        <h2>Google Login</h2>
        <GoogleLogin onSuccess={responseMessageHandler} onError={errorMessage} />
      </Theme>
    </Box>
  )
}

export default LoginPage