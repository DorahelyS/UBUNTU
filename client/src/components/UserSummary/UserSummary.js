// lets me use react library
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styling/EmotionSummary.css'

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
            <h2 className="text-xl font-bold mb-4">Emotion Summary for {currentUser.username}</h2>
            <div>
                {console.log('Emotion Data:', emotionData)}
                {emotionData.map((emotion, index) => (
                    <div key={index} className="emotion-box" style={{ backgroundColor: emotion.color }}>
                        <p><strong>Emotion ID:</strong> {emotion.emotion_id}</p>
                        <p><strong>Intensity:</strong> {emotion.emotion_intensity}</p>
                        <p><strong>Date:</strong> {emotion.date_stamp}</p>
                        <p><strong>Color:</strong> {emotion.color}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded mr-3" onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-red-500 hover:bg-red-300 text-white py-2 px-4 rounded" onClick={handleNavigateToLogin}>Logout</button>
            </div>
        </div>
    );
}

export default UserSummary;
