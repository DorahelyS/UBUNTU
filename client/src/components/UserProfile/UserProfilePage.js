// lets me use react library
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import UserProfileNav from "./UserProfileNav"
import CreateNewEmotion from '../CreateNewEmotion/CreateNewEmotion';

function UserProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state)
    //const { currentUser } = state;

    // Extract currentUser from state, or default to null if it doesn't exist
    const currentUser = state && state.currentUser ? state.currentUser : null;

    const greetingMessage = currentUser ? `Hello, ${currentUser.username}` : '';


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

    return (
        <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{greetingMessage}</div>
            <button onClick={handleNavigateToLogin}>Logout</button>
            <button onClick={handleCreateNewEmotion}>Log New Emotion</button>
            {/*<CreateNewEmotion currentUser={currentUser} state={state} /> */}
        </div>
    );
}

export default UserProfilePage;