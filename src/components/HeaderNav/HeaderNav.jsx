import './HeaderNav.scss';
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import writeFlowLogo from '../../assets/writeflow-logo.svg';

function HeaderNav() {
    const navigate = useNavigate();
    const session = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const userInfoParsed = JSON.parse(userInfo);

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
                (  <div className='nav-bar__right'>
                        <p className='nav-bar__user-name'>{`Hello, ${userInfoParsed.name}`}</p>
                        <button className='nav-bar__btn' onClick={logOut}>Log out</button> 
                    </div>
                )
            }
        </nav>
    </header>
  )
}

export default HeaderNav