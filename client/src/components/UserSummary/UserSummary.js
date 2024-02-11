// lets me use react library
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import '../../styling/EmotionSummary.css'

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
            <div className="flex justify-end items-start mt-5 mr-5 space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToLogin}>Logout</button>
            </div>
            <div className="grid grid-cols-13 grid-rows-32 gap-0">
                {/* Empty corner cell */}
                <div className="row-start-1 col-start-1"></div>
                {/* Labels for months */}
                <div className="col-start-2 row-start-1 col-span-12">
                    <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-1">Jan</div>
                        <div className="col-span-1">Feb</div>
                        <div className="col-span-1">Mar</div>
                        <div className="col-span-1">Apr</div>
                        <div className="col-span-1">May</div>
                        <div className="col-span-1">Jun</div>
                        <div className="col-span-1">Jul</div>
                        <div className="col-span-1">Aug</div>
                        <div className="col-span-1">Sep</div>
                        <div className="col-span-1">Oct</div>
                        <div className="col-span-1">Nov</div>
                        <div className="col-span-1">Dec</div>
                    </div>
                </div>
                {/* Labels for days */}
                <div className="col-start-1 row-start-2 row-span-31">
                    <div className="grid grid-rows-31 gap-0">
                        {/* Labels for days */}
                        {Array.from({ length: 31 }, (_, index) => (
                            <div key={index} className="row-span-1">{index + 1}</div>
                        ))}
                    </div>
                </div>
                {/* Emotion boxes */}
                {console.log('Emotion Data:', emotionData)}
                {emotionData.map((emotion, index) => (
                    <div key={index} className="emotion-box w-6 h-6" style={{ backgroundColor: emotion.color }}>
                        {/* <p><strong>Emotion ID:</strong> {emotion.emotion_id}</p> */ }
                        {/* <p><strong>Intensity:</strong> {emotion.emotion_intensity}</p> */ }
                        {/* <p><strong>Date:</strong> {emotion.date_stamp}</p> */ }
                        {/* <p><strong>Color:</strong> {emotion.color}</p> */ }
                    </div>

                ))}
            </div>
        </div>
    );
}

export default UserSummary;
