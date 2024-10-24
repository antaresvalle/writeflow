import './DocumentPage.scss';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function DocumentPage() {
  const { id } = useParams();
  const [wordCount, setWordCount] = useState(0);

  const getDocument = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/documents/${id}`);
        setWordCount(response.data.wordCount)
    } catch(error){
      console.error('Error getting the word count', error)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getDocument(), 1000);
    return () => clearInterval(interval)
  }, []);
    
  return (
    <main className="document">
      <div className="document__header">
        <Link className="document__link" to={'/dashboard'}>Go Back</Link>
        <p className="document__word-count">
          Word count: <span className="document__word-count--count">{wordCount}</span>
        </p>
      </div>
        <iframe className="document__iframe" src={`https://docs.google.com/document/d/${id}/edit?tab=t.0`}></iframe>
    </main>
  )
}

export default DocumentPage