// lets me use react library
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import '../../styling/EmotionSummary.css'



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


    // Define calculateColumn and calculateRow functions
    const calculateColumn = (dateStamp) => {
        const date = new Date(dateStamp);
        return date.getMonth() + 2; // Months start from 0, so we add 2 to get the correct column index
    };


    const calculateRow = (dateStamp) => {
        const date = new Date(dateStamp);
        return date.getDate() + 1; // Add 1 to get the correct row index (dates start from 1)
    };

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
            <div className="flex justify-center items-center h-screen">
                <div className="border-4 border-black p-4">
                    <div className="grid grid-cols-13 grid-rows-32 gap-2">
                        {emotionData.map((emotion, index) => (
                            <div
                                key={index}
                                className={`col-start-${calculateColumn(emotion.date_stamp)} row-start-${calculateRow(emotion.date_stamp)} m-2`}
                            >
                                <div className="emotion-box w-6 h-6" style={{ backgroundColor: emotion.color }}>
                                    {/*<p>{emotion.color} </p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default UserSummary;
