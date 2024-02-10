// lets me use react library
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

/*
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
*/


function UserSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const currentUser = state ? state.currentUser : null;
    const [emotionData, setEmotionData] = useState([]);

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    useEffect(() => {
        const fetchEmotions = async () => {
            try {
                const response = await fetch(`/user_emotions/${currentUser.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch emotions');
                }
                const data = await response.json();
                setEmotionData(data);
            } catch (error) {
                console.error('Error fetching emotions:', error.message);
            }
        };

        if (currentUser) {
            fetchEmotions();
        }
    }, [currentUser]);

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

    return (
        <div>
            <h2>Emotion Summary for {currentUser.username}</h2>
            <ul>
                {console.log('Emotion Data:', emotionData)}
                {emotionData.map((emotion, index) => (
                    <li key={index}>
                        <p>Emotion ID: {emotion.emotion_id}</p>
                        <p>Intensity: {emotion.emotion_intensity}</p>
                        <p>Date: {emotion.date_stamp}</p>
                        <p>Color: {emotion.color}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleNavigateToUserProfile}>Home</button>
            <button onClick={handleNavigateToLogin}>Logout</button>
        </div>
    );
}

export default UserSummary;
