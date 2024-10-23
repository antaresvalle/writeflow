import { useState, useEffect } from "react";
import { Box, For, Table, Stack, Button } from '@chakra-ui/react';
import { googleLogout, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { Link, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [tokenState, setTokenState] = useState('');
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const code = query.get('code');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const sendToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/generate-access-token`, { 
            code
        });
        setTokenState(response.data.tokens.access_token);
        localStorage.setItem('token', response.data.tokens.access_token)
        setLoggedIn(true);
    } catch(error) {
        console.error("Error sending token ", token)
    }
  }

  const getDocuments = async () => {
    const response = await axios.post('http://localhost:3000/documents', {
        token: token
    })
    setDocuments(response.data)
  }

  const logOut = () => {
      googleLogout();
      localStorage.clear();
      setLoggedIn(false)
  };

  useEffect(() => {
      if(code){
        sendToken();
    }
    
  }, []);

  useEffect(() => {
    if(token){
      getDocuments();
    } 
  }, [token]);

  // if(!loggedIn){
  //   return <Navigate to="/login"/>
  // }

  return (
    <>
      <div>DashboardPage</div>
      {/* <Button onClick={logOut}>Log out</Button> */}
      <Stack gap="10">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Document</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {documents.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Link key={item.id} to={`/document/${item.id}`}>
                    {item.name}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </>
  )
}

export default DashboardPage