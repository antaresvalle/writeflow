import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DocumentPage from './pages/DocumentPage/DocumentPage';
import HeaderNav from './components/HeaderNav/HeaderNav';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <HeaderNav/>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/login' element={<LoginPage />}/> 
        <Route path='/document/:id' element={<DocumentPage/>}/>
      </Routes>
    </div>
  )
}

export default App
