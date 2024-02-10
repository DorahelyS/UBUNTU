// lets me use react library
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';


function UserSummary() {
    // Define state variables
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const currentUser = state ? state.currentUser : null;
    //const [emotionData, setEmotionData] = useState([]);

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);


    // Navigation functions
    const handleNavigateToUserProfile = () => {
        navigate('/User-Profile', {
            state: { currentUser }
        });
    };

    const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };

    // Render the component
    return (
        <div>
            <button onClick={handleNavigateToUserProfile}>Home</button>
            <button onClick={handleNavigateToLogin}>Logout</button>
        </div>
    );
}

export default UserSummary;