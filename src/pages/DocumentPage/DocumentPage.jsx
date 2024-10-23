import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function DocumentPage() {
    const { id } = useParams();
    const [wordCount, setWordCount] = useState(0);

    useEffect(()=>{
        const getDocument = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/documents/${id}`);
                setWordCount(response.data.wordCount)
            } catch(error){
              console.error('Error getting the word count', error)
            }
        }
        getDocument();
    }, [])
    
  return (
    <>
        <Link to={'/dashboard'}>Go Back</Link>
        <div>DocumentPage</div>
        <p>Word count: {wordCount}</p>
        <iframe src={`https://docs.google.com/document/d/${id}/edit?tab=t.0`} width={1000} height={500} ></iframe>
    </>
  )
}

export default DocumentPage