import { NavLink, useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import { googleLogout } from '@react-oauth/google';

function HeaderNav() {
    const navigate = useNavigate();
    const session = localStorage.getItem("token");

    const logOut = () => {
        googleLogout();
        localStorage.clear();
        navigate('/login');
    };

  return (
    <header>
        <div >
            <NavLink to="/">
                <h1>WriteFlow</h1>
            </NavLink>
            <nav >
             { session && 
                (<Button onClick={logOut}>Log out</Button>)
             }
            </nav>
        </div>
    </header>
  )
}

export default HeaderNav