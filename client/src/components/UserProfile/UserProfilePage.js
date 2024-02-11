// lets me use react library
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import UserProfileNav from "./UserProfileNav"
//import CreateNewEmotion from '../CreateNewEmotion/CreateNewEmotion';

function UserProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state)
    //const { currentUser } = state;

    // Extract currentUser from state, or default to null if it doesn't exist
    const currentUser = state && state.currentUser ? state.currentUser : null;

    const greetingMessage = currentUser ? `Hi, ${currentUser.username} ☀️ How are you feeling today?` : '';


     // navigating back to log in
     const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };

    const handleCreateNewEmotion = () => {
        navigate('/New-Emotion', {
            state: { currentUser }
        });
    };

    const handleUserSummary = () => {
        navigate('/Emotion-Summary', {
            state: { currentUser }
        });
    };



    return (
        <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{greetingMessage}</div>
            <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded mr-3" onClick={handleNavigateToLogin}>Logout</button>
            <button className="bg-yellow-500 hover:bg-yello-300 text-white py-2 px-4 rounded mr-3" onClick={handleCreateNewEmotion}>Log New Emotion</button>
            <button className="bg-red-500 hover:bg-red-300 text-white py-2 px-4 rounded" onClick={handleUserSummary}>See Emotion</button>
            {/*<CreateNewEmotion currentUser={currentUser} state={state} /> */}
        </div>
    );
}

export default UserProfilePage;