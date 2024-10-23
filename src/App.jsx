import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DocumentPage from './pages/DocumentPage/DocumentPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/document/:id' element={<DocumentPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
