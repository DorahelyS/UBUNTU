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

    // Creating greeting message 
    const greetingMessage = currentUser ? `Hi, ${currentUser.username} ☀️ How are you feeling today?` : '';


    // navigating back to log in
    const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };

    // navigating to new route
    const handleCreateNewEmotion = () => {
        navigate('/New-Emotion', {
            state: { currentUser }
        });
    };

    
    // navigationg to new route
    const handleNewJournal = () => {
        navigate('/New-Journal', {
            state: { currentUser }
        });
    };

    // navigationg to new route
    const handleEmotionSummary = () => {
        navigate('/Emotion-Summary', {
            state: { currentUser }
        });
    };

    // navigationg to new route
    const handleAbout = () => {
        navigate('/About', {
            state: { currentUser }
        });
    };



    return (
        <div className="bg-emerald-50 flex flex-col items-center justify-start h-screen">
            <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-5 mr-5 " onClick={handleAbout}>About</button>
            <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-5 mr-5 self-end" onClick={handleNavigateToLogin}>Logout</button>
            <div className=" font-mono text-center font-bold mt-32 text-2xl">{greetingMessage}</div>
            <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full mt-10" onClick={handleCreateNewEmotion}>Log </button>
            <button className="bg-red-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-10" onClick={handleNewJournal}>Write </button>
            <button className="bg-sky-500 hover:bg-blue-300 text-white py-2 px-4 rounded-full mt-10" onClick={handleEmotionSummary}>Track </button>

        </div>
    );
}

export default UserProfilePage;