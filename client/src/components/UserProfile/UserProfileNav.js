import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const UserProfileNav = ({ currentUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="navbar">
            <span className="logo">U</span>
            <div className="user">
                {currentUser ? (
                    <>
                        <span>{currentUser.username}</span>
                        <button onClick={() => navigate('/')}>Logout</button>
                    </>
                ) : (
                    <button onClick={() => {
                        if (location.pathname !== '/User-Profile') {
                            navigate('/User-Profile');
                        }
                    }}>Home</button>
                )}
            </div>
        </div>
    );

};

export default UserProfileNav;
