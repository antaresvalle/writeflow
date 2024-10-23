import { useState, useEffect } from "react";
import { Table, Stack } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const code = query.get('code');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const sendToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/generate-access-token`, { 
            code
        });
        localStorage.setItem('token', response.data.tokens.access_token)
        navigate('/dashboard');
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

  useEffect(() => {
    if(code){
      sendToken();
    }
  }, []);

  useEffect(() => {
    if(!token && !code) {
      navigate('/login');
    }
    if(token){
      getDocuments();
    }
  }, [token]);

  return (
    <>
      <div>DashboardPage</div>
    
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