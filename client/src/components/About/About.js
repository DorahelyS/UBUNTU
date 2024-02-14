import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function About() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state)

    const currentUser = state && state.currentUser ? state.currentUser : null;

    // navigating back to User-Profile
    const handleNavigateToUserProfile = () => {
        navigate('/User-Profile', {
            state: { currentUser }
        });
    };

    // navigating back to log in
    const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };
    //returns what I want to see on the page - in this case the login form
    return (
        <div className='about'>
            <div className="flex justify-end items-start mt-5 mr-5 space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToLogin}>Logout</button>
            </div>
        
        </div>
    )
}

// need to export the function aka component if and when other components may want to use
export default About;