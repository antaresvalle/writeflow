import './DashboardPage.scss';
import { useState, useEffect } from "react";
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
    try {
      const response = await axios.post('http://localhost:3000/documents', {
        token: token
      })
      setDocuments(response.data)
    } catch(error) {
      console.error('Error getting documents', documents)
    }
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
    <main className="dashboard">
      <h2 className='dashboard__title'>Dashboard</h2>
      <article className="dashboard__section">
        <h3 className="dashboard-subtitle">
          Documents
        </h3>
        <div className="table">
          <div className="table__header">
            <div className="table__header-cell-name">
              <h4 className='table__header-name'>
                Name
              </h4>
            </div>
            <div className="table__header-cell-modified">
              <h4 className='table__header-modified'>
                Last modified
              </h4>
            </div>
          </div>
          {
            documents.map((item) => {
              return(
                <div key={item.id} className="table__row-wrapper">
                  <div className="table__row">
                    <div className="table__cell-name">
                      <Link to={`/document/${item.id}`} className="table__link">
                        {item.name}
                      </Link>
                    </div>
                    <div className="table__cell-modified">
                      {new Date(item.modifiedByMeTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </article>
    </main>
  )
}

export default DashboardPage