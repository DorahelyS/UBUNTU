// lets me use react library
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';


function UserSummary() {
    // Define state variables
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const currentUser = state ? state.currentUser : null;
    const [emotionData, setEmotionData] = useState([]);

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    // Fetch emotion data for the current user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/user_emotion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_id: currentUser.id })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch emotion data');
                }
                const data = await response.json();
                console.log('Emotion Data:', data);
    
                // Check if the data received is an array or a single object
                if (Array.isArray(data)) {
                    setEmotionData(data);
                } else if (typeof data === 'object' && data !== null) {
                    // Convert single object to an array with one element
                    setEmotionData([data]);
                } else {
                    console.error('Invalid data received:', data);
                }
            } catch (error) {
                console.error('Error fetching emotion data:', error.message);
            }
        };
        fetchData();
    }, [currentUser]);


    // Compute emotion summary
    const computeEmotionSummary = () => {
        const summary = {};
        emotionData.forEach(emotion => {
            if (summary[emotion.color]) {
                summary[emotion.color].count++;
                summary[emotion.color].intensity += emotion.intensity;
            } else {
                summary[emotion.color] = {
                    count: 1,
                    intensity: emotion.intensity
                };
            }
        });
        return summary;
    };

    // Render the emotion summary
    const renderEmotionSummary = () => {
        const summary = computeEmotionSummary();
        return (
            <div>
                <h2>Emotion Summary</h2>
                <ul>
                    {Object.keys(summary).map(color => (
                        <li key={color}>
                            {color}: Average Intensity - {summary[color].intensity / summary[color].count}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

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
            {renderEmotionSummary()}
            <button onClick={handleNavigateToUserProfile}>Home</button>
            <button onClick={handleNavigateToLogin}>Logout</button>
        </div>
    );
}

export default UserSummary;