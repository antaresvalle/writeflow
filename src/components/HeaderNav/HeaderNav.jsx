import './HeaderNav.scss';
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import writeFlowLogo from '../../assets/writeflow-logo.svg';

function HeaderNav() {
    const navigate = useNavigate();
    const session = localStorage.getItem("token");

    const logOut = () => {
        googleLogout();
        localStorage.clear();
        navigate('/login');
    };

  return (
    <header className="header">
        <nav className="nav-bar">
            <Link to="/" className="nav-bar__logo">
                <img src={writeFlowLogo} alt="WriteFlow" className="nav-bar__logo-img" />
            </Link>
            { session && 
                ( <button className='nav-bar__btn' onClick={logOut}>Log out</button> )
            }
        </nav>
    </header>
  )
}

export default HeaderNav