import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPageNav() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToUserProfile = () => {
        navigate('/UserProfile');
    };


    return (
        <nav className='navbar'>
            <ul>
                <li><h1>U</h1></li>
                <li><button onClick={navigateToHome}>Home</button></li>
                <li><button onClick={navigateToUserProfile}>User Page</button></li>
            </ul>
        </nav>
    );
}

export default MainPageNav;