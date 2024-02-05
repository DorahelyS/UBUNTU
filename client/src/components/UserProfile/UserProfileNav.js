import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserProfileNav = ({ currentUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    

    // Log the currentUser to ensure it's being passed correctly
    console.log("Current User:", currentUser);

    //for debugging to check path location 
    console.log("Current path:", location.pathname)

    // Log the result of the condition for rendering the Home button
    console.log("Render Home Button:", currentUser ? false : location.pathname !== '/User-Profile');

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